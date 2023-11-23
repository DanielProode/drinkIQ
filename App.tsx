import { AuthProvider } from './context/authContext';
import { DeckProvider } from './context/deckContext';
import Router from './routes/Router';

export default function App() {
  return (
    <AuthProvider>
      <DeckProvider>
        <Router />
      </DeckProvider>
    </AuthProvider>
  );
};
