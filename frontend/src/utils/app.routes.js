import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import GameRoom from '../pages/GameRoom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />, // Render Home component on the root path
    },
    {
        path: '/room/:roomName',
        element: <GameRoom />, // Handle GameRoom route
    },
]);

export default router;
