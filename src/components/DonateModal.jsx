import React, { useState } from 'react';
import { X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { createDonation } from '../api/donations';
import { useNavigate } from 'react-router-dom';

const DonateModal = ({ cause, onClose }) => {
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await createDonation({
        causeId: cause._id,
        amount: Number(amount),
        message,
        anonymous
      }, token);

      // Handle successful donation
      onClose();
      // You might want to show a success message or redirect
    } catch (err) {
      setError(err.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl  dark:text-gray-800 p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Donate to {cause.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleDonate} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700  mb-1">
              Donation Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  dark:text-gray-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300  dark:text-gray-800  rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows="3"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
              Make this donation anonymous
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Donation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateModal;