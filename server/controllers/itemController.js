// --- server/controllers/itemController.js ---

const Item = require('../models/Item');
const User = require('../models/User');

// --- 1. CREATE A NEW ITEM LOGIC ---
exports.createItem = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // We get owner and communityCode from req.user (thanks to our middleware!)
    const ownerId = req.user.id;
    const communityCode = req.user.community;

    const newItem = new Item({
      title,
      description,
      category,
      owner: ownerId,
      communityCode: communityCode,
    });

    const savedItem = await newItem.save();

    // ADD THIS ONE LINE to populate the owner before sending it
    await savedItem.populate('owner', 'username _id'); 
    
    res.status(201).json({ message: 'Item created successfully!', item: savedItem });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// --- 2. GET ALL ITEMS IN A COMMUNITY LOGIC ---
exports.getItems = async (req, res) => {
  try {
    // Get the user's community code from the token
    const communityCode = req.user.community;

    // Find all items that match the user's community
    const items = await Item.find({ communityCode: communityCode })
      .populate('owner', 'username _id') // <-- This is cool!
      .sort({ createdAt: -1 }); // Show newest items first

    // .populate() replaces the 'owner' ID with the actual User document,
    // but we only select the 'username' field to show.

    res.status(200).json(items);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
// --- (Inside server/controllers/itemController.js) ---

// --- 3. DELETE AN ITEM LOGIC ---
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the logged-in user is the owner
    // req.user.id comes from our 'protect' middleware
    if (item.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await item.deleteOne(); // Replaces the old .remove()

    res.status(200).json({ message: 'Item removed successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};