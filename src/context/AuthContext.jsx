import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function runs whenever the user's authentication state changes (login, logout, refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // If the user is logged in, fetch their full profile from the Firestore database.
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // Combine the basic auth data (like email) with your custom database data (like role and dob).
          // This ensures user.role and user.dob are available everywhere.
          setUser({ ...currentUser, ...userDocSnap.data() });
        } else {
          // If for some reason the database record doesn't exist, use the auth data.
          setUser(currentUser);
        }
      } else {
        // If the user is logged out, clear the user state.
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (name, email, password, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseUpdateProfile(userCredential.user, { displayName: name });
    
    const userRef = doc(db, "users", userCredential.user.uid);
    // When signing up, create the user document in Firestore with all data.
    await setDoc(userRef, {
      uid: userCredential.user.uid,
      name,
      email,
      ...additionalData // This will include the role and dob from the signup form
    });
    
    const userDoc = await getDoc(userRef);
    setUser({ ...userCredential.user, ...userDoc.data() });

    return userCredential;
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateProfile = async (profileData) => {
    if (!auth.currentUser) return;

    // 1. Update the user's record in the Firestore database.
    // This is the most important step for making dob persistent.
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      name: profileData.displayName,
      dob: profileData.dob,
    });

    // 2. Update the user's basic profile in Firebase Authentication (for name and photo).
    await firebaseUpdateProfile(auth.currentUser, {
      displayName: profileData.displayName,
      photoURL: profileData.photoURL,
    });

    // 3. Update the app's state immediately with the new, complete data.
    const updatedUserDoc = await getDoc(userDocRef);
    setUser({ ...auth.currentUser, ...updatedUserDoc.data() });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut: logOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};