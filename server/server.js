// 1. Import Packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// 2. Configure Environment Variables
// This line loads the MONGO_URI from our .env file
dotenv.config();

// 3. Initialize the App
const app = express();
app.use(express.json());

// 4. Define a "port"
const PORT = process.env.PORT || 5000;

// 5. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// 6. Create a "test route"
app.get('/', (req, res) => {
  res.send('Hello from the NeighborNest server!');
});

app.use('/api/auth', authRoutes);

// 7. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});