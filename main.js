// Simple player that plays any button's data-src
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('button.track[data-src]');
  if (!btn) return;

  const player = document.getElementById('player');
  const now = document.getElementById('nowPlaying');

  // Same-origin files in /poems work best
  player.crossOrigin = 'anonymous';

  const src = btn.getAttribute('data-src');
  const title = btn.getAttribute('data-title') || src;

  player.src = src;
  player.load();
  now.textContent = `Now playing: “${title}”`;

  try {
    await player.play();
  } catch (err) {
    console.error(err);
    alert('Could not play: ' + err.message);
  }
});

// Optional: autoload ?src=... for testing
window.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const src = url.searchParams.get('src');
  if (!src) return;
  const player = document.getElementById('player');
  player.crossOrigin = 'anonymous';
  player.src = src;
});
