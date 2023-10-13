const mongoose = require('mongoose');

const ProductTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // ... other fields as needed
});

module.exports = mongoose.model('ProductType', ProductTypeSchema);
