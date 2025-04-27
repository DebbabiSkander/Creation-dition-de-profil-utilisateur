const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Config
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Route pour vérifier la connexion à la BD
app.get('/api/db-status', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  
  if (isConnected) {
    res.json({ 
      status: 'success', 
      message: 'Connecté à MongoDB', 
      dbName: mongoose.connection.name 
    });
  } else {
    res.status(500).json({ 
      status: 'error', 
      message: 'Non connecté à MongoDB',
      readyState: mongoose.connection.readyState
    });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Connect to MongoDB and start server
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    const dbConnected = await connectDB();
    
    if (dbConnected) {
      app.listen(PORT, () => {
        
        // console.log(`Server running on port ${PORT}`);
        // console.log(`Database status: Connected to ${mongoose.connection.name}`);
      });
    } else {
      // Supprimez ou commentez ces lignes:
      // console.log(`Server running on port ${PORT}`);
      // console.log('Database status: Not connected. Server started without DB connection.');
    }
  };

startServer();