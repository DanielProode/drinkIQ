import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { Unsubscribe, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import useUserStore from '../store/userStore';

interface AuthProviderProps {
  children?: ReactNode;
};

interface AuthContextType {
  authUser: User | null;
  isUserLoaded: boolean;
  isUserLoading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  listenToUserData: (field?: 'username' | 'games_won' | 'total_drinks' | 'total_points' | 'packs_owned' | 'packs_played') => Unsubscribe;
};

const AuthContext = createContext<AuthContextType | null>(null);
const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const { username, updateUsername, updateGamesWon, updateTotalDrinks, updateTotalPoints, updatePacksOwned, updatePacksPlayed } = useUserStore();

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth)
  };

  const listenToUserData = (field?: 'username' | 'games_won' | 'total_drinks' | 'total_points' | 'packs_owned' | 'packs_played') => {
    const userId = authUser ? authUser.uid : '';
    const userRef = doc(FIREBASE_DB, 'users', userId);
    const firestoreSnap = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        updateUsername(docData.username);
        switch (field) {
          case 'username':
            updateUsername(docData.username);
            break;
          case 'games_won':
            updateGamesWon(docData.games_won);
            break;
          case 'total_drinks':
            updateTotalDrinks(docData.total_drinks);
            break;
          case 'total_points':
            updateTotalPoints(docData.total_points);
            break;
          case 'packs_owned':
            updatePacksOwned(docData.packs_owned);
            break;
          case 'packs_played':
            updatePacksPlayed(docData.packs_played);
            break;
          default:
            // Fetch all fields if field parameter is not provided
            updateUsername(docData.username);
            updateGamesWon(docData.games_won);
            updateTotalDrinks(docData.total_drinks);
            updateTotalPoints(docData.total_points);
            updatePacksOwned(docData.packs_owned);
            updatePacksPlayed(docData.packs_played);
        }
      }
    });
    return firestoreSnap;
  }

  const fetchUserData = async (userObject: User | null) => {
    if (userObject) {
      setIsUserLoading(true);
      const userDoc = doc(db, 'users', userObject.uid);
      try {
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          updateUsername(docData.username);
          updateGamesWon(docData.games_won);
          updateTotalDrinks(docData.total_drinks);
          updateTotalPoints(docData.total_points);
          updatePacksOwned(docData.packs_owned);
          updatePacksPlayed(docData.packs_played);
          setAuthUser(userObject);
        } else {
          console.error("User info document missing");
        }
      } catch (error) {
        console.error('Error fetching user info: ', error);
      };
    } else {
      setAuthUser(null);
    };
    setIsUserLoading(false);
    setIsUserLoaded(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      fetchUserData(currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <AuthContext.Provider value={{ isUserLoaded, isUserLoading, authUser, listenToUserData, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth }