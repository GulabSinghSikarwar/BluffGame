// src/enums/socketEventsEnum.js
const SocketEventsEnum = Object.freeze({
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
  PLAYER_LEFT: 'PLAYER_LEFT',
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

const eventTypes = {
  GAME_EVENTS: 'GAME_EVENTS'
}
const test = {}

module.exports = { SocketEventsEnum, test, eventTypes }