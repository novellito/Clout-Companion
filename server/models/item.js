const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  buyPrice: {
    type: String,
    required: true
  },
  sellPrice: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  buyDate: {
    type: Array,
    required: true
  },
  sellDate: {
    type: Array,
    required: true
  }
});

const Item = (module.exports = mongoose.model('Item', ItemSchema));
