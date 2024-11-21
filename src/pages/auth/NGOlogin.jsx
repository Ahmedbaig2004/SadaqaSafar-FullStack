import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { loginNGO } from '../../api/auth';
import useAuthStore from '../../store/authStore';

export default function NGOLogin() {
  const navigate = useNavigate();
  const { setNGO, setToken } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginNGO(formData.email, formData.password);
      if (response.role !== 'ngo') {
        setError('Invalid NGO account');
        return;
      }
      // setUser(response);
      setNGO(response);
      setToken(response.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'NGO Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">NGO Login</h1>
        <p className="mt-2 text-gray-500  dark:text-white">Welcome back! Please sign in to your NGO account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            <Building2 className="w-5 h-5" />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500">
          <p>
            Don't have an NGO account?{' '}
            <Link to="/register-ngo" className="text-emerald-600 hover:text-emerald-700">
              Register here
            </Link>
          </p>
          <p className="mt-2">
            Are you a user?{' '}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
              Login as User
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}