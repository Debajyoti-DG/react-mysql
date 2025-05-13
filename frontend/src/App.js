import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS styles

const API_BASE = 'http://localhost:3000/api/users'; // Change when deploying

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '', id: null });

  const fetchUsers = async () => {
    const res = await axios.get(API_BASE);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, id } = form;

    if (!name || !email || !age) return;

    const ageNumber = Number(age);
    if (isNaN(ageNumber)) return;

    const userData = { name, email, age: ageNumber };

    if (id === null) {
      await axios.post(API_BASE, userData);
    } else {
      await axios.put(`${API_BASE}/${id}`, userData);
    }

    setForm({ name: '', email: '', age: '', id: null });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({ ...user, age: String(user.age) });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>🌟 User Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })}
          placeholder="Age"
          required
        />
        <button type="submit">{form.id ? 'Update' : 'Add'} User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id} className="user-card">
            <div>
              <strong>{user.name}</strong><br />
              📧 {user.email}<br />
              🎂 Age: {user.age}
            </div>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
