// src/pages/SignUp/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authService } from '../../services/api'; // Import the auth service

const SignUp = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Le nom complet est obligatoire'),
      email: Yup.string()
        .email('Adresse email invalide')
        .required('L\'email est obligatoire'),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .required('Le mot de passe est obligatoire'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
        .required('La confirmation du mot de passe est obligatoire'),
      acceptTerms: Yup.bool()
        .oneOf([true], 'Vous devez accepter les conditions d\'utilisation')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError('');
        
        // Extract the name from fullName (splitting into first and last name)
        const nameParts = values.fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Call the register API endpoint
        const response = await authService.register({
          name: values.fullName,
          firstName, // If your API requires these
          lastName,  // If your API requires these
          email: values.email,
          password: values.password
        });
        
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Show success message or redirect
        navigate('/signin', { state: { registrationSuccess: true } });
      } catch (err) {
        setError(err.response?.data?.message || 'Erreur d\'inscription. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 mb-2">Nom complet</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`w-full border rounded-lg px-3 py-2 ${
              formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            placeholder="Votre nom complet"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
          )}
        </div>
        
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
        
        <div className="mb-4">
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
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-full border rounded-lg px-3 py-2 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Confirmez votre mot de passe"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              onChange={formik.handleChange}
              checked={formik.values.acceptTerms}
            />
            <label htmlFor="acceptTerms" className="ml-2 text-gray-700">
              J'accepte les{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                conditions d'utilisation
              </Link>
              {' '}et la{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                politique de confidentialité
              </Link>
            </label>
          </div>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.acceptTerms}</div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Vous avez déjà un compte?{' '}
          <Link to="/signin" className="text-blue-600 hover:text-blue-800 font-semibold">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;