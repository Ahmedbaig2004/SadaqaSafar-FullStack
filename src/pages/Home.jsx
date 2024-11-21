import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Building2, ArrowRight, Globe, DollarSign } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Home = () => {
  const { user, ngo } = useAuthStore();

  return (
    <div className="space-y-16 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900 dark:to-teal-900 rounded-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Make a Difference with
          <span className="text-emerald-600 dark:text-emerald-400"> SadaqaSafar</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect with verified NGOs and contribute to meaningful causes. Every donation brings hope and creates positive change.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/ngos"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            Explore NGOs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          {/* Conditionally render these buttons based on whether a user is logged in */}
          {!user && !ngo && (
            <>
              <Link
                to="/ngo-register"
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-900"
              >
                Register as NGO
              </Link>
              <Link
                to="/ngo-login"
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-900"
              >
                Login as NGO
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Trusted Donations</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Every NGO is verified to ensure your donations reach the right causes.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mb-4">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Global Reach</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Support causes and NGOs from around the world, making a global impact.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Transparent Funding</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Track your donations and see the direct impact of your contributions.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">Verified NGOs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$10M+</div>
            <div className="text-gray-600 dark:text-gray-300">Funds Raised</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Countries Reached</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">100K+</div>
            <div className="text-gray-600 dark:text-gray-300">Lives Impacted</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;