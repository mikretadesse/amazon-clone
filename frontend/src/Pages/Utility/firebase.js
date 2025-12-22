// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChC2Q8yJwKh12Oo5XDlrvC6T01Dq_YjGE",
  authDomain: "clone-e4553.firebaseapp.com",
  projectId: "clone-e4553",
  storageBucket: "clone-e4553.firebasestorage.app",
  messagingSenderId: "890908777002",
  appId: "1:890908777002:web:d690e4f6a27bb8d2ee8153",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
