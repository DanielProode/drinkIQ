import { create } from "zustand";


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