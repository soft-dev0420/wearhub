"use client";
import { useContext } from "react";
import styles from "./menuButton.module.css";
import { NavContext } from "@/contexts/Nav";

const MenuButton: React.FC = () => {
  const context = useContext(NavContext);
  
  if (!context) {
    throw new Error('MenuButton must be used within a NavProvider');
  }
  
  const { isMenuOpened, setIsMenuOpened } = context;
  
  return (
    <button 
      onClick={() => setIsMenuOpened(!isMenuOpened)} 
      className={`${styles.menuBtn} ${isMenuOpened && styles.activeMenuBtn}`}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default MenuButton;