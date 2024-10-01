import A from '../assets/images/profile/A.png'
import B from '../assets/images/profile/B.png'
import C from '../assets/images/profile/C.png'
import D from '../assets/images/profile/D.png'
import E from '../assets/images/profile/E.png'
import F from '../assets/images/profile/F.png'
import G from '../assets/images/profile/G.png'

// Suits Logo
import club from '../assets/images/suits/C.png'
import heart from '../assets/images/suits/H.png'
import diamond from '../assets/images/suits/D.png'
import spade from '../assets/images/suits/S.png'


export const rooms = ['Room 1', 'Room 2', 'Room 3']
export const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4']


// Define dummy users
export const dummyPlayers = [
    { id: '1', name: 'Player 1', cards: [] },
    { id: '2', name: 'Player 2', cards: [] },
    { id: '3', name: 'Player 3', cards: [] },
    { id: '4', name: 'Player 4', cards: [] },
];

const cardImages = {
    '2C': '/assets/cards/2C.png',
    '3C': '/assets/cards/3C.png',
    '4C': '/assets/cards/4C.png',
    '5C': '/assets/cards/5C.png',
    '6C': '/assets/cards/6C.png',
    '7C': '/assets/cards/7C.png',
    '8C': '/assets/cards/8C.png',
    '9C': '/assets/cards/9C.png',
    '10C': '/assets/cards/10C.png',
    'JC': '/assets/cards/JC.png',
    'QC': '/assets/cards/QC.png',
    'KC': '/assets/cards/KC.png',
    'AC': '/assets/cards/AC.png',

    '2D': '/assets/cards/2D.png',
    '3D': '/assets/cards/3D.png',
    '4D': '/assets/cards/4D.png',
    '5D': '/assets/cards/5D.png',
    '6D': '/assets/cards/6D.png',
    '7D': '/assets/cards/7D.png',
    '8D': '/assets/cards/8D.png',
    '9D': '/assets/cards/9D.png',
    '10D': '/assets/cards/10D.png',
    'JD': '/assets/cards/JD.png',
    'QD': '/assets/cards/QD.png',
    'KD': '/assets/cards/KD.png',
    'AD': '/assets/cards/AD.png',

    '2H': '/assets/cards/2H.png',
    '3H': '/assets/cards/3H.png',
    '4H': '/assets/cards/4H.png',
    '5H': '/assets/cards/5H.png',
    '6H': '/assets/cards/6H.png',
    '7H': '/assets/cards/7H.png',
    '8H': '/assets/cards/8H.png',
    '9H': '/assets/cards/9H.png',
    '10H': '/assets/cards/10H.png',
    'JH': '/assets/cards/JH.png',
    'QH': '/assets/cards/QH.png',
    'KH': '/assets/cards/KH.png',
    'AH': '/assets/cards/AH.png',

    '2S': '/assets/cards/2S.png',
    '3S': '/assets/cards/3S.png',
    '4S': '/assets/cards/4S.png',
    '5S': '/assets/cards/5S.png',
    '6S': '/assets/cards/6S.png',
    '7S': '/assets/cards/7S.png',
    '8S': '/assets/cards/8S.png',
    '9S': '/assets/cards/9S.png',
    '10S': '/assets/cards/10S.png',
    'JS': '/assets/cards/JS.png',
    'QS': '/assets/cards/QS.png',
    'KS': '/assets/cards/KS.png',
    'AS': '/assets/cards/AS.png',

    'Joker': '/assets/cards/Joker.png',
};

export const suits = {
    'S': spade,
    'C': club,
    'H': heart,
    'D': diamond
}

export const playerHands_bg = [A, B, C, D, E, F, G]
// export const playerHands_bg = [A, B, C, D, E]
export const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * playerHands_bg.length);
    return playerHands_bg[randomIndex];
}
export const SocketEventsEnum = Object.freeze({
    // Room Management Events
    JOIN_ROOM: 'JOIN_ROOM',
    JOINED_ROOM: 'JOINED_ROOM',
    NEW_PLAYER_JOINED: 'NEW_PLAYER_JOINED',
    LEAVE_ROOM: 'LEAVE_ROOM',
  
    // Player Actions Events
    CHANGE_TURN: 'CHANGE_TURN',
    DISTRIBUTE_CARDS: 'DISTRIBUTE_CARDS',
    CHECK_WINNER: 'CHECK_WINNER',
    ROTATE_TURN: 'ROTATE_TURN',
    NOTIFY_TURN: 'NOTIFY_TURN',
    THROW_CARDS: 'THROW_CARDS',
    CHECK_PREVIOUS_PLAYER: 'CHECK_PREVIOUS_PLAYER',
    NOTIFY_RESULT: 'NOTIFY_RESULT',
    SKIP_ACTION: 'SKIP_ACTION',
    CAUGHT_BLUFF: 'CAUGHT_BLUFF',
    PLAYER_LEFT:'PLAYER_LEFT',
    PLAYER_CARD_UPDATE: 'PLAYER_CARD_UPDATE',
    CARD_COUNT_UPDATE: 'CARD_COUNT_UPDATE',
  
    // Game State Events
    START_GAME: 'START_GAME',
    RESTART_GAME: 'RESTART_GAME',
    END_GAME: 'END_GAME',
    ROUND_RESULTS: 'ROUND_RESULTS',
  
    PLAYER_JOINED: 'PLAYER_JOINED',
    START_GAME_FAILED: 'start_game_failed',
    GET_ROOM_DETAILS: 'GET_ROOM_DETAILS',
    ROOM_DETAILS: 'ROOM_DETAILS',
  
    // Communication Events
    SEND_MESSAGE: 'SEND_MESSAGE',
    ERROR: 'ERROR',
    CONNECTION_ERROR: 'CONNECTION_ERROR',
    PLAYER_STATUS: 'PLAYER_STATUS',
    UPDATE_SCORE: 'UPDATE_SCORE',
  
    // Error
    ERROR: 'ERROR',
  });
;