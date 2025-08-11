const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());             // Enable CORS for all requests
app.use(express.json());     // Parse JSON body

// Sample user data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET /users - list users
app.get('/users', (req, res) => {
  res.json(users);
});

app.delete('/users/:id', (req, res) => {
    console.log('Delete user endpoint hit');
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted', user: deletedUser });
});

// POST /users - add user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});



const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


