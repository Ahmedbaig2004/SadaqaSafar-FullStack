import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Heart, AlertCircle } from 'lucide-react';
import { getNGOs } from '../api/ngo';

const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await getNGOs();
        setNgos(response);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900  dark:text-white">NGOs</h1>
        <p className="mt-2 text-gray-500">Discover and support organizations making a difference</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo) => (
          <div key={ngo._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <img
              src={ngo.logo || `https://source.unsplash.com/800x600/?${ngo.domain}`}
              alt={ngo.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{ngo.name}</h3>
                {ngo.verified ? (
                  <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Pending Verification
                  </span>
                )}
              </div>
              <div className="flex items-center text-gray-500 mb-2">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{ngo.domain}</span>
              </div>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{ngo.location}</span>
              </div>
              <p className="text-gray-500 mb-6 line-clamp-2">{ngo.description}</p>
              <Link
                to={`/ngos/${ngo._id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <Heart className="w-4 h-4" />
                View Causes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOList;