import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io("http://localhost:3000"); // Replace with your server address

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    if (roomName && userName && roomId) {
      //   socket.emit('createRoom', { roomName, userName, roomId });
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create a Room</h2>
       
      <input
        type="text"
        placeholder="User Name"
        className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID"
        className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={createRoom}
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
