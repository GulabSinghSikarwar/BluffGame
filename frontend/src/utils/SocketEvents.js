const { Socket } = require("socket.io-client");

/**
 *@class SocketEvents
 @description Class For Emittig Socket Events  
 */
export default class SocketEvents {

    /**
   * @static
   * @private
   * @type {SocketEvents}
   * @description Holds the single instance of the SocketEvents class.
   */
    static instance = null;
    /**
     * @param {Socket} socket 
     */
    constructor(socket) {
        if (SocketEvents.instance) {
            throw new Error("Cannot create multiple instances of SocketEvents. Use SocketEvents.getInstance()");
        }

        /**
         * @type {Socket} socket
         */
        this.socket = socket

        SocketEvents.instance = this;
    }

    /**
     * 
     * @param {string} eventName - The name of the event  
     * @param {Object} payload  [payload ={ }] -Optional Payload Need to send along with event
     * @example  socketEvents.emitEvent('message', { userId: 1, text: 'Hello' });
     */
    emitEvent(eventName, payload = {}) {
        if (!this.socket) {
            throw new Error('Socket instance is not provided.');
          }
        this.socket.emit(eventName, payload);
    }

    /**
 * Returns the singleton instance of SocketEvents.
 * @param {Object} socket - The socket instance to be used for emitting events if no instance exists.
 * @returns {SocketEvents} The single instance of SocketEvents.
 */
    static getInstance(socket) {
        if (!SocketEvents.instance) {
            SocketEvents.instance = new SocketEvents(socket);
        }
        return SocketEvents.instance;
    }
}
