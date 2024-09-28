const SocketEventsEnum =require('../../utils/app.enums').SocketEventsEnum
/**
 * Sets up room-related socket event listeners.
 * @param {Socket} socket - The socket instance for the connection.
 */
const handleRoomEvents = (socket) => {
    socket.on(SocketEventsEnum.JOIN_ROOM, (data) => {
        // console.log(`Player joined room: ${data.room}`);
        const room = data.room;
        // Handle join room logic
        joinRoom(socket, room);
    });

    socket.on(SocketEventsEnum.LEAVE_ROOM, (data) => {
        console.log(`Player left room: ${data.room}`);
        // Handle leave room logic
        const room = data.room;
        // Handle join room logic
        leaveRoom(socket, room)
    });
};

const rooms = {};
/**
 * 
 * @param {Socket} socket 
 * @param {string } room 
 */
function joinRoom(socket, room) {
    if (!rooms[room]) {
        rooms[room] = { users: [] };
    }

    if (!rooms[room].users.includes(socket.id)) {
        rooms[room].users.push(socket.id);
        socket.join(room);
        console.log(`Player joined room: ${room}`);

        // Notify others in the room
        socket.to(room).emit('message', `A new user has joined room: ${room}`);
    } else {
        socket.emit('message', `You are already in room: ${room}`);
    }
}
/**
 * 
 * @param {Socket} socket 
 * @param {string } room 
 */
function leaveRoom(socket, room) {
    if (rooms[room]) {
        const userIndex = rooms[room].users.indexOf(socket.id);
        if (userIndex !== -1) {
            rooms[room].users.splice(userIndex, 1);
            socket.leave(room);
            console.log(`Client left room: ${room}`);

            // Notify others in the room
            socket.to(room).emit('message', `A user has left the room: ${room}`);
        } else {
            socket.emit('message', `You are not in room: ${room}`);
        }
    } else {
        socket.emit('message', `Room ${room} does not exist.`);
    }
}


module.exports={handleRoomEvents}