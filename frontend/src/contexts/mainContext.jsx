import React, { useState } from 'react'

export const MainContext = React.createContext();

const MainProvider = ({ children }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    

    return (
        <MainContext.Provider value={{ room, setRoom, name, setName }}>
            {children}
        </MainContext.Provider>
    )
}
export default MainProvider
