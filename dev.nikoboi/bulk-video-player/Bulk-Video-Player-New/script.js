const playersEl = document.getElementById('players');
const input = document.getElementById('input');
const countEl = document.getElementById('count');

function updateCount() {
  countEl.textContent = playersEl.children.length;
}

function sanitizeUrl(url) {
  if (!url) return null;
  url = url.trim();
  if (url.startsWith('//')) url = location.protocol + url;
  if (!/^https?:\/\//i.test(url)) return null;
  return url;
}

function addPlayer(url) {
  const s = sanitizeUrl(url);
  if (!s) return null;
  const container = document.createElement('div');
  container.className = 'player';
  const iframe = document.createElement('iframe');
  iframe.src = s;
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  container.appendChild(iframe);
  playersEl.appendChild(container);
  return container;
}

function parseAndAdd(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let added = 0;
  for (const line of lines) {
    addPlayer(line);
    added++;
  }
  if (added) updateCount();
  return added;
}

document.getElementById('addBtn').addEventListener('click', () => {
  const text = input.value;
  if (!text.trim()) return alert('Paste some URLs first.');
  parseAndAdd(text);
  input.value = '';
});

document.getElementById('clearBtn').addEventListener('click', () => {
  if (!playersEl.children.length) return;
  if (!confirm('Remove all players?')) return;
  playersEl.innerHTML = '';
  updateCount();
});