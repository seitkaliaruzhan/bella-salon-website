import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'alice@example.com' && password === 'secret123') {
      navigate('/employees'); 
    } else {
      setError('Invalid email or password');
    }
  };

  // Объединенные стили прямо здесь
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fce4ec',
      fontFamily: 'sans-serif',
    },
    card: {
      background: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '350px',
      textAlign: 'center',
    },
    title: { color: '#d81b60', marginBottom: '10px' },
    inputGroup: { textAlign: 'left', marginBottom: '15px' },
    label: { display: 'block', fontSize: '13px', marginBottom: '5px', fontWeight: 'bold' },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      boxSizing: 'border-box'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#d81b60',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px'
    },
    error: { color: 'red', fontSize: '12px', marginBottom: '10px' }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>Bella Admin</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Login to your dashboard</p>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            data-cy="email"
            placeholder="alice@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            data-cy="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={styles.error} data-cy="email-error">{error}</p>}

        <button type="submit" style={styles.button} data-cy="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;