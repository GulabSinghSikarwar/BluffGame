import React, { useState, useEffect } from "react";
import './PlayerTurnDetails.css';


const players = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Array of players
function PlayerTurnSidebar() {
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

    // Function to go to the next player's turn
    const nextTurn = () => {
        setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    // Get the current, previous, and next player names
    const currentTurn = players[currentTurnIndex];
    const previousTurn =
        players[(currentTurnIndex - 1 + players.length) % players.length];
    const nextTurnPlayer = players[(currentTurnIndex + 1) % players.length];

    useEffect(() => {
        // You can implement the logic here to trigger nextTurn based on game events
    }, [currentTurnIndex]);

    return (
        <div className="sidebar h-full  w-full bg-purplePallete-700 text-white shadow-lg p-4 flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-4">Player Turns</h2>

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
