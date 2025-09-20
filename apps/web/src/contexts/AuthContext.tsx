// src/contexts/AuthContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { User } from "firebase/auth";

interface CustomUser extends User {
  role: string;
  isAdmin: boolean;
  status: string;
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userEmail = firebaseUser.email?.toLowerCase();
        const userDocRef = doc(db, "users", userEmail || "");
        onSnapshot(userDocRef, (userSnap) => {
          const userData = userSnap.exists() ? userSnap.data() : {};
          setUser({
            ...firebaseUser,
            role: userData.role || "",
            status: userData.status || "",
            isAdmin: userData.isAdministrator || false,
          } as CustomUser);
        });

        // const listDocRef = doc(db, "lists", userEmail || "");
        // const listSnap = await getDoc(listDocRef);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
