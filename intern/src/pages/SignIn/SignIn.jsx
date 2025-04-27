// src/pages/SignIn/SignIn.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../services/api'; // Import the auth service

const SignIn = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Adresse email invalide')
        .required('L\'email est obligatoire'),
      password: Yup.string()
        .required('Le mot de passe est obligatoire')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        
        // Call the login API endpoint
        const response = await authService.login({
          email: values.email,
          password: values.password
        });
        
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // If "remember me" is not checked, set token to expire in 24 hours
        if (!values.rememberMe) {
          const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
          localStorage.setItem('tokenExpiry', tokenExpiry);
        }
        
        // Redirect to home after successful login
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur de connexion. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full border rounded-lg px-3 py-2 ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="votre@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full border rounded-lg px-3 py-2 ${
              formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Votre mot de passe"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              onChange={formik.handleChange}
              checked={formik.values.rememberMe}
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          <div>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
              Mot de passe oublié?
            </Link>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Vous n'avez pas de compte?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;