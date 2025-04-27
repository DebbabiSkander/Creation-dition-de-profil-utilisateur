const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Create or update user profile
// @route   POST /api/profiles
// @access  Private
exports.createProfile = async (req, res) => {
  try {
    const {
      fullName,
      photo,
      dateNaissance,
      address,
      email,
      telephone,
      occupation,
      bio,
      competencesAcquises,
      competencesRecherchees,
      experiences
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      fullName,
      photo,
      dateNaissance,
      address,
      email,
      telephone,
      occupation,
      bio
    };

    // Add optional fields if they exist
    if (competencesAcquises) {
      profileFields.competencesAcquises = competencesAcquises;
    }
    if (competencesRecherchees) {
      profileFields.competencesRecherchees = competencesRecherchees;
    }
    if (experiences) {
      profileFields.experiences = experiences;
    }

    // Check if profile exists
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    
    // Update user to indicate they have a profile now
    await User.findByIdAndUpdate(req.user.id, { hasProfile: true });

    res.status(201).json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Get all profiles
// @route   GET /api/profiles
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['email']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profiles/user/:user_id
// @access  Public
exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['email']);

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Get my profile
// @route   GET /api/profiles/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['email']);

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Delete profile & user
// @route   DELETE /api/profiles
// @access  Private
exports.deleteProfile = async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    
    // Update user's hasProfile status
    await User.findByIdAndUpdate(req.user.id, { hasProfile: false });
    
    res.json({ message: 'Profil supprimé' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Update profile skills (competences)
// @route   PUT /api/profiles/competences
// @access  Private
exports.updateCompetences = async (req, res) => {
  const { competencesAcquises, competencesRecherchees } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    // Update skills
    if (competencesAcquises) profile.competencesAcquises = competencesAcquises;
    if (competencesRecherchees) profile.competencesRecherchees = competencesRecherchees;

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Update profile experiences
// @route   PUT /api/profiles/experiences
// @access  Private
exports.updateExperiences = async (req, res) => {
  const { experiences } = req.body;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: 'Profil non trouvé' });
    }

    // Update experiences
    profile.experiences = experiences;

    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};