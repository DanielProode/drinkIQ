import { ReactNode, createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface GameProviderProps {
  children?: ReactNode;
};

interface GameContextType {
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
  playableDeck: ImageSourcePropType;
  updateAvatar: (newAvatar: ImageSourcePropType) => void;
  updateDrink: (newDrink: ImageSourcePropType) => void;
  updatePlayableDeck: (newPlayableDeck: ImageSourcePropType) => void;
}

const defaultAvatar = require('../assets/images/avatar_1.png');
const defaultCardDeck = require('../assets/images/card_deck1.png');
const defaultDrink = require('../assets/images/drink_1.png');

const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: GameProviderProps) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [drink, setDrink] = useState(defaultDrink);
  const [playableDeck, setPlayableDeck] = useState(defaultCardDeck);

  const updateAvatar = (newAvatar: ImageSourcePropType) => {
    setAvatar(newAvatar);
  }

  const updateDrink = (newDrink: ImageSourcePropType) => {
    setDrink(newDrink);
  }

  const updatePlayableDeck = (newPlayableDeck: ImageSourcePropType) => {
    setPlayableDeck(newPlayableDeck);
  }

  return (
    <GameContext.Provider value={{ avatar, drink, playableDeck, updateAvatar, updateDrink, updatePlayableDeck }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export { GameProvider, useGame }