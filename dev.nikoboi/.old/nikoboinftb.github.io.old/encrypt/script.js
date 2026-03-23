const textInput = document.querySelector(".input");
const passwordInput = document.querySelector(".password");
const outputEl = document.querySelector(".output");
const encryptBtn = document.querySelector(".encrypt");
const decryptBtn = document.querySelector(".decrypt");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToBuf(b64) {
  const binStr = atob(b64);
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKeys(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    baseKey,
    512
  );
  const keyBytes = new Uint8Array(bits);
  const encKeyBytes = keyBytes.slice(0, 32);
  const macKeyBytes = keyBytes.slice(32);

  const encryptionKey = await crypto.subtle.importKey(
    "raw",
    encKeyBytes,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );

  const hmacKey = await crypto.subtle.importKey(
    "raw",
    macKeyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

  return { encryptionKey, hmacKey };
}

async function encryptText(plaintext, password) {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const { encryptionKey, hmacKey } = await deriveKeys(password, salt);

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    encryptionKey,
    encoder.encode(plaintext)
  );

  const dataToMac = new Uint8Array([
    ...salt,
    ...iv,
    ...new Uint8Array(ciphertext),
  ]);
  const mac = await crypto.subtle.sign("HMAC", hmacKey, dataToMac);

  const full = new Uint8Array([
    ...salt,
    ...iv,
    ...new Uint8Array(ciphertext),
    ...new Uint8Array(mac),
  ]);

  return bufToBase64(full.buffer);
}

async function decryptText(dataB64, password) {
  try {
    const data = new Uint8Array(base64ToBuf(dataB64));

    const salt = data.slice(0, 16);
    const iv = data.slice(16, 32);
    const mac = data.slice(-32);
    const ciphertext = data.slice(32, -32);

    const { encryptionKey, hmacKey } = await deriveKeys(password, salt);

    const dataToMac = new Uint8Array([...salt, ...iv, ...ciphertext]);
    const valid = await crypto.subtle.verify(
      "HMAC",
      hmacKey,
      mac,
      dataToMac
    );
    if (!valid) throw new Error("HMAC verification failed");

    const plaintextBuf = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      encryptionKey,
      ciphertext
    );

    return decoder.decode(plaintextBuf);
  } catch (err) {
    throw new Error("Decryption failed: " + err.message);
  }
}

encryptBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  const password = passwordInput.value;
  if (!text || !password) {
    outputEl.textContent = "Please enter text and password.";
    return;
  }
  outputEl.textContent = "Encrypting...";
  const result = await encryptText(text, password);
  outputEl.textContent = result;
});

decryptBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = textInput.value.trim();
  const password = passwordInput.value;
  if (!data || !password) {
    outputEl.textContent = "Please enter ciphertext and password.";
    return;
  }
  outputEl.textContent = "Decrypting...";
  try {
    const result = await decryptText(data, password);
    outputEl.textContent = result;
  } catch (err) {
    outputEl.textContent = err.message;
  }
});

const copyBtn = document.querySelector(".copy-output");

copyBtn.addEventListener("click", () => {
  const text = outputEl.textContent.trim();
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy Output", 1000);
    })
    .catch(err => {
      console.error("Copy failed:", err);
    });
});
