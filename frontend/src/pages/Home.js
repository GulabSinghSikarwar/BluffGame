import React from 'react';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <h1 className="text-3xl mb-5">Bluff Card Game</h1>
      <CreateRoom />
      <JoinRoom />
    </div>
  );
};

export default Home;
