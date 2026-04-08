import { useState } from 'react';
import Modal from '../components/Modal';

const Products = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Hair Styling", category: "Hair", price: 6000, stock: 5 },
    { id: 2, name: "Manicure", category: "Nails", price: 7000, stock: 10 },
    { id: 3, name: "Makeup", category: "Face", price: 10000, stock: 0 },
    { id: 4, name: "Skincare", category: "Face", price: 8000, stock: 3 },
    { id: 5, name: "Eyebrow", category: "Face", price: 5000, stock: 2 },
  ]);

  
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  
  const filtered = services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const lastIdx = currentPage * itemsPerPage;
  const firstIdx = lastIdx - itemsPerPage;
  const currentItems = filtered.slice(firstIdx, lastIdx);

  
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...formData, id: s.id } : s));
      setEditingId(null);
    } else {
      setServices([...services, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", category: "", price: "", stock: "" });
  };

  const confirmDelete = () => {
    setServices(services.filter(s => s.id !== toDelete.id));
    setIsDelOpen(false);
  };

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '15px' }}>
      <h2 style={{ color: '#ff4d94' }}>Service Management</h2>

      
      <form onSubmit={handleSave} style={formBox}>
        <div style={inputGrid}>
          <input placeholder="Service Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={inStyle}/>
          <input placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required style={inStyle}/>
          <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={inStyle}/>
          <input placeholder="Slots" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required style={inStyle}/>
        </div>
        <button type="submit" style={btnMain}>{editingId ? "Update" : "Add Service"}</button>
      </form>

      
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <input placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} style={searchIn}/>
        <button onClick={() => setServices([...services].sort((a,b) => a.price - b.price))} style={btnSec}>Sort by Price</button>
      </div>

      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #fff0f6', color: '#ff4d94', textAlign: 'left' }}>
            <th>Service</th><th>Price</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
              <td style={{ padding: '12px 0' }}>{s.name}</td>
              <td>{s.price} ₸</td>
              <td>{s.stock}</td>
              <td>
                <button onClick={() => {setEditingId(s.id); setFormData(s)}} style={actBtn}>Edit</button>
                <button onClick={() => {setToDelete(s); setIsDelOpen(true)}} style={{...actBtn, color: 'red'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div style={{ marginTop: '15px', display: 'flex', gap: '5px' }}>
        {Array.from({ length: Math.ceil(filtered.length / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i+1)} style={{...pageBtn, background: currentPage === i+1 ? '#ff4d94' : 'white', color: currentPage === i+1 ? 'white' : 'black'}}>{i+1}</button>
        ))}
      </div>

      
      <Modal isOpen={isDelOpen} onClose={() => setIsDelOpen(false)} title="Confirm Delete">
        <p>Delete <strong>{toDelete?.name}</strong>?</p>
        <button onClick={confirmDelete} style={{...btnMain, background: 'red'}}>Confirm</button>
      </Modal>
    </div>
  );
};


const formBox = { background: '#fffafb', padding: '15px', borderRadius: '10px', marginBottom: '20px' };
const inputGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' };
const inStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #eee' };
const btnMain = { background: '#ff4d94', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' };
const searchIn = { padding: '8px', borderRadius: '5px', border: '1px solid #eee', width: '200px' };
const btnSec = { background: 'white', border: '1px solid #ff4d94', color: '#ff4d94', borderRadius: '5px', padding: '0 10px', cursor: 'pointer' };
const actBtn = { background: 'none', border: 'none', cursor: 'pointer', color: '#3498db', marginRight: '10px' };
const pageBtn = { padding: '5px 10px', border: '1px solid #eee', borderRadius: '5px', cursor: 'pointer' };

export default Products;