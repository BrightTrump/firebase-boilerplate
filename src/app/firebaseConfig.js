// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuOxFgpWxHSMXvp26iq1iAmqDm4pPsNPY",
  authDomain: "next-app-with-firebase-4ffa3.firebaseapp.com",
  projectId: "next-app-with-firebase-4ffa3",
  storageBucket: "next-app-with-firebase-4ffa3.appspot.com",
  messagingSenderId: "417290199492",
  appId: "1:417290199492:web:213f020d3b5d5c64d2c491",
  measurementId: "G-GYNMB6DNE2",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firestore instance
const db = getFirestore(app);

export { db };
