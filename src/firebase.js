// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIiLFHTGEFKpu80h2QnHbAlDZHAHtCbs0",
  authDomain: "bookhive-b2fc1.firebaseapp.com",
  projectId: "bookhive-b2fc1",
  storageBucket: "bookhive-b2fc1.appspot.com",
  messagingSenderId: "884302774318",
  appId: "1:884302774318:web:1b7dadb2de689bb835dfbf",
  measurementId: "G-7WHBMWXELF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services to be used in other parts of the application
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;