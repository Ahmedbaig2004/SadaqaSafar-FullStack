  import React from 'react';
  import { formatDistanceToNow } from 'date-fns';

  const ChatSidebar = ({ conversations, selectedConversation, onSelectConversation }) => {
    return (
      <div className="w-full border-b bg-white overflow-y-auto flex-grow">
        <div className="divide-y">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 cursor-pointer hover:bg-indigo-50 ${
                selectedConversation?._id === conversation._id ? 'bg-indigo-100' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-indigo-600">{conversation.otherParticipant.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.lastMessageDate && (
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(conversation.lastMessageDate), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ChatSidebar;