import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createDeck } from '../utils/cardDeck';
import PlayerHand from '../components/PlayerHand/PlayerHand'; // Import the PlayerHand component
import Card from '../components/Card';
import './GameRoom.css'
import PlayerList from '../components/Players/PlayerList/PlayerList';
import PlayerStats from '../components/Players/PlayerStats/PlayerStats';
import PlayerTurnSidebar from '../components/Players/PlayerStats/PlayerTurnDetails';
import CardThrow from '../components/GamePlay/ThrowCard/ThrowCard';
import { MainContext } from '../contexts/mainContext';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/socketContext';
import { SocketEventsEnum } from '../utils/constants';

const demoPlayers = [
    { id: '1', name: 'Alice', cards: [] },
    { id: '2', name: 'Bob', cards: [] },
    { id: '3', name: 'Charlie', cards: [] },
    { id: '4', name: 'Diana', cards: [] },
];

const GameRoom = () => {
    const { roomId } = useParams();
    const [players, setPlayers] = useState(demoPlayers);
    const [selectedPlayerId, setSelectedPlayerId] = useState('1');
    const [deck, setDeck] = useState([]);
    const [turn, setTurn] = useState(0);
    const [pile, setPile] = useState([]);
    const [claimedCard, setClaimedCard] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const mainCtx = useContext(MainContext)
    const socket = useContext(SocketContext)

 
    useEffect(() => {
        // Check if the room ID is present in localStorage
        console.log("Main : ", mainCtx);
        const username = mainCtx.name;
        const roomId = mainCtx.room;
        if (!username || !roomId) {
            navigate('/')
        } else {
            socket.emit(SocketEventsEnum.JOIN_ROOM, { room: roomId, name: username });
        }

    }, [navigate, socket]);

    useEffect(() => {
        // Initial setup - Create and shuffle the deck
        const newDeck = createDeck();
        setDeck(newDeck);

        // Distribute cards among players
        const initialCards = Math.floor(newDeck.length / players.length);
        const updatedPlayers = players.map((player, index) => ({
            ...player,
            cards: newDeck.slice(index * initialCards, (index + 1) * initialCards),
        }));
        setPlayers(updatedPlayers);
    }, []);

    const playTurn = (cardsToPlay, claimedRank) => {
        if (!claimedRank) {
            setMessage('Claimed rank is required.');
            return;
        }

        setClaimedCard(claimedRank);
        setPile([...pile, ...cardsToPlay]);

        // Simulate turn transition
        setTurn((prevTurn) => (prevTurn + 1) % players.length);
    };

    const callBluff = () => {
        const isBluff = !pile.every((card) => card.includes(claimedCard));
        const currentPlayer = players[turn];
        const challenger = players[(turn - 1 + players.length) % players.length];

        if (isBluff) {
            currentPlayer.cards.push(...pile);
            setMessage(`${currentPlayer.name} was bluffing! They take the pile.`);
        } else {
            challenger.cards.push(...pile);
            setMessage(`${challenger.name} called a bluff!`);
        }

        setPile([]);
        setTurn((prevTurn) => (prevTurn + 1) % players.length);
    };

    const selectedPlayer = players.find((player) => player.id === selectedPlayerId);

    return (
        <div className="h-screen flex w-screen ">
            <div className='flex flex-col  lg:w-[80%] md:w-full'>{/* First div taking 75% height */}
                <div className="h-[75%] bg-white-500  game-room-container">
                    <PlayerHand selectedPlayer={selectedPlayer} />

                </div>
                {/* Second div taking 25% height */}
                <div className="h-[25%] bg-green-500 flex items-center justify-center">
                    <PlayerStats selectedPlayer={selectedPlayer} />
                </div>
            </div>
            <div className='h-full w-[20%] bg-slate-600'>
                <PlayerTurnSidebar />

            </div>
        </div>
    );
};

export default GameRoom;
