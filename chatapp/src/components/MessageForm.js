import React, { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io.connect('https://chat-application-api-murex.vercel.app/');

const MessageForm = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const newMessage = { username, message };

    // Send message to the server
    await axios.post('https://chat-application-api-murex.vercel.app/api/messages', newMessage);

    // Emit message via Socket.IO
    socket.emit('chatMessage', newMessage);

    setMessage('');  // Clear message input
  };

  return (
    <form onSubmit={sendMessage} className="mt-3">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
};

export default MessageForm;
