import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { login } from '../../api/auth';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      setUser(response);
      setToken(response.token);
      if (response.role === 'user') {
        navigate('/');
      }  else {
        setError('Invalid user role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900  dark:text-white">Welcome Back</h1>
        <p className="mt-2 text-gray-500">Sign in to continue your journey of giving</p>
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
            <LogIn className="w-5 h-5" />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
          Are you an NGO?{' '}
          <Link to="/ngo-login" className="text-emerald-600 hover:text-emerald-700">
            Login as NGO
          </Link>
        </p>
        
        </div>
      </form>
    </div>
  );
};

export default Login;