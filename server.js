const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const usersFile = path.join(__dirname, 'users.json');

app.use(cors());             // Enable CORS for all requests
app.use(express.json());     // Parse JSON body

// Helper functions
function readUsers() {
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Sample user data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET /users - list users
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.delete('/users/:id', (req, res) => {
    console.log('Delete user endpoint hit');
  const id = parseInt(req.params.id, 10);
  let users = readUsers();
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1)[0];
  writeUsers(users);
  res.json({ message: 'User deleted', user: deletedUser });
});

// POST /users - add user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  let users = readUsers();
  const newUser = {
    id: Math.floor(Math.random() * 1000) + 1,
    name,
    email,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});



const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


