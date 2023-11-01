import { ReactNode, createContext, useContext } from "react";
import { ImageSourcePropType } from "react-native";

import { useAuth } from "./authContext";

interface DeckProviderProps {
  children?: ReactNode;
};

interface DeckContextType {
  getDecks: () => { id: string; name: string; image: ImageSourcePropType; owned: boolean }[];
}

const DeckContext = createContext<DeckContextType | null>(null);

const cardDecks = [{
  id: 'estonia',
  name: 'Estonia card pack',
  image: require('../assets/images/estonia_deck.png'),
  owned: false,
}, {
  id: 'football',
  name: 'Football card pack',
  image: require('../assets/images/football_deck.png'),
  owned: false,
}, {
  id: 'birds',
  name: 'Birds card pack',
  image: require('../assets/images/bird_deck.png'),
  owned: false,
}];


const DeckProvider = ({ children }: DeckProviderProps) => {

  const { user } = useAuth();
  const ownedPacks = (user && user.packs_owned) ? user.packs_owned : null

  const getDecks = () => {
    cardDecks.map((item) => {
      if (ownedPacks && ownedPacks.includes(item.id)) item.owned = true;
      else item.owned = false;
    });

    return cardDecks;
  }

  return (
    <DeckContext.Provider value={{ getDecks }}>
      {children}
    </DeckContext.Provider>
  );
}

const useDeck = () => {
  const context = useContext(DeckContext);

  if (!context) {
    throw new Error('useDeck must be used within a GameProvider');
  }
  return context;
};

export { DeckProvider, useDeck }




