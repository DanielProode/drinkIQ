import { ReactNode, createContext, useContext } from "react";
import { ImageSourcePropType } from "react-native";

import useUserStore from "../store/userStore";

interface DeckProviderProps {
  children?: ReactNode;
};

interface DeckContextType {
  getDecks: () => {
    id: string;
    name: string;
    image: ImageSourcePropType;
    previewImage: ImageSourcePropType;
    text: string;
    owned: boolean;
  }[];
}

const DeckContext = createContext<DeckContextType | null>(null);

const cardDecks = [{
  id: 'estonia',
  name: 'Estonia card pack',
  image: require('../assets/images/estonia_deck.png'),
  previewImage: require('../assets/images/estonia_deck_preview.png'),
  text: "Information about the Estonia card pack.",
  owned: false,
}, {
  id: 'football',
  name: 'Football card pack',
  image: require('../assets/images/football_deck.png'),
  previewImage: require('../assets/images/football_deck_preview.png'),
  text: "Information about the Football card pack.",
  owned: false,
}, {
  id: 'birds',
  name: 'Birds card pack',
  image: require('../assets/images/bird_deck.png'),
  previewImage: require('../assets/images/birds_deck_preview.png'),
  text: "Information about the Birds card pack.",
  owned: false,
}];


const DeckProvider = ({ children }: DeckProviderProps) => {
  const { packs_owned } = useUserStore();
  const getDecks = () => {
    cardDecks.map((item) => {
      if (packs_owned && packs_owned.includes(item.id)) item.owned = true;
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




