// src/pages/Explorer/Explorer.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

// Données simulées pour tester
const mockProfiles = [
  {
    _id: '1',
    fullName: 'Marie Dupont',
    occupation: 'Développeuse Frontend',
    bio: 'Passionnée par le développement web et l\'UI/UX design. Je suis à la recherche de projets innovants.',
    technicalSkills: ['React', 'Vue.js', 'CSS', 'JavaScript'],
    seekingSkills: ['Node.js', 'Python', 'Design Thinking'],
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    _id: '2',
    fullName: 'Thomas Martin',
    occupation: 'Développeur Backend',
    bio: 'Spécialiste en architecture logicielle et bases de données. Toujours à la recherche de nouveaux défis techniques.',
    technicalSkills: ['Node.js', 'MongoDB', 'PostgreSQL', 'Docker'],
    seekingSkills: ['React', 'AWS', 'UI Design'], 
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    _id: '3',
    fullName: 'Sophie Leclerc',
    occupation: 'Designer UI/UX',
    bio: 'Designer créative spécialisée dans l\'expérience utilisateur et les interfaces mobiles.',
    technicalSkills: ['Figma', 'Adobe XD', 'Sketch', 'Prototypage'],
    seekingSkills: ['Frontend Development', 'Animation CSS'],
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    _id: '4',
    fullName: 'Lucas Bernard',
    occupation: 'DevOps Engineer',
    bio: 'Expert en déploiement continu et en automatisation d\'infrastructure. Toujours prêt à partager mes connaissances.',
    technicalSkills: ['AWS', 'Kubernetes', 'Jenkins', 'Terraform'],
    seekingSkills: ['Sécurité informatique', 'Microservices'],
    profileImage: 'https://randomuser.me/api/portraits/men/29.jpg'
  }
];

const Explorer = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');

  useEffect(() => {
    // Dans une application réelle, on ferait un appel API ici
    // setLoading(true);
    // axios.get('/api/profiles')
    //   .then(response => {
    //     setProfiles(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching profiles:', error);
    //     setLoading(false);
    //   });
    
    // Utilisation des données simulées pour l'exemple
    setTimeout(() => {
      setProfiles(mockProfiles);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         profile.occupation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = filterSkill === '' || 
                        profile.technicalSkills.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase())) ||
                        profile.seekingSkills.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase()));
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Explorer les profils</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-gray-700 mb-2">Rechercher par nom ou profession</label>
            <input
              type="text"
              id="search"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="filterSkill" className="block text-gray-700 mb-2">Filtrer par compétence</label>
            <input
              type="text"
              id="filterSkill"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Filtrer par compétence..."
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Chargement des profils...</p>
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600">Aucun profil ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map(profile => (
            <div key={profile._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative pb-48">
                <img 
                  src={profile.profileImage} 
                  alt={profile.fullName} 
                  className="absolute h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{profile.fullName}</h2>
                <p className="text-gray-600 mb-3">{profile.occupation}</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{profile.bio}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm text-gray-600 mb-2">Compétences</h3>
                  <div className="flex flex-wrap gap-1">
                    {profile.technicalSkills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {profile.technicalSkills.length > 3 && (
                      <span className="text-gray-500 text-xs">+{profile.technicalSkills.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <Link 
                  to={`/profile/${profile._id}`} 
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Voir le profil
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explorer;