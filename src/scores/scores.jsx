import React from 'react';

// Seed data used until a database exists; the first visit copies it into localStorage.
const defaultScores = [
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
    const saved = localStorage.getItem('scores');
    if (saved) {
      setScores(JSON.parse(saved));
    } else {
      localStorage.setItem('scores', JSON.stringify(defaultScores));
      setScores(defaultScores);
    }
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
              <tr key={name}>
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
