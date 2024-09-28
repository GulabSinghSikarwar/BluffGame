const SocketEventsEnum =require('../../utils/app.enums').SocketEventsEnum

/**
 * Sets up communication-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleCommunicationEvents = (socket) => {
    socket.on(SocketEventsEnum.SEND_MESSAGE, (message) => {
        try {
            console.log(`Message sent: ${message}`);
            // Handle send message logic
        } catch (error) {
            console.error(`Error in SEND_MESSAGE event: ${error.message}`);
            socket.emit('error', 'Error sending message');
        }
    });

    socket.on(SocketEventsEnum.ERROR, (error) => {
        try {
            console.error('Error:', error);
            // Handle error logic
        } catch (err) {
            console.error(`Error handling ERROR event: ${err.message}`);
            socket.emit('error', 'Error processing error event');
        }
    });

    socket.on(SocketEventsEnum.CONNECTION_ERROR, (error) => {
        try {
            console.error('Connection error:', error);
            // Handle connection error logic
        } catch (err) {
            console.error(`Error handling CONNECTION_ERROR event: ${err.message}`);
            socket.emit('error', 'Error processing connection error');
        }
    });

    socket.on(SocketEventsEnum.PLAYER_STATUS, (status) => {
        try {
            console.log('Player status updated:', status);
            // Handle player status logic
        } catch (error) {
            console.error(`Error in PLAYER_STATUS event: ${error.message}`);
            socket.emit('error', 'Error updating player status');
        }
    });

    socket.on(SocketEventsEnum.UPDATE_SCORE, (scoreData) => {
        try {
            console.log('Score updated:', scoreData);
            // Handle score update logic
        } catch (error) {
            console.error(`Error in UPDATE_SCORE event: ${error.message}`);
            socket.emit('error', 'Error updating score');
        }
    });
};

module.exports = { handleCommunicationEvents };
