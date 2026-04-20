import React, { useState, useEffect } from 'react';

// ── LocalStorage hook ────────────────────────────────────
const LS_KEY = 'bella_employees';

const DEFAULT_EMPLOYEES = [
  { id: 1, name: 'Aruna Bekova',  position: 'Senior Stylist',  department: 'Hair',     email: 'aruna@bella.kz', status: 'Active'   },
  { id: 2, name: 'Dana Seitkali',   position: 'Nail Technician', department: 'Nails',    email: 'dana@bella.kz',    status: 'Active'   },
  { id: 3, name: 'Asel Nurova',     position: 'Makeup Artist',   department: 'Makeup',   email: 'asel@bella.kz',    status: 'Active'   },
  { id: 4, name: 'Madina Aliyeva',  position: 'Esthetician',     department: 'Skincare', email: 'madina@bella.kz',  status: 'Inactive' },
];

function useEmployees() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_EMPLOYEES;
  });

  const [nextId, setNextId] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? Math.max(...parsed.map(e => e.id)) + 1 : 1;
    }
    return 5;
  });

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(employees));
  }, [employees]);

  function addEmployee(data) {
    setEmployees(prev => [...prev, { id: nextId, ...data }]);
    setNextId(prev => prev + 1);
  }

  function updateEmployee(id, data) {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...data } : emp))
    );
  }

  function deleteEmployee(id) {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }

  return { employees, addEmployee, updateEmployee, deleteEmployee };
}

// ── Styles (всё в одном месте) ───────────────────────────
const s = {
  page: { padding: 0 },

  stats: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 22 },
  statCard: { background: '#fff', border: '1px solid #fce4ef', borderRadius: 12, padding: '16px 20px' },
  statLabel: { fontSize: 12, color: '#bbb', marginBottom: 4 },
  statValue: { fontSize: 26, fontWeight: 600, color: '#e91e8c' },

  card: { background: '#fff', borderRadius: 14, border: '1px solid #fce4ef', padding: 24, marginBottom: 20 },
  cardTitle: { fontSize: 15, fontWeight: 600, color: '#e91e8c', marginBottom: 16 },

  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 16 },

  field: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 12, color: '#bbb' },
  input: {
    padding: '9px 13px', border: '1px solid #fce4ef', borderRadius: 8,
    fontSize: 13, color: '#555', outline: 'none', background: '#fff',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
  },

  btnPink: {
    background: '#e91e8c', color: '#fff', border: 'none',
    padding: '10px 30px', borderRadius: 8, fontSize: 14,
    cursor: 'pointer', display: 'block', margin: '0 auto', fontFamily: 'inherit',
  },
  btnOutline: {
    background: '#fff', color: '#e91e8c', border: '1px solid #e91e8c',
    padding: '9px 24px', borderRadius: 8, fontSize: 13,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  btnEdit:   { color: '#5b9bd5', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginRight: 8, fontFamily: 'inherit' },
  btnDelete: { color: '#e91e8c', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' },

  toolbar: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' },
  searchBox: {
    padding: '9px 13px', border: '1px solid #fce4ef', borderRadius: 8,
    fontSize: 13, color: '#555', outline: 'none', width: 220, fontFamily: 'inherit',
  },
  filterSelect: {
    padding: '9px 13px', border: '1px solid #fce4ef', borderRadius: 8,
    fontSize: 13, color: '#555', background: '#fff', outline: 'none',
    cursor: 'pointer', fontFamily: 'inherit',
  },

  tableWrap: { width: '100%', overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { color: '#e91e8c', fontWeight: 600, padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #fce4ef' },
  td: { padding: '13px 14px', borderBottom: '1px solid #faf0f5', color: '#555', verticalAlign: 'middle' },

  badgeActive:   { display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#e8f8f0', color: '#1a9e5c' },
  badgeInactive: { display: 'inline-block', padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#fce4ef', color: '#c0147a' },
  emptyState: { textAlign: 'center', color: '#ccc', padding: '40px 0', fontSize: 14 },

  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(233,30,140,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
  },
  modal: {
    background: '#fff', borderRadius: 16, padding: '28px 32px', width: 500,
    border: '1px solid #fce4ef', boxShadow: '0 8px 40px rgba(233,30,140,0.1)',
  },
  modalTitle: { color: '#e91e8c', fontSize: 18, fontWeight: 600, textAlign: 'center', marginBottom: 20 },
  modalActions: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 },

  toast: {
    position: 'fixed', bottom: 28, right: 28, background: '#e91e8c',
    color: '#fff', padding: '12px 22px', borderRadius: 10, fontSize: 13, zIndex: 999,
  },
};

// ── Constants ────────────────────────────────────────────
const DEPARTMENTS = ['Hair', 'Nails', 'Makeup', 'Skincare', 'Management'];
const EMPTY_FORM  = { name: '', position: '', department: '', email: '', status: 'Active' };

// ── Main Component ───────────────────────────────────────
const EmployeeManager = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  const [formData, setFormData]         = useState(EMPTY_FORM);
  const [searchTerm, setSearchTerm]     = useState('');
  const [deptFilter, setDeptFilter]     = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editId, setEditId]             = useState(null);
  const [editForm, setEditForm]         = useState(EMPTY_FORM);
  const [toast, setToast]               = useState('');
  const [focused, setFocused]           = useState('');

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  // Стиль инпута с фокусом
  const inp = (name) => ({
    ...s.input,
    borderColor: focused === name ? '#e91e8c' : '#fce4ef',
  });

  // ── Add ──────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.department || !formData.email) {
      showToast('Please fill in all fields!');
      return;
    }
    addEmployee(formData);
    setFormData(EMPTY_FORM);
    showToast('Employee added!');
  };

  // ── Edit ─────────────────────────────────────────────
  function openEdit(emp) {
    setEditId(emp.id);
    setEditForm({ name: emp.name, position: emp.position, department: emp.department, email: emp.email, status: emp.status });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    updateEmployee(editId, editForm);
    setEditId(null);
    showToast('Employee updated!');
  }

  // ── Delete ───────────────────────────────────────────
  function handleDelete(id) {
    if (!window.confirm('Delete this employee?')) return;
    deleteEmployee(id);
    showToast('Employee deleted.');
  }

  // ── Filter ───────────────────────────────────────────
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!deptFilter   || emp.department === deptFilter) &&
    (!statusFilter || emp.status === statusFilter)
  );

  const totalDepts = new Set(employees.map(e => e.department)).size;

  // ── Render ────────────────────────────────────────────
  return (
    <div style={s.page}>

      {/* Stats */}
      <div style={s.stats}>
        <div style={s.statCard}>
          <div style={s.statLabel}>Total Employees</div>
          <div style={s.statValue}>{employees.length}</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Active</div>
          <div style={s.statValue}>{employees.filter(e => e.status === 'Active').length}</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statLabel}>Departments</div>
          <div style={s.statValue}>{totalDepts}</div>
        </div>
      </div>

      {/* Add Employee Form */}
      <div style={s.card}>
        <div style={s.cardTitle}>Add New Employee</div>
        <form onSubmit={handleSubmit}>
          <div style={s.grid3}>
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input
                style={inp('name')} value={formData.name} placeholder="e.g. Aruna Bekova"
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Position</label>
              <input
                style={inp('position')} value={formData.position} placeholder="e.g. Stylist"
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                onFocus={() => setFocused('position')} onBlur={() => setFocused('')}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Department</label>
              <select
                style={inp('dept')} value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                onFocus={() => setFocused('dept')} onBlur={() => setFocused('')}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input
                style={inp('email')} type="email" value={formData.email} placeholder="email@bella.kz"
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Status</label>
              <select
                style={inp('status')} value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                onFocus={() => setFocused('status')} onBlur={() => setFocused('')}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button
            type="submit" style={s.btnPink}
            onMouseEnter={e => e.target.style.background = '#c0147a'}
            onMouseLeave={e => e.target.style.background = '#e91e8c'}
          >
            Add Employee
          </button>
        </form>
      </div>

      {/* Employee Table */}
      <div style={s.card}>
        <div style={s.toolbar}>
          <input
            style={s.searchBox} placeholder="Search by name..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          />
          <select style={s.filterSelect} value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select style={s.filterSelect} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {['ID', 'Name', 'Position', 'Department', 'Email', 'Status', 'Actions'].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" style={s.emptyState}>No employees found</td></tr>
              ) : (
                filtered.map((emp, i) => {
                  const tdStyle = {
                    ...s.td,
                    borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #faf0f5',
                  };
                  return (
                    <tr key={emp.id}>
                      <td style={{ ...tdStyle, color: '#ccc', fontSize: 12 }}>
                        #{String(emp.id).padStart(3, '0')}
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#444' }}>{emp.name}</td>
                      <td style={tdStyle}>{emp.position}</td>
                      <td style={tdStyle}>{emp.department}</td>
                      <td style={{ ...tdStyle, color: '#5b9bd5' }}>{emp.email}</td>
                      <td style={tdStyle}>
                        <span style={emp.status === 'Active' ? s.badgeActive : s.badgeInactive}>
                          {emp.status}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button style={s.btnEdit} onClick={() => openEdit(emp)}>Edit</button>
                        <button style={s.btnDelete} onClick={() => handleDelete(emp.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editId !== null && (
        <div style={s.modalOverlay} onClick={() => setEditId(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalTitle}>Edit Employee</div>
            <form onSubmit={handleSaveEdit}>
              <div style={s.grid3}>
                <div style={s.field}>
                  <label style={s.label}>Full Name</label>
                  <input style={s.input} value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Position</label>
                  <input style={s.input} value={editForm.position}
                    onChange={e => setEditForm({ ...editForm, position: e.target.value })} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Department</label>
                  <select style={s.input} value={editForm.department}
                    onChange={e => setEditForm({ ...editForm, department: e.target.value })}>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div style={s.grid2}>
                <div style={s.field}>
                  <label style={s.label}>Email</label>
                  <input style={s.input} type="email" value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Status</label>
                  <select style={s.input} value={editForm.status}
                    onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div style={s.modalActions}>
                <button type="button" style={s.btnOutline} onClick={() => setEditId(null)}>
                  Cancel
                </button>
                <button
                  type="submit" style={s.btnPink}
                  onMouseEnter={e => e.target.style.background = '#c0147a'}
                  onMouseLeave={e => e.target.style.background = '#e91e8c'}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && <div style={s.toast}>{toast}</div>}

    </div>
  );
};

export default EmployeeManager;