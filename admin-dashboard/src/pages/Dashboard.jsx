import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => setData("System Online"), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
      <h1 style={{ color: '#333', fontSize: '24px' }}>Welcome back!</h1>
      <p style={{ color: '#ff4d94' }}>Status: {data}</p>
    </div>
  );
};

export default Dashboard;