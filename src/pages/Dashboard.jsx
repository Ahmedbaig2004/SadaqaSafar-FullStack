import React, { useState, useEffect, useRef } from 'react';
import { createCause, getNGOCauses } from '../api/causes';
import { getConversations, getMessages, sendMessage } from '../api/messages';
import useAuthStore from '../store/authStore';
import { Plus, X, MessageSquare } from 'lucide-react';
import ChatSidebar from '../components/sidebar';
import ChatWindow from '../components/chatwindow';

export default function NGODashboard() {
  const { ngo, token } = useAuthStore();
  const [showCauseModal, setShowCauseModal] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [causes, setCauses] = useState([]);
  const [newCause, setNewCause] = useState({
    title: '',
    description: '',
    goalAmount: '',
    category: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagePollingInterval = useRef(null);

  useEffect(() => {
    fetchCauses();
    fetchConversations();
    return () => {
      if (messagePollingInterval.current) {
        clearInterval(messagePollingInterval.current);
      }
    };
  }, [ngo._id]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
      messagePollingInterval.current = setInterval(() => {
        fetchMessages(selectedConversation._id);
      }, 3000);
    }

    return () => {
      if (messagePollingInterval.current) {
        clearInterval(messagePollingInterval.current);
      }
    };
  }, [selectedConversation]);

  const fetchCauses = async () => {
    if (!ngo || !ngo._id) return;
    try {
      setLoading(true);
      const fetchedCauses = await getNGOCauses(ngo._id);
      setCauses(fetchedCauses);
    } catch (error) {
      setError('Failed to fetch causes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await getConversations(token);
      setConversations(response.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await getMessages(conversationId, token);
      setMessages(response.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation?._id) return;

    try {
      const response = await sendMessage(selectedConversation._id, newMessage, token);
      setMessages(prev => [...prev, response.message]);
      setNewMessage('');
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCause(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCause(newCause, token);
      setShowCauseModal(false);
      fetchCauses();
      setNewCause({
        title: '',
        description: '',
        goalAmount: '',
        category: '',
        endDate: ''
      });
    } catch (error) {
      setError('Failed to create cause. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-emerald-900 dark:to-emerald-800 ">
      <header className="bg-gradient-to-r   dark:from-emerald-800 dark:to-emerald-700 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">NGO Dashboard</h1>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setShowChatInterface(!showChatInterface)}
                className="px-4 py-2 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                {showChatInterface ? 'Hide Messages' : 'Show Messages'}
              </button>
              <button 
                onClick={() => setShowCauseModal(true)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Cause
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`${showChatInterface ? 'lg:w-2/3' : 'w-full'}`}>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Active Causes</h2>
            {loading ? (
              <p className="text-center text-gray-600 dark:text-gray-300">Loading causes...</p>
            ) : causes.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-300">No causes found. Create your first cause!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {causes.map((cause) => (
                  <div key={cause._id} className="bg-emerald-50 dark:bg-gray-800 shadow-md rounded-lg p-6 hover:shadow-lg transition">
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">{cause.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{cause.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Goal: ₹{cause.goalAmount}</span>
                      <span className="bg-emerald-100 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full text-xs">
                        {cause.category}
                      </span>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Ends on: {new Date(cause.endDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showChatInterface && (
            <div className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold p-4 border-b dark:bg-gradient-to-br dark:from-emerald-800 dark:to-emerald-400 dark:text-gray-100">Messages</h2>
              <div className="h-[calc(100vh-16rem)] flex flex-col">
                <ChatSidebar
                  conversations={conversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={setSelectedConversation}
                />
                <ChatWindow
                  conversation={selectedConversation}
                  messages={messages}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {showCauseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-gray-100">Add New Cause</h2>
              <button onClick={() => setShowCauseModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newCause.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newCause.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Goal Amount (₹)</label>
                <input
                  type="number"
                  id="goalAmount"
                  name="goalAmount"
                  value={newCause.goalAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newCause.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="environment">Environment</option>
                  <option value="disaster-relief">Disaster Relief</option>
                  <option value="poverty-alleviation">Poverty Alleviation</option>
                </select>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newCause.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowCauseModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Save Cause
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}