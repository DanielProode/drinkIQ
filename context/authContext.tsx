import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';

interface AuthProviderProps {
  children?: ReactNode;
};

interface CustomUser extends User {
  username?: string;
  games_won?: number;
  total_drinks?: number;
  total_points?: number;
  packs_owned?: string[];
}

interface AuthContextType {
  user: CustomUser | null;
  userLoaded: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [userLoaded, setIsUserLoaded] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth)
  };

  const fetchUserData = async (userObject: User | null) => {
    if (userObject) {
      const userDoc = doc(db, 'users', userObject.uid);
      try {
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({ ...userObject, ...userData});
          } else {
            setUser(userObject);
            console.log("User info document missing");
          }
      } catch (error) {
        console.error('Error fetching user info: ', error);
      };
    } else {
      setUser(null);
    };
    setIsUserLoaded(true);
    console.log(user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      fetchUserData(currentUser);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLoaded, signUp, signIn, logOut }}>
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