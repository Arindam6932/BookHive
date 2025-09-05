import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIiLFHTGEFKpu80h2QnHbAlDZHAHtCbs0",
  authDomain: "bookhive-b2fc1.firebaseapp.com",
  projectId: "bookhive-b2fc1",
  storageBucket: "bookhive-b2fc1.firebasestorage.app",
  messagingSenderId: "884302774318",
  appId: "1:884302774318:web:1b7dadb2de689bb835dfbf",
  measurementId: "G-7WHBMWXELF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
