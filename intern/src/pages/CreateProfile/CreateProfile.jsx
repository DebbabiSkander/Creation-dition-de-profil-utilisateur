// src/pages/CreateProfile/CreateProfile.jsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Validation du formulaire étape 1
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Le nom complet est obligatoire'),
    dateOfBirth: Yup.date().required('La date de naissance est obligatoire'),
    address: Yup.string().required('L\'adresse est obligatoire'),
    email: Yup.string().email('Email invalide').required('L\'email est obligatoire'),
    phoneNumber: Yup.string().required('Le numéro de téléphone est obligatoire'),
    occupation: Yup.string().required('La profession est obligatoire'),
    bio: Yup.string().required('La bio est obligatoire').min(10, 'La bio doit contenir au moins 10 caractères')
  });

  // Validation du formulaire étape 2
  const validationSchema2 = Yup.object({
    technicalSkills: Yup.array(),
    seekingSkills: Yup.array(),
    experience: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dateOfBirth: '',
      address: '',
      email: '',
      phoneNumber: '',
      occupation: '',
      bio: '',
      technicalSkills: [],
      seekingSkills: [],
      experience: ''
    },
    validationSchema: step === 1 ? validationSchema : validationSchema2,
    onSubmit: (values) => {
      if (step === 1) {
        setStep(2);
      } else {
        // Ici, on enverrait les données au backend
        const formData = new FormData();
        for (const key in values) {
          if (key === 'technicalSkills' || key === 'seekingSkills') {
            formData.append(key, JSON.stringify(values[key]));
          } else {
            formData.append(key, values[key]);
          }
        }
        if (profileImage) {
          formData.append('profileImage', profileImage);
        }
        
        console.log('Form data to submit:', Object.fromEntries(formData));
        // Appel API ici avec axios
        // axios.post('/api/profiles', formData)
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (type, skill) => {
    if (skill && !formik.values[type].includes(skill)) {
      formik.setFieldValue(type, [...formik.values[type], skill]);
      document.getElementById(`${type}Input`).value = '';
    }
  };

  const removeSkill = (type, skillToRemove) => {
    formik.setFieldValue(
      type,
      formik.values[type].filter(skill => skill !== skillToRemove)
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        {step === 1 ? 'Créer votre profil - Informations personnelles' : 'Compétences et expérience'}
      </h1>
      
      <form onSubmit={formik.handleSubmit}>
        {step === 1 ? (
          <>
            <div className="mb-6 flex flex-col items-center">
              <div className="mb-4 w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500">Photo</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
                id="profileImage"
                name="profileImage"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-700 mb-1">Date de naissance *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.dateOfBirth}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-gray-700 mb-1">Numéro de téléphone *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 mb-1">Adresse *</label>
                <input
                  type="text" 
                  id="address"
                  name="address"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                )}
              </div>

              <div>
                <label htmlFor="occupation" className="block text-gray-700 mb-1">Profession *</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.occupation && formik.errors.occupation ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.occupation}
                />
                {formik.touched.occupation && formik.errors.occupation && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.occupation}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-gray-700 mb-1">Bio *</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  className={`w-full border rounded-lg px-3 py-2 ${formik.touched.bio && formik.errors.bio ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bio}
                  placeholder="Parlez-nous de vous..."
                ></textarea>
                {formik.touched.bio && formik.errors.bio && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Compétences techniques acquises</label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="technicalSkillsInput"
                  className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2"
                  placeholder="Ajouter une compétence..."
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                  onClick={() => addSkill('technicalSkills', document.getElementById('technicalSkillsInput').value)}
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.technicalSkills.map((skill, index) => (
                  <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      onClick={() => removeSkill('technicalSkills', skill)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Compétences recherchées</label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="seekingSkillsInput"
                  className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2"
                  placeholder="Ajouter une compétence recherchée..."
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                  onClick={() => addSkill('seekingSkills', document.getElementById('seekingSkillsInput').value)}
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.seekingSkills.map((skill, index) => (
                  <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-green-600 hover:text-green-800"
                      onClick={() => removeSkill('seekingSkills', skill)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="experience" className="block text-gray-700 mb-1">Expérience</label>
              <textarea
                id="experience"
                name="experience"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                onChange={formik.handleChange}
                value={formik.values.experience}
                placeholder="Décrivez votre expérience professionnelle..."
              ></textarea>
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step === 2 && (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg"
              onClick={() => setStep(1)}
            >
              Retour
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg ml-auto"
          >
            {step === 1 ? 'Suivant' : 'Créer mon profil'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;