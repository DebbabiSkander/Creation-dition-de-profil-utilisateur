const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Première étape (obligatoire)
  fullName: {
    type: String,
    required: [true, 'Nom complet est obligatoire']
  },
  photo: {
    type: String,  // URL ou base64 de la photo
    default: 'default-profile.jpg'
  },
  dateNaissance: {
    type: Date,
    required: [true, 'Date de naissance est obligatoire']
  },
  address: {
    type: String,
    required: [true, 'Adresse est obligatoire']
  },
  email: {
    type: String,
    required: [true, 'Email est obligatoire']
  },
  telephone: {
    type: String,
    required: [true, 'Numéro de téléphone est obligatoire']
  },
  occupation: {
    type: String,
    required: [true, 'Occupation est obligatoire']
  },
  bio: {
    type: String,
    required: [true, 'Bio est obligatoire']
  },
  
  // Deuxième étape (facultatif)
  competencesAcquises: [{
    type: String
  }],
  competencesRecherchees: [{
    type: String
  }],
  experiences: [{
    titre: String,
    entreprise: String,
    periode: String,
    description: String
  }],
  
  // Métadonnées
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Mettre à jour updatedAt à chaque modification
ProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);