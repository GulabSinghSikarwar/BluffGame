import React, { useState, createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { GameContext } from './GameContext';
import { SocketEventsEnum } from '../utils/constants';
import toastService from '../services/ToastService';

// Create the SocketContext
const SocketContext = createContext();

// Initialize Socket.IO connection
const socket = io('http://localhost:5000'); // Change the URL to your server address

const SocketProvider = ({ children }) => {
    const { joinGame, distributeCards, changeTurn, joinedNewPlayer, playerLeft } = useContext(GameContext); // Using GameContext to update the game state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        // Listen for socket events
        socket.on(SocketEventsEnum.JOINED_ROOM, (data) => {
            console.log('Joined room:', data);
            joinGame(data.gameDetails)
            // players.forEach((player) => joinGame(player)); // Call joinGame for each player

        });

        socket.on(SocketEventsEnum.DISTRIBUTE_CARDS, (playerId, cards) => {
            console.log(`Distributing cards to player: ${playerId}`, cards);
            distributeCards(playerId, cards); // Distribute cards to player
        });

        socket.on(SocketEventsEnum.CHANGE_TURN, (newTurn) => {
            console.log(`Turn changed: ${newTurn}`);
            changeTurn(newTurn); // Update the game turn
        });

        socket.on(SocketEventsEnum.NEW_PLAYER_JOINED, (data) => {
            console.log('New player joined');
            toastService.info("New User Have Joined")
            joinedNewPlayer(data.player)
        });
        socket.on(SocketEventsEnum.PLAYER_LEFT, (data) => {
            toastService.info(data.message)
            playerLeft(data)
        })

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        // Clean up socket listeners when the component unmounts
        return () => {
            socket.off(SocketEventsEnum.JOINED_ROOM);
            socket.off(SocketEventsEnum.DISTRIBUTE_CARDS);
            socket.off(SocketEventsEnum.CHANGE_TURN);
            socket.off(SocketEventsEnum.NEW_PLAYER_JOINED);
        };
    }, [joinGame, distributeCards, changeTurn]);

    // Emit events from the frontend
    const startGame = () => {
        socket.emit(SocketEventsEnum.START_GAME);
        console.log('Game started');
    };

    const joinGameRoom = (playerName) => {
        socket.emit(SocketEventsEnum.JOIN_ROOM, playerName);
        console.log(`Joining room as: ${playerName}`);
    };

    const leaveGame = () => {
        console.log(" here : About to leave ", );
        
        socket.emit(SocketEventsEnum.LEAVE_ROOM, {
            room: room,
        })
    }

    const throwCard = (card) => {
        socket.emit(SocketEventsEnum.THROW_CARDS, { card });
        console.log(`Card thrown: ${card}`);
    };

    const skipTurn = () => {
        socket.emit(SocketEventsEnum.SKIP_ACTION);
        console.log('Turn skipped');
    };

    const value = {
        socket, // Expose socket instance for direct access if needed
        startGame,
        joinGameRoom,
        throwCard,
        skipTurn,
        leaveGame,
        name: { name, setName }, // Expose name state and setter
        room: { room, setRoom }  // Expose room state and setter
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

// Custom hook for using the SocketContext
export const useSocket = () => useContext(SocketContext);

export { SocketContext, SocketProvider };
