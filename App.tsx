import { AuthProvider } from './context/authContext';
import { DeckProvider } from './context/deckContext';
import { GameProvider } from './context/gameContext';
import Router from './routes/Router';

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <DeckProvider>
        <Router />
        </DeckProvider>
      </GameProvider>
    </AuthProvider>
  );
};
