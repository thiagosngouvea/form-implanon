// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBg_bqkNBpoYlXhyPXm-0hYnKNEV9fCzvY",
    authDomain: "implanon.firebaseapp.com",
    projectId: "implanon",
    storageBucket: "implanon.firebasestorage.app",
    messagingSenderId: "913907716800",
    appId: "1:913907716800:web:1193a8b10046af6bc79325"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
