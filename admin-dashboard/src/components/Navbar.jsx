const Navbar = () => {
  return (
    <div style={{ 
      height: '70px', 
      background: '#ffffff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 40px',
      borderBottom: '1px solid #f0f0f0' 
    }}>
      <div style={{ fontSize: '14px', color: '#999' }}>Main / {window.location.pathname.replace('/', '') || 'Dashboard'}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span style={{ fontSize: '14px', color: '#444' }}>Admin: <strong>Aruzhan</strong></span>
        <div style={{ width: '35px', height: '35px', background: '#ff4d94', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>A</div>
      </div>
    </div>
  );
};

export default Navbar;