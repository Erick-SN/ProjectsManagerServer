const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
//Server
const app = express();

//App connection
connectDB();

//Allow cors
app.use(cors());

//Allow express.json
app.use(express.json({ extended: true }));

//App port
const PORT = process.env.PORT || 4000;

//RoutImport
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
