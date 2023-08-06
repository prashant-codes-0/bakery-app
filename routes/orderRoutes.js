const express = require('express');
const router = express.Router();

// Import the order controller
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define the routes
// Protected route: Only logged-in users can place an order
router.post('/place-order', authMiddleware, orderController.placeOrder);

module.exports = router;
