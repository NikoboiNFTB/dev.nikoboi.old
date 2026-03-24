# Bitwarden-Style Text Encryptor

A simple, browser-based text encryption tool using AES256-CBC-HMAC-SHA256 encryption. Encrypt and decrypt text locally with one or two passwords, fully in the browser.

## Features

- AES256-CBC encryption with HMAC-SHA256 for integrity
- Optional secondary password for nested encryption
  - Doesn't really do much, a secure password is much more important.
- Dark-themed, centered UI.
- Fully responsive design.
- No server-side storage, all encryption happens **locally**.
- Included test runner, to make sure it's working. If encryption or decrytion fail, see your browser console.

## Installation

1. Clone the repository:

`git clone https://github.com/NikoboiNFTB/dev.nikoboi`

2. Open `/encrypt/index.html` in a (modern) browser.

No additional dependencies or JavaScript frameworks required.

## Usage

1. Enter the text you want to encrypt in the first input box.
2. Enter your primary password in the password field.
3. (Optional) Enter a secondary password in the second password field.
4. Click "Encrypt" to generate the encrypted text.
5. Click "Decrypt" to revert encrypted text back to plain text.

## File Structure

- index.html – Main HTML page
- style.css – Stylesheet for the UI
- script.js – Encryption/decryption logic
- test.js – Test runner for verifying encryption with various scenarios

## Encryption Details

- Based on Bitwarden's AES256-CBC-HMAC-SHA256 protocol
- Encrypts text locally; no data is sent to any server
  - Recommended: Download and use locally.
- Secondary password provides an additional layer of encryption if desired

## Security Notes

- All encryption is performed locally; ensure your browser and machine are secure.
- Use strong, unique passwords for optimal security.
- Secondary password is optional but recommended for added protection.
- Keep in mind that the weakest link is always a weak password or social engineering.

## License

[GPLv3](/LICENSE)
