import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socketContext'; // Adjust the path as necessary

const Header = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext); // Access the socket instance

  const leaveRoom = () => {
    // Confirm with the user before leaving the room
    const confirmLeave = window.confirm("Are you sure you want to leave the room?");
    if (confirmLeave) {
      // Emit the LEAVE_ROOM event
      socket.emit('LEAVE_ROOM'); // Ensure your server listens for this event

      // Navigate back to the main page
      navigate('/');
    }
  };

  return (
    <header className="mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Bluff Card Game</h1>
      <button 
        onClick={leaveRoom}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
      >
        Leave Room
      </button>
    </header>
  );
};

export default Header;
