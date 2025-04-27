// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home/Home';
import Explorer from './pages/Explorer/Explorer';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import ProfileView from './pages/ProfileView/ProfileView';
import MyAccount from './pages/MyAccount/MyAccount';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 py-6">
          <div className="container mx-auto text-center text-gray-600">
            &copy; {new Date().getFullYear()} ProfilHub. Tous droits réservés.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;