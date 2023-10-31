import { AuthProvider } from './context/authContext';
import { GameProvider } from './context/gameContext';
import Router from './routes/Router';

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router />
      </GameProvider>
    </AuthProvider>
  );
};
