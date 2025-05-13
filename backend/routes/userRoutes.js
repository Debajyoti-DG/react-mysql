const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a user
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(query, [name, email, age], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name, email, age });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  const { name, email, age } = req.body;
  const { id } = req.params;
  if (!name || !email || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(query, [name, email, age, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id, name, email, age });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id });
  });
});

module.exports = router;
