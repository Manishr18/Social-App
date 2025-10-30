import React, { useState } from 'react';
import Api from '../Api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post('/auth/register', form);
      alert('Registration Successful!');
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Join us today — it’s quick and easy!</p>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Register
        </button>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <a href="/" style={styles.link}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FF7B54 0%, #FF3D68 100%)',
    fontFamily: 'Poppins, sans-serif',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
    fontSize: '28px',
  },
  subtitle: {
    marginBottom: '25px',
    color: '#777',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
    transition: '0.3s',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF3D68',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  footerText: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#FF3D68',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Register;
