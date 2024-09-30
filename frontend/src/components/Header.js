import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socketContext'; // Adjust the path as necessary 
import { MainContext } from '../contexts/mainContext';
const Header = () => {
  const navigate = useNavigate();
  const socket = useContext(SocketContext); // Access the socket instance

  const { startGame } = useContext(SocketContext);
  const mainCtx = useContext(MainContext)
  // const gameCtx


  const handleStartGame = () => {
    startGame();
  };


  const leaveRoom = () => {
    // Confirm with the user before leaving the room
    const confirmLeave = window.confirm("Are you sure you want to leave the room?");
    if (confirmLeave) {
      // Emit the LEAVE_ROOM event
      // socket.emit('LEAVE_ROOM'); // Ensure your server listens for this event

      // Navigate back to the main page
      navigate('/');
    }
  };

  return (
    <header className="mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Bluff Card Game X</h1>


      {mainCtx.name && mainCtx.room &&
        <div>
          <button
            onClick={leaveRoom}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          >
            Leave Room
          </button>

          <button


            onClick={handleStartGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#28a745', // Green background color
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')} // Darker on hover
            onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}  // Back to normal
          >
            Start Game
          </button>
        </div>
      }
    </header>


  );
};

export default Header;
