import React from 'react';

export function Login() {
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');

  // Stub for this phase: the forms render but do not submit anywhere yet.
  const noSubmit = (e) => e.preventDefault();

  return (
    <main>
      <div className='row g-4'>
        <section className='card-section col-md-6'>
          <h2>Login</h2>
          <form onSubmit={noSubmit}>
            <label htmlFor='loginUsername'>Username</label>
            <input type='text' id='loginUsername' name='username' placeholder='racer123' autoComplete='username' value={loginName} onChange={(e) => setLoginName(e.target.value)} required />

            <label htmlFor='loginPassword'>Password</label>
            <input type='password' id='loginPassword' name='password' autoComplete='current-password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />

            <button type='submit'>Sign In</button>
          </form>
        </section>

        <section className='card-section col-md-6'>
          <h2>Create an account</h2>
          <form onSubmit={noSubmit}>
            <label htmlFor='registerUsername'>Username</label>
            <input type='text' id='registerUsername' name='username' placeholder='racer123' autoComplete='username' required />

            <label htmlFor='registerEmail'>Email</label>
            <input type='email' id='registerEmail' name='email' placeholder='you@example.com' autoComplete='email' required />

            <label htmlFor='registerPassword'>Password</label>
            <input type='password' id='registerPassword' name='password' autoComplete='new-password' required />

            <label htmlFor='registerConfirm'>Confirm password</label>
            <input type='password' id='registerConfirm' name='confirm' autoComplete='new-password' required />

            <button type='submit'>Create Account</button>
          </form>
        </section>
      </div>

      <section className='card-section'>
        <h2>Welcome Back</h2>
        <p>Welcome back, <strong>mazeMaster</strong>!</p>
        <p>Best time: 0:51 &middot; Races won: 3</p>
        <button type='button'>Logout</button>
      </section>
    </main>
  );
}
