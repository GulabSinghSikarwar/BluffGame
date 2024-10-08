import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Outlet, RouterProvider } from 'react-router-dom';
import router from './utils/app.routes';
import MainProvider from './contexts/mainContext';
import { SocketProvider } from './contexts/socketContext';
import { UsersProvider } from './contexts/usersContext';
import { GameProvider } from './contexts/GameContext';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { ModalProvider } from './contexts/ModalContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <MainProvider>
      <ModalProvider>

        <GameProvider>
          <SocketProvider>
            <UsersProvider>
              <RouterProvider router={router} >
                {/* <Header />
              <Outlet /> */}
              </RouterProvider>

            </UsersProvider>
          </SocketProvider>
        </GameProvider>
      </ModalProvider>

    </MainProvider>
  </div>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
