import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg-mzC_WsTDD2lgv0ghpMxV2a3AZ-AUow",
  authDomain: "batcavecryptoignacioarico.firebaseapp.com",
  projectId: "batcavecryptoignacioarico",
  storageBucket: "batcavecryptoignacioarico.firebasestorage.app",
  messagingSenderId: "623615913522",
  appId: "1:623615913522:web:587e6eb009ba620b2d562b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);