import { ReactNode, createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface GameProviderProps {
  children?: ReactNode;
};

interface GameContextType {
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
  playableDeckImage: ImageSourcePropType;
  playableDeck: string;
  playableCardBackground: ImageSourcePropType;
  updateAvatar: (newAvatar: ImageSourcePropType) => void;
  updateDrink: (newDrink: ImageSourcePropType) => void;
  updatePlayableDeckImage: (newPlayableDeckImage: ImageSourcePropType) => void;
  updatePlayableDeck: (newPlayableDeck: string) => void;
  updatePlayableCardBackground: (newPlayableCardBackground: ImageSourcePropType) => void;
}

const defaultAvatar = require('../assets/images/avatar_1.png');
const defaultDrink = require('../assets/images/drink_1.png');
const defaultCardDeckImage = require('../assets/images/estonia_deck.png');
const defaultCardDeck = "estonia";
const defaultPlayableCardBackground = require('../assets/images/estonia_deck.png');

const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: GameProviderProps) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [drink, setDrink] = useState(defaultDrink);
  const [playableDeckImage, setPlayableDeckImage] = useState(defaultCardDeckImage);
  const [playableDeck, setPlayableDeck] = useState(defaultCardDeck);
  const [playableCardBackground, setPlayableCardBackground] = useState(defaultPlayableCardBackground);

  const updateAvatar = (newAvatar: ImageSourcePropType) => {
    setAvatar(newAvatar);
  }

  const updateDrink = (newDrink: ImageSourcePropType) => {
    setDrink(newDrink);
  }

  const updatePlayableDeckImage = (newPlayableDeck: ImageSourcePropType) => {
    setPlayableDeckImage(newPlayableDeck);
  }

  const updatePlayableDeck = (newPlayableDeck: string) => {
    setPlayableDeck(newPlayableDeck);
  }

  const updatePlayableCardBackground = (newPlayableCardBackground: ImageSourcePropType) => {
    setPlayableCardBackground(newPlayableCardBackground);
  }

  return (
    <GameContext.Provider value={{ avatar, drink, playableDeckImage, playableDeck, playableCardBackground, updateAvatar, updateDrink, updatePlayableDeckImage, updatePlayableDeck, updatePlayableCardBackground }}>
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