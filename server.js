const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/apis/auth'));
app.use('/api/projects', require('./routes/apis/projects'));
app.use('/api/okrs', require('./routes/apis/okrs'));
app.use('/api/assessments', require('./routes/apis/assessments')); 
app.use('/api/users', require('./routes/apis/users')); 


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
