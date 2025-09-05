import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import from our new firebase.js

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up a new user with email and password
  const signUp = async (name, email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with their name
    await updateProfile(userCredential.user, { displayName: name });
    
    // Save user data to Firestore
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      uid: userCredential.user.uid,
      name,
      email,
      ...additionalData
    });
    
    return userCredential;
  };

  // Sign in an existing user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out the current user
  const logOut = () => {
    return signOut(auth);
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signUp,
    signIn,
    signOut: logOut, // Renamed for clarity in components
  };

  // We don't render the app until Firebase has checked the auth state
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
