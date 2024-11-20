import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogIn, UserPlus, LogOut, User, Settings } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { user, ngo, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-800">SadaqaSafar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/ngos" className="text-gray-600 hover:text-emerald-600">
              NGOs
            </Link>
            {/* {user?.role === 'ngo' && (
              <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600">
                Dashboard
              </Link>
            )}
            {user?.role === 'user' && (
              <Link to="/donations" className="text-gray-600 hover:text-emerald-600">
                My Donations
              </Link>
            )} */}


            {ngo ?
              <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600">
                Dashboard
              </Link>

              :
              <Link to="/donations" className="text-gray-600 hover:text-emerald-600">
                My Donations
              </Link>
            }
          </div>

          {/* <div className="flex items-center space-x-4">
            {(user || ngo) ? (
              <>
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-5 w-5" />
                  <span>{ngo ? ngo.name : user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </> */}
          <div className="flex items-center space-x-4">
            {(user || ngo) ? (
              <>
                {/* Profile Settings Link */}
                <Link
                  to={ngo ? '/ngo-profile/settings' : '/profile/settings'}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600"
                >                
                <div className="flex items-center space-x-2 text-gray-600">
                    <User className="h-5 w-5" />
                    <span>{ngo ? ngo.name : user.name}</span>
                  </div>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;