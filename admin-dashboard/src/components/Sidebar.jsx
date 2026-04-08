import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation(); // Определяем текущий путь

  const sidebarStyle = {
    width: '240px',
    height: '100vh',
    background: '#ffffff',
    position: 'fixed',
    left: 0,
    top: 0,
    borderRight: '1px solid #f0f0f0',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.02)'
  };

  // Функция для стилизации активной ссылки
  const getLinkStyle = (path) => ({
    textDecoration: 'none',
    fontSize: '16px',
    padding: '12px 20px',
    borderRadius: '12px',
    transition: '0.3s',
    display: 'block',
    fontWeight: location.pathname === path ? '600' : '400',
    color: location.pathname === path ? '#ff4d94' : '#666',
    background: location.pathname === path ? '#fff0f6' : 'transparent',
  });

  return (
    <div style={sidebarStyle}>
      <h2 style={{ color: '#ff4d94', fontSize: '22px', marginBottom: '40px', textAlign: 'center' }}>Bella Beauty Admin</h2>
      <nav>
        <Link to="/" style={getLinkStyle('/')}>Dashboard</Link>
        <Link to="/products" style={getLinkStyle('/products')}>Products</Link>
        <Link to="/employees" style={getLinkStyle('/employees')}>Employees</Link>
      </nav>
    </div>
  );
};

export default Sidebar;