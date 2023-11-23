import { create } from "zustand";

export type UserProfile = {
  username: string;
  games_won: number;
  total_drinks: number;
  total_points: number;
  packs_owned: string[];
}

interface UserActions {
  updateUsername: (username: UserProfile['username']) => void;
  updateGamesWon: (games_won: UserProfile['games_won']) => void;
  updateTotalDrinks: (total_drinks: UserProfile['total_drinks']) => void;
  updateTotalPoints: (total_points: UserProfile['total_points']) => void;
  updatePacksOwned: (packs_owned: UserProfile['packs_owned']) => void;
}

const useUserStore = create<UserProfile & UserActions>((set) => ({
  username: '',
  games_won: 0,
  total_drinks: 0,
  total_points: 0,
  packs_owned: [],
  updateUsername: (username: string) => set(() => ({ username })),
  updateGamesWon: (games_won: number) => set(() => ({ games_won })),
  updateTotalDrinks: (total_drinks: number) => set(() => ({ total_drinks })),
  updateTotalPoints: (total_points: number) => set(() => ({ total_points })),
  updatePacksOwned: (packs_owned: string[]) => set(() => ({ packs_owned })),
}));

export default useUserStore;