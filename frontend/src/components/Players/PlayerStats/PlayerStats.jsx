import React from 'react'
import PlayerList from '../PlayerList/PlayerList'
import PlayerTurnSidebar from './PlayerTurnDetails'
import CardThrow from '../../GamePlay/ThrowCard/ThrowCard'

function PlayerStats({ selectedPlayer }) {
    return (
        <div className='w-screen flex h-full'>
            {/* First Will be Users List  */}

            <div className='w-[50%] bg-yellow-500 flex items-center justify-center'>
                <PlayerList />
            </div>
            <div className='w-[50%] bg-orange-500 flex items-center justify-center'>

                <CardThrow cardsInHand={selectedPlayer.cards} />
            </div>


        </div>
    )
}

export default PlayerStats
