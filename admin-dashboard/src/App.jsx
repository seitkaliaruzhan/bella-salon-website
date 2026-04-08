import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Employees from './pages/Employees';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <Sidebar />
        <div style={{ flexGrow: 1, marginLeft: '240px', background: '#fffafb' }}>
          <Navbar />
          <div style={{ padding: '30px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/employees" element={<Employees />} />
            </Routes>
          </div>
        </div> 
      </div>
    </Router>
  );
}

export default App;