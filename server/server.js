// --- server/server.js ---

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors'); // <--- 1. ADD THIS IMPORT

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const requestRoutes = require('./routes/requestRoutes');

dotenv.config();
const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(morgan('dev'));
app.use(cors()); // <--- 2. ADD THIS LINE (This allows all origins)

// --- DB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Hello from the NeighborNest server!');
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});