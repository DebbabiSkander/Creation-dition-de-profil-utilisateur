// src/pages/ProfileView/ProfileView.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// Données simulées pour tester
const mockProfiles = {
  '1': {
    _id: '1',
    fullName: 'Marie Dupont',
    dateOfBirth: '1992-05-15',
    occupation: 'Développeuse Frontend',
    email: 'marie.dupont@example.com',
    phoneNumber: '+33 6 12 34 56 78',
    address: 'Paris, France',
    bio: 'Passionnée par le développement web et l\'UI/UX design. Je suis à la recherche de projets innovants et collaboratifs qui me permettent d\'utiliser ma créativité tout en relevant des défis techniques. Avec une expérience de 5 ans dans le domaine, j\'ai travaillé sur divers projets allant des applications web aux interfaces mobiles.',
    technicalSkills: ['React', 'Vue.js', 'CSS', 'JavaScript', 'HTML5', 'SASS', 'TypeScript'],
    seekingSkills: ['Node.js', 'Python', 'Design Thinking', 'AWS', 'Docker'],
    experience: 'Développeuse Frontend chez WebAgency (2018-présent)\n- Développement d\'interfaces utilisateur pour des clients internationaux\n- Optimisation des performances et de l\'accessibilité\n\nIntégratrice Web chez DigitalStudio (2015-2018)\n- Intégration de maquettes en HTML/CSS\n- Collaboration avec les designers UX/UI',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  '2': {
    _id: '2',
    fullName: 'Thomas Martin',
    dateOfBirth: '1989-11-23',
    occupation: 'Développeur Backend',
    email: 'thomas.martin@example.com',
    phoneNumber: '+33 6 98 76 54 32',
    address: 'Lyon, France',
    bio: 'Spécialiste en architecture logicielle et bases de données. Toujours à la recherche de nouveaux défis techniques pour améliorer mes compétences et créer des solutions robustes et évolutives.',
    technicalSkills: ['Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'Express', 'GraphQL', 'API RESTful'],
    seekingSkills: ['React', 'AWS', 'UI Design', 'Kubernetes', 'Flutter'],
    experience: 'Lead Developer chez TechSolutions (2017-présent)\n- Architecture de systèmes distribuées\n- Gestion d\'équipes de développeurs\n\nDéveloppeur Backend chez DataCompany (2014-2017)\n- Développement d\'APIs et services web\n- Optimisation de bases de données',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  '3': {
    _id: '3',
    fullName: 'Sophie Leclerc',
    dateOfBirth: '1994-08-07',
    occupation: 'Designer UI/UX',
    email: 'sophie.leclerc@example.com',
    phoneNumber: '+33 6 45 67 89 10',
    address: 'Bordeaux, France',
    bio: 'Designer créative spécialisée dans l\'expérience utilisateur et les interfaces mobiles. Je cherche à créer des designs à la fois esthétiques et fonctionnels qui résolvent des problèmes réels pour les utilisateurs.',
    technicalSkills: ['Figma', 'Adobe XD', 'Sketch', 'Prototypage', 'User Research', 'Wireframing', 'Design System'],
    seekingSkills: ['Frontend Development', 'Animation CSS', 'React Native', 'Marketing Digital'],
    experience: 'UI/UX Designer chez DesignStudio (2019-présent)\n- Conception d\'interfaces pour applications mobiles et web\n- Réalisation de tests utilisateurs\n\nDesigner Graphique chez CreativeAgency (2016-2019)\n- Création d\'identités visuelles\n- Design d\'interfaces web',
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  '4': {
    _id: '4',
    fullName: 'Lucas Bernard',
    dateOfBirth: '1990-02-12',
    occupation: 'DevOps Engineer',
    email: 'lucas.bernard@example.com',
    phoneNumber: '+33 6 23 45 67 89',
    address: 'Toulouse, France',
    bio: 'Expert en déploiement continu et en automatisation d\'infrastructure. Toujours prêt à partager mes connaissances et à améliorer les processus de développement et de déploiement.',
    technicalSkills: ['AWS', 'Kubernetes', 'Jenkins', 'Terraform', 'Docker', 'CI/CD', 'Ansible', 'Linux'],
    seekingSkills: ['Sécurité informatique', 'Microservices', 'Serverless', 'Machine Learning'],
    experience: 'DevOps Engineer chez CloudCompany (2018-présent)\n- Mise en place de pipelines CI/CD\n- Gestion d\'infrastructures cloud\n\nAdministrateur Système chez ITServices (2015-2018)\n- Administration de serveurs Linux\n- Automatisation de tâches avec Ansible',
    profileImage: 'https://randomuser.me/api/portraits/men/29.jpg'
  }
};

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dans une application réelle, on ferait un appel API ici
    // setLoading(true);
    // axios.get(`/api/profiles/${id}`)
    //   .then(response => {
    //     setProfile(response.data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     setError('Impossible de charger le profil');
    //     setLoading(false);
    //   });
    
    // Utilisation des données simulées pour l'exemple
    setTimeout(() => {
      if (mockProfiles[id]) {
        setProfile(mockProfiles[id]);
      } else {
        setError('Profil non trouvé');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Chargement du profil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-red-600 text-lg">{error || "Profil non trouvé"}</p>
        <Link to="/explorer" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
          Retour à la liste des profils
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-blue-50 p-6 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
              <img 
                src={profile.profileImage} 
                alt={profile.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-center">{profile.fullName}</h1>
            <p className="text-gray-600 text-center mb-4">{profile.occupation}</p>
            
            <div className="w-full mt-4">
              <h2 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Informations de contact</h2>
              <div className="space-y-2">
                <p className="flex items-start">
                  <span className="mr-2">📧</span>
                  <span>{profile.email}</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>{profile.phoneNumber}</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span>{profile.address}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-end mb-4">
              <Link 
                to={`/edit-profile/${profile._id}`} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modifier le profil
              </Link>
            </div>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">À propos</h2>
              <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Compétences techniques</h2>
              <div className="flex flex-wrap gap-2">
                {profile.technicalSkills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Compétences recherchées</h2>
              <div className="flex flex-wrap gap-2">
                {profile.seekingSkills.map((skill, idx) => (
                  <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            
            {profile.experience && (
              <section>
                <h2 className="text-xl font-semibold mb-3">Expérience</h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {profile.experience}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/explorer" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg">
          Retour à la liste des profils
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;