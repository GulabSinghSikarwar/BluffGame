import React, { useState, createContext } from 'react'

const UsersContext = createContext()

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [players, setPlayers] = useState([])
    const [turns, setTurns] = useState([])
    const [cardsDetail, setCardDetails] = useState([])


    return (
        <UsersContext.Provider value={{
            users, setUsers,
            players: { players, setPlayers },
            cardsDetail: { cardsDetail, setCardDetails },
            turnDetails: { turns, setTurns }
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider } 