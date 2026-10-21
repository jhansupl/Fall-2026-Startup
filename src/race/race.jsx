import React from 'react';

function formatTime(total) {
  const m = Math.floor(total / 60);
  const sec = String(total % 60).padStart(2, '0');
  return `${m}:${sec}`;
}

export function Race() {
  const [seconds, setSeconds] = React.useState(0);

  // Tick once a second; the cleanup stops the timer when leaving the page.
  React.useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <section className='card-section'>
        <h2>Today's Maze</h2>
        <p>Time: <strong>{formatTime(seconds)}</strong></p>

        <svg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg' className='maze-svg'>
          <rect x='0' y='0' width='300' height='300' fill='none' stroke='black' strokeWidth='4' />

          <line x1='50' y1='0' x2='50' y2='100' stroke='black' strokeWidth='4' />
          <line x1='100' y1='50' x2='100' y2='150' stroke='black' strokeWidth='4' />
          <line x1='0' y1='150' x2='100' y2='150' stroke='black' strokeWidth='4' />
          <line x1='150' y1='0' x2='150' y2='200' stroke='black' strokeWidth='4' />
          <line x1='150' y1='200' x2='250' y2='200' stroke='black' strokeWidth='4' />
          <line x1='200' y1='50' x2='300' y2='50' stroke='black' strokeWidth='4' />
          <line x1='200' y1='100' x2='200' y2='250' stroke='black' strokeWidth='4' />
          <line x1='100' y1='250' x2='250' y2='250' stroke='black' strokeWidth='4' />
          <line x1='50' y1='200' x2='50' y2='300' stroke='black' strokeWidth='4' />
          <line x1='250' y1='100' x2='300' y2='100' stroke='black' strokeWidth='4' />

          <circle cx='25' cy='25' r='8' fill='dodgerblue' />
          <text x='15' y='10' fontSize='10'>you</text>

          <rect x='262' y='262' width='26' height='26' fill='mediumseagreen' />
          <text x='255' y='255' fontSize='10'>exit</text>
        </svg>
      </section>

      <section className='card-section'>
        <h2>Live Rankings</h2>
        <ol className='rankings-list'>
          <li>wallCrawler &mdash; 78% through the maze</li>
          <li>you &mdash; 52% through the maze</li>
          <li>racer123 &mdash; 30% through the maze</li>
        </ol>
      </section>

      <section className='card-section'>
        <h2>Race Complete</h2>
        <p>Your time: <strong>1:14</strong></p>
        <p>
          Your reward, fetched live from the{' '}
          <a href='https://icanhazdadjoke.com/api' target='_blank' rel='noopener noreferrer'>icanhazdadjoke.com</a> API:
        </p>
        <blockquote>"Why don't scientists trust atoms? Because they make up everything!"</blockquote>
      </section>
    </main>
  );
}
