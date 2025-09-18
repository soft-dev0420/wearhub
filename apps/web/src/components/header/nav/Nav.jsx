"use client";
import React, { useContext } from "react";
import NavLink from "./navLink/NavLink";
import styles from "./nav.module.css";
import PrimaryButton from "@/components/primaryButton/PrimaryButton";
import { NavContext } from "@/contexts/Nav";
import { useLang } from "@/contexts/LangContext";
import { 
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaQuestionCircle,
  FaEnvelope,
} from 'react-icons/fa';
import { useAuth } from "@/contexts/AuthContext";
import { Users } from "lucide-react";

const Nav = () => {
  const { isMenuOpened, setIsMenuOpened } = useContext(NavContext);
  const {messages} = useLang();
  const { user } = useAuth();

  const iconSize = 22;

  return (
    <nav
      onClick={() => setIsMenuOpened((prev) => !prev)}
      className={`${styles.nav} ${
        isMenuOpened && styles.navActive
      } flex gap-1 lg:gap-4 shadow lg:shadow-none bg-transparent lg:bg-transparent`}
    >
      <NavLink path="/">
        <FaHome size={iconSize} className="inline mr-2 align-middle" />
        {messages['homeTitle']}
      </NavLink>

      <NavLink path="/about-us">
        <FaInfoCircle size={iconSize} className="inline mr-2 align-middle" />
        {messages['aboutusTitle']}
      </NavLink>

      <NavLink path="/services">
        <FaCogs size={iconSize} className="inline mr-2 align-middle" />
        {messages['termsofuseTitle']}
      </NavLink>

      <NavLink path="/faq">
        <FaQuestionCircle size={iconSize} className="inline mr-2 align-middle" />
        FAQ
      </NavLink>

      <div className="lg:hidden mt-10">
        <PrimaryButton>
          <FaEnvelope size={iconSize} className="inline mr-2 align-middle" />
          {messages['contactusTitle']}
        </PrimaryButton>
      </div>
    </nav>
  );
};

export default Nav;
