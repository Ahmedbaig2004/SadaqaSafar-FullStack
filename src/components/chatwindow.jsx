import React, { useEffect } from 'react';
import { Send, User, Building2 } from 'lucide-react';

const ChatWindow = ({ conversation, messages, newMessage, setNewMessage, onSendMessage }) => {

  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-emerald-50 dark:bg-emerald-900">
        <h2 className="font-semibold text-emerald-600 dark:text-emerald-300">
          Chat with {conversation.otherParticipant.name}
        </h2>
      </div>
      <div id="chat-messages-container" className="flex-1 overflow-y-auto p-4 bg-white bg-emerald-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender.type === 'NGO' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[70%] ${
                msg.sender.type === 'NGO'
                  ? 'flex-row'
                  : 'flex-row-reverse space-x-reverse'
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender.type === 'NGO'
                  ? 'bg-emerald-100 dark:bg-emerald-800'
                  : 'bg-blue-100 dark:bg-blue-800'
              }`}>
                {msg.sender.type === 'NGO' ? (
                  <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
                ) : (
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                )}
              </div>
              <div
                className={`rounded-lg px-4 py-2 ${
                  msg.sender.type === 'NGO'
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-700 dark:text-emerald-100'
                    : 'bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-blue-100'
                }`}
              >
                <p className="mb-1">{msg.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
          <button
            onClick={onSendMessage}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;