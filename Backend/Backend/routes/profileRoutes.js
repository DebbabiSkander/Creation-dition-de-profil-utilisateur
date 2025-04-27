const express = require('express');
const router = express.Router();
const { 
  createProfile, 
  getProfiles, 
  getProfileByUserId, 
  getMyProfile, 
  deleteProfile,
  updateCompetences,
  updateExperiences
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

// Create or update profile
router.post('/', protect, createProfile);

// Get all profiles
router.get('/', getProfiles);

// Get current user's profile
router.get('/me', protect, getMyProfile);

// Get profile by user ID
router.get('/user/:user_id', getProfileByUserId);

// Delete profile
router.delete('/', protect, deleteProfile);

// Update competences
router.put('/competences', protect, updateCompetences);

// Update experiences
router.put('/experiences', protect, updateExperiences);

module.exports = router;