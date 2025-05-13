import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.age) {
      alert('Please fill out all fields');
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/api/users/update/${editId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/users/add', form);
    }

    setForm({ name: '', email: '', age: '' });
    setEditId(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.id);
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
        />
        <button onClick={handleSubmit}>
          {editId ? 'Update User' : 'Add User'}
        </button>
      </div>

      <h2>Users List</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <p><strong>{user.name}</strong> ({user.age})</p>
            <p>{user.email}</p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
