// --- server/controllers/requestController.js ---

const Request = require('../models/Request');
const Item = require('../models/Item');

// --- 1. CREATE A NEW REQUEST ---
exports.createRequest = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find the item owner
    const owner = item.owner;

    // Check if user already requested this item
    const existingRequest = await Request.findOne({
      item: req.params.itemId,
      requester: req.user.id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You have already requested this item' });
    }

    // Create the request
    const newRequest = new Request({
      item: req.params.itemId,
      requester: req.user.id,
      owner: owner,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// --- 2. GET REQUESTS A USER HAS MADE ---
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id })
      .populate('item', 'title')
      .populate('owner', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// --- 3. GET REQUESTS A USER HAS RECEIVED ---
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ owner: req.user.id })
      .populate('item', 'title')
      .populate('requester', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// --- 4. UPDATE A REQUEST STATUS (APPROVE/REJECT) ---
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const request = await Request.findById(req.params.requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Security check: Only the item owner can update the request
    if (request.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status}`, request });

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};