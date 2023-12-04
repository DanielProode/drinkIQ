import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

import { DEFAULT_AVATAR_IMAGE, DEFAULT_DECK_PREVIEW_IMAGE, DEFAULT_DRINK_IMAGE, DEFAULT_PACK } from "../constants/general";

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
  avatar: DEFAULT_AVATAR_IMAGE,
  drink: DEFAULT_DRINK_IMAGE,
  playableDeckImage: DEFAULT_DRINK_IMAGE,
  playableDeck: DEFAULT_PACK,
  playableCardBackground: DEFAULT_DECK_PREVIEW_IMAGE,
  updateAvatar: (avatar: ImageSourcePropType) => set(() => ({ avatar })),
  updateDrink: (drink: ImageSourcePropType) => set(() => ({ drink })),
  updatePlayableDeckImage: (playableDeckImage: ImageSourcePropType) => set(() => ({ playableDeckImage })),
  updatePlayableDeck: (playableDeck: string) => set(() => ({ playableDeck })),
  updatePlayableCardBackground: (playableCardBackground: ImageSourcePropType) => set(() => ({ playableCardBackground })),
}));

export default useGameStore;