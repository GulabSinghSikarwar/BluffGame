import { createContext, React } from "react";
import { useState } from 'react'
import io from 'socket.io-client'
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'http://localhost:5000/';
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })
    console.log("socket : ",socket);
    

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider
