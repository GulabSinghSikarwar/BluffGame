// src/enums/socketEventsEnum.js
 const SocketEventsEnum = Object.freeze({
      // Room Management Events
      JOIN_ROOM: 'JOIN_ROOM',
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
  
      // Game State Events
      START_GAME: 'START_GAME',
      RESTART_GAME: 'RESTART_GAME',
      END_GAME: 'END_GAME',
      ROUND_RESULTS: 'ROUND_RESULTS',
  
      // Communication Events
      SEND_MESSAGE: 'SEND_MESSAGE',
      ERROR: 'ERROR',
      CONNECTION_ERROR: 'CONNECTION_ERROR',
      PLAYER_STATUS: 'PLAYER_STATUS',
      UPDATE_SCORE: 'UPDATE_SCORE',
  });
  

module.exports = { SocketEventsEnum }