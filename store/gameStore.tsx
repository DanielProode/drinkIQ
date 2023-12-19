import { create } from "zustand";

type GameChoices = {
  avatar: number;
  drink: number;
  playableDeckIndex: number;
}

type GameChoiceActions = {
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckIndex: (playableDeck: GameChoices['playableDeckIndex']) => void;

}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  avatar: 0,
  drink: 0,
  playableDeckIndex: 0,
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateDrink: (drink: number) => set(() => ({ drink })),
  updatePlayableDeckIndex: (playableDeckIndex: number) => set(() => ({ playableDeckIndex })),
}));

export default useGameStore;