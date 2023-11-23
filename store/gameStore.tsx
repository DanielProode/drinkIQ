import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

const defaultAvatar = require('../assets/images/avatar_1.png');
const defaultDrink = require('../assets/images/drink_1.png');
const defaultCardDeckImage = require('../assets/images/estonia_deck.png');
const defaultCardDeck = "estonia";
const defaultPlayableCardBackground = require('../assets/images/estonia_deck_preview.png');

type GameChoices = {
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
  playableDeckImage: ImageSourcePropType;
  playableDeck: string;
  playableCardBackground: ImageSourcePropType;
}

type GameChoiceActions = {
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckImage: (playableDeckImage: GameChoices['playableDeckImage']) => void;
  updatePlayableDeck: (playableDeck: GameChoices['playableDeck']) => void;
  updatePlayableCardBackground: (playableCardBackground: GameChoices['playableCardBackground']) => void;
}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  avatar: defaultAvatar,
  drink: defaultDrink,
  playableDeckImage: defaultCardDeckImage,
  playableDeck: defaultCardDeck,
  playableCardBackground: defaultPlayableCardBackground,
  updateAvatar: (avatar: ImageSourcePropType) => set(() => ({ avatar })),
  updateDrink: (drink: ImageSourcePropType) => set(() => ({ drink })),
  updatePlayableDeckImage: (playableDeckImage: ImageSourcePropType) => set(() => ({ playableDeckImage })),
  updatePlayableDeck: (playableDeck: string) => set(() => ({ playableDeck })),
  updatePlayableCardBackground: (playableCardBackground: ImageSourcePropType) => set(() => ({ playableCardBackground })),
}));

export default useGameStore;