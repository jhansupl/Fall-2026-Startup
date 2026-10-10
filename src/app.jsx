import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Login } from './login/login';
import { Race } from './race/race';
import { Scores } from './scores/scores';
import { About } from './about/about';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Maze Racer</h1>
        <nav>
          <ul>
            <li><NavLink to='/' end>Home</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/race'>Race</NavLink></li>
            <li><NavLink to='/scores'>High Scores</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/race' element={<Race />} />
        <Route path='/scores' element={<Scores />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
        <p>Maze Racer &copy; 2026 Jonas Lee</p>
        <p><a href='https://github.com/jhansupl/Fall-2026-Startup'>github.com/jhansupl/Fall-2026-Startup</a></p>
      </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main>
      <section className='card-section'>
        <h2>404</h2>
        <p>That page doesn't exist. Head back to the home page and pick a maze.</p>
      </section>
    </main>
  );
}
