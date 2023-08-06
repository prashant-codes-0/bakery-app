const jwt = require('jsonwebtoken');
const config=require('../config/config')
const BakeryItem = require('../models/bakeryItem');

// Place an order for a bakery item (authenticated route)
exports.placeOrder = (req, res) => {
  const { itemId, quantity } = req.body;

  // Verify the user token using the authentication middleware
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  // Verify the token to check if it's valid and extract the user data
  jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // Token is valid, user is authenticated
    // You can access the user data from the decodedToken
    const userId = decodedToken.id;
    console.log(userId)

    // Proceed with the order placement logic here
    // For example, find the bakery item by ID and create the order
    BakeryItem.findById(itemId)
      .then((item) => {
        if (!item) {
          return res.status(404).json({ error: 'Bakery item not found.' });
        }

        // Here, you can save the order in the database or perform any other order-related operations
        // For simplicity, we'll just return a response with order details
        const order = {
          userId, // The authenticated user's ID
          itemId: item._id,
          itemName: item.name,
          quantity,
          totalPrice: quantity * item.price, // Calculate totalPrice based on quantity and bakery item price
          // Add other order details as needed
        };

        res.json({ message: 'Order placed successfully.', order });
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred while processing the order.' });
      });
  });
};
