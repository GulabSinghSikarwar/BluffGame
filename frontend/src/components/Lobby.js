// src/components/Lobby.js
import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';

const Lobby = ({ onJoinRoom }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.on('updateRooms', (rooms) => {
            setRooms(rooms);
        });

        return () => {
            socket.off('updateRooms');
        };
    }, []);

    const joinRoom = (room) => {
        socket.emit('joinRoom', room);
        onJoinRoom(room);
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Available Rooms</h2>
            <ul className="list-disc">
                {rooms.map((room, index) => (
                    <li key={index} className="mb-2">
                        <button
                            onClick={() => joinRoom(room)}
                            className="bg-green-500 text-white p-2 rounded">
                            {room}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Lobby;
