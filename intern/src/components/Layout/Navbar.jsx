// src/components/Layout/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'font-bold text-blue-600' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">ProfilHub</Link>
        
        {/* Menu pour écrans larges */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={`text-gray-700 hover:text-blue-600 ${isActive('/')}`}>Accueil</Link>
          <Link to="/explorer" className={`text-gray-700 hover:text-blue-600 ${isActive('/explorer')}`}>Explorer</Link>
          <Link to="/create-profile" className={`text-gray-700 hover:text-blue-600 ${isActive('/create-profile')}`}>Créer un profil</Link>
          <Link to="/my-account" className={`text-gray-700 hover:text-blue-600 ${isActive('/my-account')}`}>Mon compte</Link>
          <Link to="/signin" className={`text-gray-700 hover:text-blue-600 ${isActive('/signin')}`}>Se connecter</Link>
          <Link to="/signup" className={`text-gray-700 hover:text-blue-600 ${isActive('/signup')}`}>S'inscrire</Link>
        </div>
        
        {/* Menu hamburger pour mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 space-y-3">
          <Link to="/" className={`block text-gray-700 hover:text-blue-600 ${isActive('/')}`} onClick={toggleMenu}>Accueil</Link>
          <Link to="/explorer" className={`block text-gray-700 hover:text-blue-600 ${isActive('/explorer')}`} onClick={toggleMenu}>Explorer</Link>
          <Link to="/create-profile" className={`block text-gray-700 hover:text-blue-600 ${isActive('/create-profile')}`} onClick={toggleMenu}>Créer un profil</Link>
          <Link to="/my-account" className={`block text-gray-700 hover:text-blue-600 ${isActive('/my-account')}`} onClick={toggleMenu}>Mon compte</Link>
          <Link to="/signin" className={`block text-gray-700 hover:text-blue-600 ${isActive('/signin')}`} onClick={toggleMenu}>Se connecter</Link>
          <Link to="/signup" className={`block text-gray-700 hover:text-blue-600 ${isActive('/signup')}`} onClick={toggleMenu}>S'inscrire</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;