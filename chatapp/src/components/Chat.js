import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'; // Import custom styles

const socket = io.connect('https://chat-application-api-murex.vercel.app/');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(''); // Track current user's username

  useEffect(() => {
    // Fetch initial messages from the server
    const fetchMessages = async () => {
      const res = await axios.get('https://chat-application-api-murex.vercel.app/api/messages');
      setMessages(res.data.reverse());
    };
    fetchMessages();

    // Listen for new messages from the server
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  return (
    <div className="container chat-container">
      <h1 className="text-center my-4">Chat Room</h1>
      <ul className="list-group">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={`list-group-item d-flex ${
              msg.username === username ? 'justify-content-end' : 'justify-content-start'
            }`}
          >
            <div
              className={`message-bubble ${
                msg.username === username ? 'sent-message' : 'received-message'
              }`}
            >
              <strong>{msg.username}: </strong>
              {msg.message}
              <span className="text-muted small float-right ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
