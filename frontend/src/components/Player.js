import React from 'react';

const Player = ({ name }) => {
    return (
        <div className="border p-2 m-2 rounded">
            <h2 className="font-bold">{name}</h2>
        </div>
    );
};

export default Player;
