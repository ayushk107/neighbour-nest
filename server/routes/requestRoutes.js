// --- server/routes/requestRoutes.js ---

const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getReceivedRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

// @route  POST /api/requests/:itemId
// @desc   Create a new request for an item
router.post('/:itemId', protect, createRequest);

// @route  GET /api/requests/my-requests
// @desc   Get all requests the user has made
router.get('/my-requests', protect, getMyRequests);

// @route  GET /api/requests/received
// @desc   Get all requests for items the user owns
router.get('/received', protect, getReceivedRequests);

// @route  PUT /api/requests/:requestId
// @desc   Approve/reject a request
router.put('/:requestId', protect, updateRequestStatus);

module.exports = router;