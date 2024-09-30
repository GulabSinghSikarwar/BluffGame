import React, { useState, useEffect, useContext } from "react";
import './PlayerTurnDetails.css';
import { MainContext } from "../../../contexts/mainContext";
import { SocketContext } from "../../../contexts/socketContext";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../contexts/GameContext";
import toastService from "../../../services/ToastService";


const players = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Array of players
function PlayerTurnSidebar() {
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const mainCtx = useContext(MainContext)
    const gameCtx = useContext(GameContext)
    const { startGame } = useContext(SocketContext)
    // Function to go to the next player's turn

    const navigate = useNavigate()
    const nextTurn = () => {
        setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    // Get the current, previous, and next player names
    const currentTurn = players[currentTurnIndex];
    const previousTurn =
        players[(currentTurnIndex - 1 + players.length) % players.length];
    const nextTurnPlayer = players[(currentTurnIndex + 1) % players.length];



    const handleStartGame = () => {
        if (gameCtx.gameState.players.length >= 3) {
            // startGame();
            toastService.success("Started Game")
        } else {
            toastService.warning("Need atleast Three Player to start Game")
        }
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


    useEffect(() => {
        // You can implement the logic here to trigger nextTurn based on game events
    }, [currentTurnIndex]);

    return (
        <div className="sidebar h-full  w-full bg-purplePallete-700 text-white shadow-lg p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4  w-full text-center">Player Turns</h2>
                {mainCtx.name && mainCtx.room &&
                    <div className="flex justify-around">
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

            </div>

            <div className="flex flex-col items-center space-y-6">
                
                <div className="w-full p-4 bg-purplePallete-500 rounded">
                    <h3 className="text-center text-md font-semibold">Previous Turn</h3>
                    <p className="text-center">{previousTurn}</p>
                </div>

                <div className="w-full p-4 bg-purplePallete-600 rounded border-2 border-yellow-500">
                    <h3 className="text-center text-md font-semibold">Current Turn</h3>
                    <p className="text-center">{currentTurn}</p>
                </div>

                <div className="w-full p-4 bg-purplePallete-500 rounded">
                    <h3 className="text-center text-md font-semibold">Next Turn</h3>
                    <p className="text-center">{nextTurnPlayer}</p>
                </div>
            </div>

            <button
                className="bg-yellow-500 text-black p-2 rounded mt-4"
                onClick={nextTurn}
            >
                Next Turn
            </button>
        </div>
    );
};


export default PlayerTurnSidebar
