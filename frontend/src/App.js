import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './App.css'; // Import CSS styles

const API_BASE = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '', id: null });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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

    try {
      if (id === null) {
        await axios.post(`${API_BASE}/users`, userData);
      } else {
        await axios.put(`${API_BASE}/users/${id}`, userData);
      }
      setForm({ name: '', email: '', age: '', id: null });
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setForm({ ...user, age: String(user.age) });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
