import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAushxkDXRJmx1kGnicI-pXQstOnh5FMVA",
  authDomain: "drinkiq-fb42e.firebaseapp.com",
  projectId: "drinkiq-fb42e",
  storageBucket: "drinkiq-fb42e.appspot.com",
  messagingSenderId: "258336652151",
  appId: "1:258336652151:web:fa2a0f156fc61976aeff72",
  measurementId: "G-BS2Z5BC5TL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);