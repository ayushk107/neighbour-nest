// 1. Import our packages
const express = require('express');

// 2. Initialize the app
const app = express();

// 3. Define a "port"
// We'll use 5000 for the backend
const PORT = 5000;

// 4. Create a "test route"
// This is an endpoint for our server
app.get('/', (req, res) => {
  // req = request, res = response
  res.send('Hello from the NeighborNest server!');
});

// 5. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 


