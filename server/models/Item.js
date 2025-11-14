const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Tool', 'Appliance', 'Skill', 'Other'], // Only allows these values
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true, // Items are available by default
  },
  communityCode: {
    type: String,
    required: true, // We add this to make searching easier
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Creates a link to a User document
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);