import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

import { DEFAULT_DECK_IMAGE, DEFAULT_DECK_PREVIEW_IMAGE, DEFAULT_PACK, DEFAULT_PACK_NAME, DEFAULT_DECK_TEXT } from "../constants/general";

type GameChoices = {
  playerId: string | null;
  avatar: number;
  drink: number;
  playableDeckImage: ImageSourcePropType;
  playableDeck: string;
  playableDeckName: string;
  playableCardBackground: ImageSourcePropType;
  playableDeckText: string;
}

type GameChoiceActions = {
  updatePlayerId: (playerId: GameChoices['playerId']) => void;
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckImage: (playableDeckImage: GameChoices['playableDeckImage']) => void;
  updatePlayableDeck: (playableDeck: GameChoices['playableDeck']) => void;
  updatePlayableDeckName: (playableDeck: GameChoices['playableDeckName']) => void;
  updatePlayableCardBackground: (playableCardBackground: GameChoices['playableCardBackground']) => void;
  updatePlayableDeckText: (playableCardText: GameChoices['playableDeckText']) => void;
}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  playerId: null,
  avatar: 0,
  drink: 0,
  playableDeckImage: DEFAULT_DECK_PREVIEW_IMAGE,
  playableDeck: DEFAULT_PACK,
  playableDeckName: DEFAULT_PACK_NAME,
  playableCardBackground: DEFAULT_DECK_IMAGE,
  playableDeckText: DEFAULT_DECK_TEXT,
  updatePlayerId: (playerId: string | null) => set(() => ({ playerId })),
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateDrink: (drink: number) => set(() => ({ drink })),
  updatePlayableDeckImage: (playableDeckImage: ImageSourcePropType) => set(() => ({ playableDeckImage })),
  updatePlayableDeck: (playableDeck: string) => set(() => ({ playableDeck })),
  updatePlayableDeckName: (playableDeckName: string) => set(() => ({ playableDeckName })),
  updatePlayableCardBackground: (playableCardBackground: ImageSourcePropType) => set(() => ({ playableCardBackground })),
  updatePlayableDeckText: (playableDeckText: string) => set(() => ({ playableDeckText })),
}));

export default useGameStore;