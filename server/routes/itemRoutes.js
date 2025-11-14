// --- server/routes/itemRoutes.js ---

const express = require('express');
const router = express.Router();
const { createItem, getItems } = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

// @route  POST /api/items/
// @desc   Create a new item
// @access Private (We add our 'protect' middleware here)
router.post('/', protect, createItem);

// @route  GET /api/items/
// @desc   Get all items in the user's community
// @access Private (We 'protect' this route too)
router.get('/', protect, getItems);

module.exports = router;