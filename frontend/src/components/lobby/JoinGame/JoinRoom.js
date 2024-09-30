import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../../contexts/socketContext';
import { SocketEventsEnum } from '../../../utils/constants';
import { MainContext } from '../../../contexts/mainContext';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);

  const mainCtx = useContext(MainContext)
  const { room } = useContext(SocketContext)
  const joinRoom = () => {
    console.log("hello");
    console.log("socket: ", socket);

    if (roomId && username) { // Check if both roomId and username are provided
      mainCtx.setRoom(roomId)
      mainCtx.setName(username)
      room.setRoom(roomId)
      socket.emit(SocketEventsEnum.JOIN_ROOM, { room: roomId, name: username });
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter both Room ID and Username.'); // Alert if inputs are missing
    }
  };



  return (


    <div className="flex flex-col items-center bg-purplePallete-700 p-6 rounded-lg shadow-md w-full
     max-w-md mx-auto mt-10 " >


      {/* Input for Username */}
      <input
        type="text"
        placeholder="Enter Username"
        className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Input for Room ID */}
      <input
        type="text"
        placeholder="Enter Room ID"
        className="border border-gray-300 p-2 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      {/* Join Room Button */}
      <button
        onClick={joinRoom}
        className="bg-purplePallete-400 text-white p-2 rounded w-full hover:bg-green-600 transition duration-200"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
