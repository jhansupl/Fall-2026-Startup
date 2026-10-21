import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [userName, setUserName] = React.useState('Guest');

  // Read the mock login on mount; this becomes a service call later.
  React.useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Guest');
  }, []);

  return (
    <main>
      <section className='card-section'>
        <h2>Race your friends through a brand new maze, every time</h2>
        <p>
          Maze Racer drops you and your friends into the exact same procedurally generated maze at the exact same
          instant. First one to the exit wins, and you can watch everyone else's marker scrambling through the walls
          in real time. No two mazes repeat, so there's always a new one to beat.
        </p>
      </section>

      <section className='card-section'>
        <h2>Status</h2>
        <p>Logged in as: <strong id='loggedInUser'>{userName}</strong></p>
        <p><Link to='/login'>Login or create an account</Link></p>
      </section>

      <section className='card-section'>
        <h2>Today's Maze</h2>
        <p>A new maze is generated every day. Here's a preview of what today's layout looks like.</p>

        <img
          src='/images/maze-preview.png'
          alt="Preview of today's generated maze, showing the start and exit points"
          width='220'
          height='220'
          loading='lazy'
          className='maze-preview'
        />

        <p><Link to='/race'>Start racing &rarr;</Link></p>
      </section>

      <section className='card-section'>
        <h2>Top Racers</h2>
        <p>A quick look at the fastest solve times. See the full <Link to='/scores'>leaderboard</Link> for more.</p>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Best Time</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>mazeMaster</td><td>0:42</td></tr>
            <tr><td>2</td><td>racer123</td><td>0:51</td></tr>
            <tr><td>3</td><td>wallCrawler</td><td>1:03</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
