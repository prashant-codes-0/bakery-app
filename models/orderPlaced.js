const mongoose = require('mongoose');

const orderPlacedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bakeryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BakeryItem',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderPlaced = mongoose.model('OrderPlaced', orderPlacedSchema);

module.exports = OrderPlaced;
