import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAushxkDXRJmx1kGnicI-pXQstOnh5FMVA",
  authDomain: "drinkiq-fb42e.firebaseapp.com",
  databaseURL: "https://drinkiq-fb42e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drinkiq-fb42e",
  storageBucket: "drinkiq-fb42e.appspot.com",
  messagingSenderId: "258336652151",
  appId: "1:258336652151:web:fa2a0f156fc61976aeff72",
  measurementId: "G-BS2Z5BC5TL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_RTDB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});