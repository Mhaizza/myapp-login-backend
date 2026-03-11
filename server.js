const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const users = [{id:1, email:'user@example.com', password:'password123'}];

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({error: 'Invalid credentials'});
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-123';
  res.json({token, user: {id: user.id, email: user.email}});
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-123') {
    res.json({message: 'SUCCESS!', user: 'user@example.com'});
  } else {
    res.status(401).json({error: 'Invalid token'});
  }
});

app.listen(3000, () => console.log('✅ Backend + CORS LIVE!'));
