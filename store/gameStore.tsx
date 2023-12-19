import { create } from "zustand";

type GameChoices = {
  avatar: number;
  drink: number;
  playableDeckIndex: number;
  roomCode: string;
}

type GameChoiceActions = {
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckIndex: (playableDeck: GameChoices['playableDeckIndex']) => void;
  updateRoomCode: (roomCode: GameChoices['roomCode']) => void;
}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  avatar: 0,
  drink: 0,
  playableDeckIndex: 0,
  roomCode: '',
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateDrink: (drink: number) => set(() => ({ drink })),
  updatePlayableDeckIndex: (playableDeckIndex: number) => set(() => ({ playableDeckIndex })),
  updateRoomCode: (roomCode: string) => set(() => ({ roomCode })),
}));

export default useGameStore;