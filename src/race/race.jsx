import React from 'react';
import { defaultScores } from '../scores/scores';

const CELL = 50;
const SIZE = 6;

// Interior walls as [x1, y1, x2, y2]; the outer border is drawn separately.
const WALLS = [
  [50, 0, 50, 100],
  [100, 50, 100, 150],
  [0, 150, 100, 150],
  [150, 0, 150, 200],
  [150, 200, 250, 200],
  [200, 50, 300, 50],
  [200, 100, 200, 250],
  [100, 250, 250, 250],
  [50, 200, 50, 300],
  [250, 100, 300, 100],
];

// True if a wall sits on the edge between a cell and its neighbor.
function isBlocked(col, row, dx, dy) {
  const nc = col + dx;
  const nr = row + dy;
  if (nc < 0 || nr < 0 || nc >= SIZE || nr >= SIZE) return true;
  return WALLS.some(([x1, y1, x2, y2]) => {
    if (dx !== 0) {
      const x = Math.max(col, nc) * CELL;
      return x1 === x && x2 === x && Math.min(y1, y2) <= row * CELL && Math.max(y1, y2) >= (row + 1) * CELL;
    }
    const y = Math.max(row, nr) * CELL;
    return y1 === y && y2 === y && Math.min(x1, x2) <= col * CELL && Math.max(x1, x2) >= (col + 1) * CELL;
  });
}

function toSeconds(time) {
  const [m, sec] = time.split(':').map(Number);
  return m * 60 + sec;
}

function formatTime(total) {
  const m = Math.floor(total / 60);
  const sec = String(total % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

export function Race() {
  const [seconds, setSeconds] = React.useState(0);
  const [pos, setPos] = React.useState({ col: 0, row: 0 });

  const [opponents, setOpponents] = React.useState([
    { name: 'wallCrawler', pct: 0 },
    { name: 'racer123', pct: 0 },
  ]);
  const finished = pos.col === SIZE - 1 && pos.row === SIZE - 1;

  // Tick once a second until the exit is reached; the cleanup also stops it when leaving the page.
  React.useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  // Mock for the later WebSocket feed: opponents creep forward by a random amount each second.
  React.useEffect(() => {
    const id = setInterval(() => {
      setOpponents((list) => list.map((o) => ({ ...o, pct: Math.min(100, o.pct + Math.floor(Math.random() * 7)) })));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const yourPct = Math.round(((pos.col + pos.row) / (2 * (SIZE - 1))) * 100);
  const rankings = [...opponents, { name: 'you', pct: yourPct }].sort((a, b) => b.pct - a.pct);

  // Mock for the later scores service: add this run to the saved list, fastest first.
  React.useEffect(() => {
    if (!finished) return;
    const saved = JSON.parse(localStorage.getItem('scores') || 'null') || defaultScores;
    const entry = [localStorage.getItem('userName') || 'Guest', formatTime(seconds), new Date().toISOString().slice(0, 10)];
    const updated = [...saved, entry].sort((a, b) => toSeconds(a[1]) - toSeconds(b[1]));
    localStorage.setItem('scores', JSON.stringify(updated));
  }, [finished]);

  // Arrow keys move the marker one cell unless a wall is in the way.
  React.useEffect(() => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    function onKeyDown(e) {
      const move = moves[e.key];
      if (!move) return;
      e.preventDefault();
      setPos((p) => (isBlocked(p.col, p.row, move[0], move[1]) ? p : { col: p.col + move[0], row: p.row + move[1] }));
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main>
      <section className='card-section'>
        <h2>Today's Maze</h2>
        <p>Time: <strong>{formatTime(seconds)}</strong></p>

        <svg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg' className='maze-svg'>
          <rect x='0' y='0' width='300' height='300' fill='none' stroke='black' strokeWidth='4' />

          {WALLS.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke='black' strokeWidth='4' />
          ))}

          <circle cx={pos.col * CELL + 25} cy={pos.row * CELL + 25} r='8' fill='dodgerblue' />
          <text x={pos.col * CELL + 15} y={pos.row * CELL + 10} fontSize='10'>you</text>

          <rect x='262' y='262' width='26' height='26' fill='mediumseagreen' />
          <text x='255' y='255' fontSize='10'>exit</text>
        </svg>
      </section>

      <section className='card-section'>
        <h2>Live Rankings</h2>
        <ol className='rankings-list'>
          {rankings.map((r) => (
            <li key={r.name}>{r.name} &mdash; {r.pct}% through the maze</li>
          ))}
        </ol>
      </section>

      {finished && (
        <section className='card-section'>
          <h2>Race Complete</h2>
          <p>Your time: <strong>{formatTime(seconds)}</strong></p>
          <p>
            Your reward, fetched live from the{' '}
            <a href='https://icanhazdadjoke.com/api' target='_blank' rel='noopener noreferrer'>icanhazdadjoke.com</a> API:
          </p>
          <blockquote>"Why don't scientists trust atoms? Because they make up everything!"</blockquote>
        </section>
      )}
    </main>
  );
}
