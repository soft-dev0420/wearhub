"use client";
import { createContext, useState, ReactNode } from "react";

interface NavContextType {
  isMenuOpened: boolean;
  setIsMenuOpened: (value: boolean) => void;
}

export const NavContext = createContext<NavContextType | undefined>(undefined);

const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const ctxVal: NavContextType = { isMenuOpened, setIsMenuOpened };
  
  return (
    <NavContext.Provider value={ctxVal}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;