import { create } from "zustand";

type UserProfile = {
  username: string;
  games_won: number;
  total_drinks: number;
  total_points: number;
  packs_owned: string[];
  packs_played: Record<string, number[]>;
}

type UserActions = {
  updateUsername: (username: UserProfile['username']) => void;
  updateGamesWon: (games_won: UserProfile['games_won']) => void;
  updateTotalDrinks: (total_drinks: UserProfile['total_drinks']) => void;
  updateTotalPoints: (total_points: UserProfile['total_points']) => void;
  updatePacksOwned: (packs_owned: UserProfile['packs_owned']) => void;
  updatePacksPlayed: (packs_played: UserProfile['packs_played']) => void;
}
const cardDecksPlayed: Record<string, number[]> = {
  "": [],
};

const useUserStore = create<UserProfile & UserActions>((set) => ({
  username: '',
  games_won: 0,
  total_drinks: 0,
  total_points: 0,
  packs_owned: [],
  packs_played: cardDecksPlayed,
  updateUsername: (username: string) => set(() => ({ username })),
  updateGamesWon: (games_won: number) => set(() => ({ games_won })),
  updateTotalDrinks: (total_drinks: number) => set(() => ({ total_drinks })),
  updateTotalPoints: (total_points: number) => set(() => ({ total_points })),
  updatePacksOwned: (packs_owned: string[]) => set(() => ({ packs_owned })),
  updatePacksPlayed: (packs_played: Record<string, number[]>) => set((state) => ({ 
    packs_played: {
      ...state.packs_played,
      ...packs_played, 
    }
  })),
}));

export default useUserStore;