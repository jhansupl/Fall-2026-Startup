import React from 'react';

// Fallback shown if the scores service cannot be reached.
export const defaultScores = [
  ['mazeMaster', '0:42', '2026-09-10'],
  ['racer123', '0:51', '2026-09-11'],
  ['wallCrawler', '1:03', '2026-09-12'],
  ['speedySam', '1:07', '2026-09-12'],
  ['jhan', '1:12', '2026-09-13'],
  ['kai', '1:19', '2026-09-14'],
  ['deadEndDan', '1:25', '2026-09-14'],
  ['loopLucy', '1:31', '2026-09-15'],
];

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/scores')
      .then((res) => res.json())
      .then(setScores)
      .catch(() => setScores(defaultScores));
  }, []);

  return (
    <main>
      <section className='card-section'>
        <h2>High Scores</h2>
        <p>The fastest maze solve times from every racer.</p>

        <table>
          <caption>Top solver times by username</caption>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Best Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(([name, time, date], i) => (
              <tr key={`${name}-${date}-${i}`}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
