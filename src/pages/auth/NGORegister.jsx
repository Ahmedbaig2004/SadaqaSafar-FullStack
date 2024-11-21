import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { registerNGO } from '../../api/auth';


export default function NGORegister() {
  const navigate = useNavigate();
  const { setNGO, setToken } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    domain:'',
    confirmPassword: '',
    registrationNumber: '',
    description: '',
    logo: ''  // Add field for logo
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await registerNGO({
        name: formData.name,
        email: formData.email,
        domain:formData.domain,
        password: formData.password,
        registrationNumber: formData.registrationNumber,
        description: formData.description,
        logo: formData.logo // Include logo in the submission data
      });
      
      // setUser(response);
      setNGO(response)
      setToken(response.token);
      navigate('/ngo-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'NGO Registration failed');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value // Handle file input for logo
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900  dark:text-white">Register NGO</h1>
        <p className="mt-2 text-gray-500">Join us in making a difference</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              NGO Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
              NGO Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              NGO Domain
            </label>
            <textarea
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={1}
            
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              NGO Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              required
            />
          </div>

          <div>
  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
    NGO Logo URL
  </label>
  <input
    type="text"
    id="logo"
    name="logo"
    value={formData.logo}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
    placeholder="Enter the URL of your NGO's logo"
  />
</div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300  text-gray-900 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            <Building2 className="w-5 h-5" />
            {loading ? 'Registering NGO...' : 'Register NGO'}
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500">
          <p>
            Already registered?{' '}
            <Link to="/login-ngo" className="text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
