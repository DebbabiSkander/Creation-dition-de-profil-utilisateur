// src/pages/Home/Home.jsx

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Bienvenue sur ProfilHub</h1>
        <p className="text-xl text-gray-600 mb-8">
          La plateforme qui vous permet de partager vos compétences et de découvrir celles des autres.
          Créez votre profil professionnel et connectez-vous avec des personnes partageant les mêmes intérêts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
          <Link 
            to="/create-profile" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-lg"
          >
            Créer mon profil
          </Link>
          <Link 
            to="/explorer" 
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md border border-blue-600 transition duration-300 text-lg"
          >
            Explorer les profils
          </Link>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Partagez vos compétences</h3>
          <p className="text-gray-600">
            Présentez vos compétences techniques et votre expertise pour être visible par les autres utilisateurs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Trouvez des collaborateurs</h3>
          <p className="text-gray-600">
            Découvrez des personnes avec les compétences que vous recherchez pour vos projets ou collaborations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Développez votre réseau</h3>
          <p className="text-gray-600">
            Établissez des liens professionnels et élargissez votre réseau de contacts dans votre domaine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;