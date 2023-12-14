import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

import { DEFAULT_AVATAR_IMAGE, DEFAULT_DECK_IMAGE, DEFAULT_DECK_PREVIEW_IMAGE, DEFAULT_DRINK_IMAGE, DEFAULT_PACK, DEFAULT_PACK_NAME, DEFAULT_DECK_TEXT } from "../constants/general";

type GameChoices = {
  avatar: ImageSourcePropType;
  drink: ImageSourcePropType;
  playableDeckImage: ImageSourcePropType;
  playableDeck: string;
  playableDeckName: string;
  playableCardBackground: ImageSourcePropType;
  playableDeckText: string;
}

type GameChoiceActions = {
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckImage: (playableDeckImage: GameChoices['playableDeckImage']) => void;
  updatePlayableDeck: (playableDeck: GameChoices['playableDeck']) => void;
  updatePlayableDeckName: (playableDeck: GameChoices['playableDeckName']) => void;
  updatePlayableCardBackground: (playableCardBackground: GameChoices['playableCardBackground']) => void;
  updatePlayableDeckText: (playableCardText: GameChoices['playableDeckText']) => void;
}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  avatar: DEFAULT_AVATAR_IMAGE,
  drink: DEFAULT_DRINK_IMAGE,
  playableDeckImage: DEFAULT_DECK_PREVIEW_IMAGE,
  playableDeck: DEFAULT_PACK,
  playableDeckName: DEFAULT_PACK_NAME,
  playableCardBackground: DEFAULT_DECK_IMAGE,
  playableDeckText: DEFAULT_DECK_TEXT,
  updateAvatar: (avatar: ImageSourcePropType) => set(() => ({ avatar })),
  updateDrink: (drink: ImageSourcePropType) => set(() => ({ drink })),
  updatePlayableDeckImage: (playableDeckImage: ImageSourcePropType) => set(() => ({ playableDeckImage })),
  updatePlayableDeck: (playableDeck: string) => set(() => ({ playableDeck })),
  updatePlayableDeckName: (playableDeckName: string) => set(() => ({ playableDeckName })),
  updatePlayableCardBackground: (playableCardBackground: ImageSourcePropType) => set(() => ({ playableCardBackground })),
  updatePlayableDeckText: (playableDeckText: string) => set(() => ({ playableDeckText })),
}));

export default useGameStore;