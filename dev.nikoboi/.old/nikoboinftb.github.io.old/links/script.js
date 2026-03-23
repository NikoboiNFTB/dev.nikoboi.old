const input = document.getElementById('input');
const openBtn = document.getElementById('openBtn');
const clearBtn = document.getElementById('clearBtn');

function sanitizeUrl(url) {
  if (!url) return null;
  url = url.trim();
  if (url.startsWith('//')) url = location.protocol + url;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
}

openBtn.addEventListener('click', () => {
  const lines = input.value.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return alert('Paste some URLs first.');

  for (const line of lines) {
    const url = sanitizeUrl(line);
    if (url) window.open(url, '_blank');
  }
});

clearBtn.addEventListener('click', () => {
  input.value = '';
});
