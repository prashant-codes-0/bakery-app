const express = require('express');
const router = express.Router();

// Import the order controller
const orderController = require('./controllers/orderController');

// Define the routes
router.post('/', orderController.placeOrder);

module.exports = router;
