import React, { useEffect, useState } from 'react';
// import socket from './utils/socket';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import MainProvider from './contexts/mainContext';
import SocketProvider from './contexts/socketContext';
import { UsersProvider } from './contexts/usersContext';
const App = () => {
    const [rooms, setRooms] = useState([]);
    const [dummyPlayers] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
    const [dummyRooms] = useState(['Room 1', 'Room 2', 'Room 3']);

    useEffect(() => {
        const initializedRooms = dummyRooms.map(room => ({
            name: room,
            players: dummyPlayers.map((player, index) => `Player ${index + 1}`),
        }));
        setRooms(initializedRooms);
    }, [dummyRooms, dummyPlayers]);

    const createRoom = (roomName) => {
        const newRoom = { name: roomName, players: [] };
        setRooms((prevRooms) => [...prevRooms, newRoom]);
        // socket.emit('createRoom', roomName);
    };

    return (

        <div className="container mx-auto p-4">
            <MainProvider>
                <SocketProvider>
                    <UsersProvider>
                        <Header />
                        <Outlet />
                    </UsersProvider>
                </SocketProvider>
            </MainProvider>

        </div>

    );
};

export default App;
