const jwt = require('jsonwebtoken');
const BakeryItem = require('../models/bakeryItem');
const { JWT_SECRET } = process.env;

// Controller logic for bakery items

// Create a new bakery item
exports.createBakeryItem = (req, res) => {
  const { name, description, price, image } = req.body;
  const newBakeryItem = new BakeryItem({ name, description, price, image });

  newBakeryItem
    .save()
    .then((createdItem) => {
      res.status(201).json(createdItem);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while creating the bakery item.' });
    });
};

// Update an existing bakery item
exports.updateBakeryItem = (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  BakeryItem.findByIdAndUpdate(
    id,
    { name, description, price, image },
    { new: true, runValidators: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ error: 'Bakery item not found.' });
      }
      res.json(updatedItem);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while updating the bakery item.' });
    });
};

// Get a single bakery item by ID
exports.getBakeryItemById = (req, res) => {
  const { id } = req.params;

  BakeryItem.findById(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Bakery item not found.' });
      }
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while fetching the bakery item.' });
    });
};

// Get all bakery items
exports.getAllBakeryItems = (req, res) => {
  BakeryItem.find()
    .then((bakeryItems) => {
      res.json(bakeryItems);
    })
    .catch((err) => {
      res.status(500).json({ error: 'An error occurred while fetching bakery items.' });
    });
};



// Delete a bakery item
exports.deleteBakeryItem = (req, res) => {
    const { id } = req.params;
  
    BakeryItem.findByIdAndDelete(id)
      .then((deletedItem) => {
        if (!deletedItem) {
          return res.status(404).json({ error: 'Bakery item not found.' });
        }
        res.json({ message: 'Bakery item deleted successfully.' });
      })
      .catch((err) => {
        res.status(500).json({ error: 'An error occurred while deleting the bakery item.' });
      });
  };