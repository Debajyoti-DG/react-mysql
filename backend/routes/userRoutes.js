const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/add', (req, res) => {
  const { name, email, age } = req.body;
  const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(query, [name, email, age], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User added!");
  });
});

// READ
router.get('/', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// UPDATE
router.put('/update/:id', (req, res) => {
  const { name, email, age } = req.body;
  const { id } = req.params;
  db.query("UPDATE users SET name=?, email=?, age=? WHERE id=?", [name, email, age, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User updated!");
  });
});

// DELETE
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User deleted!");
  });
});

module.exports = router;
