import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

import { FIREBASE_AUTH } from '../firebaseConfig';

interface AuthProviderProps {
  children?: ReactNode;
};

interface AuthContextType {
  user: User | null;
  userLoaded: boolean;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoaded, setIsUserLoaded] = useState(false);
  const auth = FIREBASE_AUTH;

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth)
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsUserLoaded(true);
      console.log(currentUser);
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