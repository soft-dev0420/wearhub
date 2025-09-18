"use client"
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { useState } from "react";

const ThemeButton: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  
  return (
    <button onClick={() => setMode(mode === "dark" ? "light" : "dark")} className="text-2xl">
      {mode === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
};

export default ThemeButton;
