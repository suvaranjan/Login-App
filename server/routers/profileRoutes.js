const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileControllers');
const authMiddleware = require('../middleware/authMiddleware');

// Apply the authMiddleware to protect the profile routes
router.use(authMiddleware);

// GET: /api/profile
router.get('/profile', profileController.getProfile);

// PUT: /api/profile
router.put('/profile', profileController.updateProfile);

module.exports = router;
