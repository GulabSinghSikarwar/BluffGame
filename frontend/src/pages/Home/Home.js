import React from 'react';
import CreateRoom from '../../components/lobby/CreateGame/CreateRoom';
import JoinRoom from '../../components/lobby/JoinGame/JoinRoom';
import Header from '../../components/Header';
import './Home.css'
const Home = () => {
  return (
    <div className=" lobby-container  flex flex-col items-center
     justify-center min-h-screen sm:px-6 md:px-8">
      {/* <Header /> */}
      {/* <h1 className="text-3xl mb-5">Bluff Card Game</h1> */}
      <div className='w-screen'>
        <CreateRoom />
        <JoinRoom />
      </div>
    </div>
  );
};

export default Home;
