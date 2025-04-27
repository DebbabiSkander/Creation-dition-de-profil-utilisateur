// src/pages/MyAccount/MyAccount.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

// Données simulées pour l'exemple
const mockUserProfile = {
  _id: '1',
  fullName: 'maissa dridi',
  dateOfBirth: '2025-04-27',
  occupation: 'ingenieur',
  email: 'maissa@gmail.com',
  phoneNumber: '99201853',
  address: 'Paris',
  bio: 'passinonnee par developement web et mobile',
  technicalSkills: ['React'],
  seekingSkills: [ 'Python'],
  profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
};

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Dans une application réelle, on récupérerait les données de l'utilisateur connecté
    // setLoading(true);
    // axios.get('/api/user/profile')
    //   .then(response => {
    //     setUser(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //     setLoading(false);
    //   });
    
    // Utilisation des données simulées pour l'exemple
    // src/pages/MyAccount/MyAccount.jsx (suite)
    setTimeout(() => {
        setUser(mockUserProfile);
        setLoading(false);
      }, 500);
    }, []);
  
    if (loading) {
      return (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      );
    }
  
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-gray-50 p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img 
                    src={user.profileImage} 
                    alt={user.fullName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
                <p className="text-gray-600">{user.occupation}</p>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'profile' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profil
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'account' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('account')}
                >
                  Paramètres du compte
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'security' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  Sécurité
                </button>
                <button
                  className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Se déconnecter
                </button>
              </nav>
            </div>
            
            {/* Content */}
            <div className="md:w-3/4 p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Informations du profil</h3>
                    <Link 
                      to={`/create-profile`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Modifier le profil
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-gray-500 mb-1">Nom complet</h4>
                      <p className="text-gray-800">{user.fullName}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 mb-1">Email</h4>
                      <p className="text-gray-800">{user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 mb-1">Téléphone</h4>
                      <p className="text-gray-800">{user.phoneNumber}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 mb-1">Adresse</h4>
                      <p className="text-gray-800">{user.address}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 mb-1">Profession</h4>
                      <p className="text-gray-800">{user.occupation}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-500 mb-1">Date de naissance</h4>
                      <p className="text-gray-800">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-gray-500 mb-1">Bio</h4>
                    <p className="text-gray-800">{user.bio}</p>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-gray-500 mb-3">Compétences techniques</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.technicalSkills.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-gray-500 mb-3">Compétences recherchées</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.seekingSkills.map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'account' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Paramètres du compte</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Notifications</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Recevoir des emails concernant les mises à jour</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Visibilité du profil</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Rendre mon profil visible publiquement</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Langue</h4>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Sécurité</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-4">Changer le mot de passe</h4>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-gray-600 mb-1">Mot de passe actuel</label>
                          <input 
                            type="password" 
                            id="currentPassword" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            placeholder="Votre mot de passe actuel"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-gray-600 mb-1">Nouveau mot de passe</label>
                          <input 
                            type="password" 
                            id="newPassword" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            placeholder="Votre nouveau mot de passe"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmNewPassword" className="block text-gray-600 mb-1">Confirmer le nouveau mot de passe</label>
                          <input 
                            type="password" 
                            id="confirmNewPassword" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                            placeholder="Confirmer votre nouveau mot de passe"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        >
                          Mettre à jour le mot de passe
                        </button>
                      </form>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Authentification à deux facteurs</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">Activer l'authentification à deux facteurs</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button className="text-red-600 hover:text-red-800">
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyAccount;