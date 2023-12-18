import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

import { DEFAULT_DECK_IMAGE, DEFAULT_DECK_PREVIEW_IMAGE, DEFAULT_PACK, DEFAULT_PACK_NAME, DEFAULT_DECK_TEXT } from "../constants/general";

type GameChoices = {
  playerId: string | null;
  avatar: number;
  drink: number;
  playableDeckIndex: number;
}

type GameChoiceActions = {
  updatePlayerId: (playerId: GameChoices['playerId']) => void;
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckIndex: (playableDeck: GameChoices['playableDeckIndex']) => void;

}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  playerId: null,
  avatar: 0,
  drink: 0,
  playableDeckIndex: 0,
  updatePlayerId: (playerId: string | null) => set(() => ({ playerId })),
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateDrink: (drink: number) => set(() => ({ drink })),
  updatePlayableDeckIndex: (playableDeckIndex: number) => set(() => ({ playableDeckIndex })),
}));

export default useGameStore;