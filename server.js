const express = require('express');
const app = express();

// Import and use required middleware
const bodyParser = require('body-parser');
const cors = require('cors');

// Database connection
const mongoose = require('mongoose');
const config = require('./config/config');
// Load environment variables from .env file
require('dotenv').config();


// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Import and use routes
const bakeryItemRoutes = require('./routes/bakeryItemRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/bakeryItems', bakeryItemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


mongoose
  .connect(config.mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));




  const port = config.PORT;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });