
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAY0vVeRTyaQMNN8ZGAQwmB-TKX4uzAq04",
  authDomain: "web3-forge-42a11.firebaseapp.com",
  projectId: "web3-forge-42a11",
  storageBucket: "web3-forge-42a11.appspot.com",
  messagingSenderId: "797667931654",
  appId: "1:797667931654:web:92f43fb2130283e24e7587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);