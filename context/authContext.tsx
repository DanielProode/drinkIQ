import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { Unsubscribe, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';

interface AuthProviderProps {
  children?: ReactNode;
};

interface UserProfile {
  username?: string;
  games_won?: number;
  total_drinks?: number;
  total_points?: number;
  packs_owned?: string[];
}

interface AuthContextType {
  userProfile: UserProfile | null;
  authUser: User | null;
  isUserLoaded: boolean;
  isUserLoading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  listenToUserData: () => Unsubscribe;
};

const AuthContext = createContext<AuthContextType | null>(null);
const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth)
  };

  const listenToUserData = () => {
    const userId = authUser ? authUser.uid : '';
    const userRef = doc(FIREBASE_DB, 'users', userId);
    const firestoreSnap = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        setUserProfile(docData);
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
          const userData = docSnap.data();
          setUserProfile(userData);
          setAuthUser(userObject);
        } else {
          console.log("User info document missing");
        }
      } catch (error) {
        console.error('Error fetching user info: ', error);
      };
    } else {
      setAuthUser(null);
      setUserProfile(null);;
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
    console.log(userProfile);
  }, [userProfile]);

  return (
    <AuthContext.Provider value={{ userProfile, isUserLoaded, isUserLoading, authUser, listenToUserData, signUp, signIn, logOut }}>
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