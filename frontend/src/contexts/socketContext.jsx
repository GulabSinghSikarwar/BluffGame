import React, { useState, createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { GameContext } from './GameContext';
import { SocketEventsEnum } from '../utils/constants';
import toastService from '../services/ToastService';
import SocketEvents from '../utils/SocketEvents';
import { useModal } from './ModalContext';
import { ButtonTypes } from '../utils/app.enum';
import { MainContext } from './mainContext';
// Create the SocketContext
const SocketContext = createContext();

// Initialize Socket.IO connection
const socket = io('http://localhost:5000'); // Change the URL to your server address


const SocketProvider = ({ children }) => {
    const {
        joinGame,
        distributeCards,
        changeTurn,
        joinedNewPlayer,
        playerLeft,
        updateCards,
        updateCardCount,
        updateTurns
    } = useContext(GameContext); // Using GameContext to update the game state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const { openModal } = useModal()
    const mainCtx = useContext(MainContext)

    const socketEvents = SocketEvents.getInstance(socket)
    useEffect(() => {
        // Define event handlers
        const handleJoinedRoom = (data) => {
            if (!data.joining) {
                openModal({
                    title: "Confirm Action",
                    message: data.message,
                    onConfirm: () => console.log("OK "),
                    confirmText: "Yes, proceed",
                    cancelText: "Cancel",
                    buttonType: ButtonTypes.WARNING
                })

                return
            } else {

                joinGame(data.gameDetails);
                const roomId = data.gameDetails.roomId
                setName(data.gameDetails.username)
                setRoom(data.gameDetails.roomId)

            }

        };

        const handleDistributeCards = (cardResponse) => {

            distributeCards(cardResponse);
        };

        const handleChangeTurn = (newTurn) => {

            changeTurn(newTurn);
        };

        const handleNewPlayerJoined = (data) => {

            toastService.info("New User Have Joined");
            joinedNewPlayer(data.player);
        };

        const handlePlayerLeft = (data) => {
            toastService.info(data.message);
            playerLeft(data);
        };

        const handlePlayerCardUpdate = (cardUpdate) => {
            updateCards(cardUpdate.cards);
        };

        const handleCardCountUpdate = (cardUpdate) => {

            updateCardCount(cardUpdate.player);
            updateTurns(cardUpdate.turns);
            if (cardUpdate.message) {

                toastService.info(cardUpdate.message);
            }
        };

        // Register event listeners
        socket.on(SocketEventsEnum.JOINED_ROOM, handleJoinedRoom);
        socket.on(SocketEventsEnum.DISTRIBUTE_CARDS, handleDistributeCards);
        socket.on(SocketEventsEnum.CHANGE_TURN, handleChangeTurn);
        socket.on(SocketEventsEnum.NEW_PLAYER_JOINED, handleNewPlayerJoined);
        socket.on(SocketEventsEnum.PLAYER_LEFT, handlePlayerLeft);
        socket.on(SocketEventsEnum.PLAYER_CARD_UPDATE, handlePlayerCardUpdate);
        socket.on(SocketEventsEnum.CARD_COUNT_UPDATE, handleCardCountUpdate);

        // Clean up event listeners on component unmount or re-render
        return () => {
            socket.off(SocketEventsEnum.JOINED_ROOM, handleJoinedRoom);
            socket.off(SocketEventsEnum.DISTRIBUTE_CARDS, handleDistributeCards);
            socket.off(SocketEventsEnum.CHANGE_TURN, handleChangeTurn);
            socket.off(SocketEventsEnum.NEW_PLAYER_JOINED, handleNewPlayerJoined);
            socket.off(SocketEventsEnum.PLAYER_LEFT, handlePlayerLeft);
            socket.off(SocketEventsEnum.PLAYER_CARD_UPDATE, handlePlayerCardUpdate);
            socket.off(SocketEventsEnum.CARD_COUNT_UPDATE, handleCardCountUpdate);
        };
    }, [joinGame, distributeCards, changeTurn, joinedNewPlayer, playerLeft, updateCards, updateCardCount, updateTurns]);


    // Emit events from the frontend
    const startGame = () => {
        socketEvents.emitEvent(SocketEventsEnum.START_GAME);
    };

    const joinGameRoom = (playerName) => {
        socketEvents.emitEvent(SocketEventsEnum.JOIN_ROOM, playerName);
    };

    const leaveGame = () => {

        socketEvents.emitEvent(SocketEventsEnum.LEAVE_ROOM, {
            room: room,
        })
    }

    /**
     *@param {Object} move
     *@param {string} move.rank
     *@param {Array<string>} move.cards
     */
    const throwCard = (move) => {
        socketEvents.emitEvent(SocketEventsEnum.THROW_CARDS, move);

    };

    const skipTurn = () => {
        socketEvents.emitEvent(SocketEventsEnum.SKIP_ACTION);

    };
    const checkCards = () => { socketEvents.emitEvent(SocketEventsEnum.CHECK_PREVIOUS_PLAYER, {}) }

    const value = {
        socket, // Expose socket instance for direct access if needed
        startGame,
        joinGameRoom,
        throwCard,
        skipTurn,
        leaveGame,
        name: { name, setName }, // Expose name state and setter
        room: { room, setRoom }, // Expose room state and setter ,
        checkCards,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

// Custom hook for using the SocketContext
export const useSocket = () => useContext(SocketContext);

export { SocketContext, SocketProvider };
