import React, { useState } from 'react'
import Api from '../Api';
import nProgress from 'nprogress';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    nProgress.start()
    try {
      const res = await Api.post('/auth/login', form);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      alert('Login success');
      window.location.href = '/home';
    } catch (err) {
      alert(err.response.data.error);
    }
    nProgress.done()
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '100px auto',
        padding: '40px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        color: '#333',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
        🌸 Login
      </h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid transparent',
          borderRadius: '10px',
          fontSize: '15px',
          marginBottom: '15px',
          outline: 'none',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          transition: '0.3s',
        }}
        onFocus={(e) => (e.target.style.border = '2px solid #ff6f91')}
        onBlur={(e) => (e.target.style.border = '2px solid transparent')}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid transparent',
          borderRadius: '10px',
          fontSize: '15px',
          marginBottom: '20px',
          outline: 'none',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          transition: '0.3s',
        }}
        onFocus={(e) => (e.target.style.border = '2px solid #845ec2')}
        onBlur={(e) => (e.target.style.border = '2px solid transparent')}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          border: 'none',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #845ec2, #ff6f91, #ffc75f)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        Login ✨
      </button>
      <p>New Here?<a href='/register'>Sign up</a></p>
    </form>
  );
};

export default Login;
