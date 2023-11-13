import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQJwgWNkQPrMkthoZRxjyneawEX8q9lFM",
  authDomain: "expense-tracker-6f020.firebaseapp.com",
  projectId: "expense-tracker-6f020",
  storageBucket: "expense-tracker-6f020.appspot.com",
  messagingSenderId: "410052310092",
  appId: "1:410052310092:web:7cae722cf20a12402af0e9",
  measurementId: "G-GZW3940J4F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
