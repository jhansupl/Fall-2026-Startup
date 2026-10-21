import React from 'react';

export function Login() {
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [regName, setRegName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  const [regConfirm, setRegConfirm] = React.useState('');
  const [regError, setRegError] = React.useState('');
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  // Mock for the later login service: remember the user in this browser only.
  function signIn(e) {
    e.preventDefault();
    localStorage.setItem('userName', loginName);
    setUserName(loginName);
    setLoginName('');
    setLoginPassword('');
  }

  function register(e) {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setRegError('Passwords do not match.');
      return;
    }
    localStorage.setItem('userName', regName);
    setUserName(regName);
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setRegConfirm('');
    setRegError('');
  }

  function logout() {
    localStorage.removeItem('userName');
    setUserName('');
  }

  return (
    <main>
      <div className='row g-4'>
        <section className='card-section col-md-6'>
          <h2>Login</h2>
          <form onSubmit={signIn}>
            <label htmlFor='loginUsername'>Username</label>
            <input type='text' id='loginUsername' name='username' placeholder='racer123' autoComplete='username' value={loginName} onChange={(e) => setLoginName(e.target.value)} required />

            <label htmlFor='loginPassword'>Password</label>
            <input type='password' id='loginPassword' name='password' autoComplete='current-password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />

            <button type='submit'>Sign In</button>
          </form>
        </section>

        <section className='card-section col-md-6'>
          <h2>Create an account</h2>
          <form onSubmit={register}>
            <label htmlFor='registerUsername'>Username</label>
            <input type='text' id='registerUsername' name='username' placeholder='racer123' autoComplete='username' value={regName} onChange={(e) => setRegName(e.target.value)} required />

            <label htmlFor='registerEmail'>Email</label>
            <input type='email' id='registerEmail' name='email' placeholder='you@example.com' autoComplete='email' value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />

            <label htmlFor='registerPassword'>Password</label>
            <input type='password' id='registerPassword' name='password' autoComplete='new-password' value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />

            <label htmlFor='registerConfirm'>Confirm password</label>
            <input type='password' id='registerConfirm' name='confirm' autoComplete='new-password' value={regConfirm} onChange={(e) => setRegConfirm(e.target.value)} required />

            {regError && <p role='alert'>{regError}</p>}
            <button type='submit'>Create Account</button>
          </form>
        </section>
      </div>

      {userName && (
        <section className='card-section'>
          <h2>Welcome Back</h2>
          <p>Welcome back, <strong>{userName}</strong>!</p>
          <p>Best time: 0:51 &middot; Races won: 3</p>
          <button type='button' onClick={logout}>Logout</button>
        </section>
      )}
    </main>
  );
}
