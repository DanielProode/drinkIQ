import { create } from "zustand";

type GameChoices = {
  avatar: number;
  drink: number;
  playableDeckIndex: number;
  roomCode: string;
  isLobbyStarted: boolean;
  isSessionStarted: boolean;
  isGameHost: boolean
}

type GameChoiceActions = {
  updateAvatar: (avatar: GameChoices['avatar']) => void;
  updateDrink: (drink: GameChoices['drink']) => void;
  updatePlayableDeckIndex: (playableDeck: GameChoices['playableDeckIndex']) => void;
  updateRoomCode: (roomCode: GameChoices['roomCode']) => void;
  updateIsLobbyStarted: (newValue: boolean) => void;
  updateIsSessionStarted: (newValue: boolean) => void;
  updateIsGameHost: (newValue: boolean) => void;
}

const useGameStore = create<GameChoices & GameChoiceActions>((set) => ({
  avatar: 0,
  drink: 0,
  playableDeckIndex: 0,
  roomCode: '',
  isLobbyStarted: false,
  isSessionStarted: false,
  isGameHost: false,
  updateAvatar: (avatar: number) => set(() => ({ avatar })),
  updateDrink: (drink: number) => set(() => ({ drink })),
  updatePlayableDeckIndex: (playableDeckIndex: number) => set(() => ({ playableDeckIndex })),
  updateRoomCode: (roomCode: string) => set(() => ({ roomCode })),
  updateIsLobbyStarted: (newValue) => set({ isLobbyStarted: newValue }),
  updateIsSessionStarted: (newValue) => set({ isSessionStarted: newValue }),
  updateIsGameHost: (newValue) => set({ isGameHost: newValue }),
}));

export default useGameStore;