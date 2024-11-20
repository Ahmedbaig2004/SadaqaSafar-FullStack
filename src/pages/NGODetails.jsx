import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, DollarSign, MessageCircle, Send, X } from 'lucide-react';
import { getNGOById } from '../api/ngo';
import { getNGOCauses } from '../api/causes';
import { sendMessage, createConversation, getMessages } from '../api/messages';
import useAuthStore from '../store/authStore';
import DonateModal from '../components/DonateModal';

const NGODetails = () => {
  const { id } = useParams();
  const [ngo, setNGO] = useState(null);
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const { user, token } = useAuthStore();
  const messagesEndRef = useRef(null);
  const messagePollingInterval = useRef(null);

  const [showModal, setShowModal] = useState(false); 
  const [selectedCause, setSelectedCause] = useState(null); 

  useEffect(() => {
    fetchNGOAndCauses();
    return () => {
      if (messagePollingInterval.current) {
        clearInterval(messagePollingInterval.current);
      }
    };
  }, [id]);

  useEffect(() => {
    if (showChat) {
      initializeChat();
    } else {
      if (messagePollingInterval.current) {
        clearInterval(messagePollingInterval.current);
      }
    }
  }, [showChat]);

  const initializeChat = async () => {
    try {
      // Create or get existing conversation
      const conversationResponse = await createConversation(id, 'NGO', token);
      setCurrentConversation(conversationResponse);

      // Fetch initial messages
      const messagesResponse = await getMessages(conversationResponse._id, token);
      setMessages(messagesResponse.messages || []);

      // Set up polling for new messages
      messagePollingInterval.current = setInterval(async () => {
        const updatedMessages = await getMessages(conversationResponse._id, token);
        setMessages(updatedMessages.messages || []);
      }, 3000); // Poll every 3 seconds
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const fetchNGOAndCauses = async () => {
    try {
      if (!id) {
        throw new Error('NGO ID is required');
      }

      const ngoData = await getNGOById(id);
      setNGO(ngoData);

      const causesData = await getNGOCauses(id);
      setCauses(Array.isArray(causesData) ? causesData : []);
    } catch (error) {
      console.error('Error fetching NGO details:', error);
      setError(error.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !token || !currentConversation) return;

    try {
      const messageResponse = await sendMessage(
        currentConversation._id,
        newMessage,
        token
      );

      setMessages(prev => [...prev, messageResponse.message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDonateClick = (cause) => { //a
    setSelectedCause(cause);
    setShowModal(true);
  };

  const handleCloseModal = () => { //a
    setShowModal(false);
    setSelectedCause(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-2xl mt-8 text-red-600">{error}</div>;
  }

  if (!ngo) {
    return <div className="text-center text-2xl mt-8">NGO not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      {/* NGO Details Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <img
          src={ngo.logo || 'https://via.placeholder.com/800x300'}
          alt={ngo.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{ngo.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <Building2 className="w-5 h-5 mr-2" />
            <span>{ngo.domain}</span>
            <MapPin className="w-5 h-5 ml-4 mr-2" />
            <span>{ngo.location}</span>
          </div>
          <p className="text-gray-700 mb-4">{ngo.description}</p>
          {ngo.verified && (
            <span className="bg-emerald-100 text-emerald-600 text-sm px-3 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>

      {!user && <div className="text-center text-2xl font-bold text-gray-900">LOGIN AS USER TO DONATE</div>}

      {/* Causes Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Causes</h2>
      {causes.length === 0 ? (
        <p className="text-center text-gray-600">No active causes at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {causes.map((cause) => (
            <div key={cause._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={cause.images?.[0] || 'https://via.placeholder.com/800x300'}
                alt={cause.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cause.title}</h3>
                <p className="text-gray-600 mb-4">{cause.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(cause.endDate).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-600 text-sm px-2 py-1 rounded-full">
                    {cause.category}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round((cause.raisedAmount / cause.goalAmount) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-emerald-600 h-2.5 rounded-full"
                      style={{ width: `${(cause.raisedAmount / cause.goalAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    <span>{cause.raisedAmount || 0}</span> / <span>{cause.goalAmount}</span>
                  </div>

                  {user && <button onClick={() => handleDonateClick(cause)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Donate Now
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Button & Window */}
      {user && user.role === 'user' && (
        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-4 right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {showChat && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="h-full flex flex-col">
            <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with {ngo.name}</h3>
              <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender.id === user._id ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${msg.sender.id === user._id ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedCause && (
        <DonateModal cause={selectedCause} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NGODetails;


