// src/contexts/AuthContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firestore"; // Adjust path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initUser = {
    email: null,
    displayName: null,
    photoURL: null,
    role: "",
    isAdmin: false, // default value for isAdmin
    setList: false, // default value for setList
    status: "", // default status
  }
  const [user, setUser] = useState(initUser); // stores Firebase user + custom data
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userEmail = firebaseUser.email.toLowerCase();
        const userDocRef = doc(db, "users", userEmail);
        onSnapshot(userDocRef, (userSnap) => {
          const userData = userSnap.exists() ? userSnap.data() : {};
          setUser({
            ...firebaseUser,
            role: userData.role || "",
            status: userData.status || "",
            isAdmin: userData.isAdministrator,
          });
        });

        const listDocRef = doc(db, "lists", userEmail);
        const listSnap = await getDoc(listDocRef);

        
      } else {
        setUser(initUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
