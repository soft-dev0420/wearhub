"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "./nav/Nav";
import PrimaryButton from "../primaryButton/PrimaryButton";
import MenuButton from "./menuButton/MenuButton";
import Logo from "./logo/Logo";
import {
  User,
  Users,
  FilePlus,
  LogOut,
  ChevronDown,
  MessagesSquare,
  Settings,
  BellRing,
  LogIn,
  Calendar,
  Key
} from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth";
import { doc, getDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import Image from "next/image";

const dummyAlarms = [
  { id: 1, content: "New message received", read: false },
  { id: 2, content: "Your profile was updated", read: true },
  { id: 3, content: "Admin approved your request", read: false },
];

const Header = () => {
  const { messages, switchLocale, locale } = useLang();
  const { user, loading } = useAuth();
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);

  const [alarms, setAlarms] = useState(dummyAlarms); // Replace with fetch from backend
  const [isAlarmDropdownOpen, setIsAlarmDropdownOpen] = useState(false);
  const alarmDropdownRef = useRef(null);

  const hasUnreadAlarms = alarms.some((alarm) => !alarm.read);

  useEffect(() => {
    const alarmsRef = collection(db, "alarms");
    let q;

    if (user?.role === "caregiver") {
      q = query(alarmsRef, where("assignedTo", "in", [user.email, "all"]));
    } else if (user?.role === "manager") {
      q = query(alarmsRef, where("assignedTo", "in", [user.email, "all", "manager"]));
    } else {
      q = query(alarmsRef);
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAlarms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setIsAvatarMenuOpen(false);
      }
      if (
        alarmDropdownRef.current &&
        !alarmDropdownRef.current.contains(event.target) &&
        event.target.getAttribute("data-alarm-btn") !== "true"
      ) {
        setIsAlarmDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAvatarMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (isAlarmDropdownOpen && hasUnreadAlarms) {
      setAlarms((prev) => prev.map((alarm) => ({ ...alarm, read: true })));
    }
    // eslint-disable-next-line
  }, [isAlarmDropdownOpen]);

  return (
    <header className="bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80 text-white border-b border-slate-800 h-16 fixed w-full top-0 z-50">
      <div className="container mx-auto px-3 h-full flex justify-between items-center py-2">
        <Logo />
        <Nav />
        <select value={locale} onChange={(e) => switchLocale(e.target.value)} className="hidden sm:block bg-slate-800 text-white text-sm px-3 py-2 rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/calendar"
            className="relative p-2 rounded-full hover:bg-slate-800/60 transition-colors"
            aria-label="Calendar"
          >
            <Calendar className="text-white" />
          </Link>
          {user.email && <div className="relative" ref={alarmDropdownRef}>
            <button
              data-alarm-btn="true"
              className="relative p-2 rounded-full hover:bg-slate-800/60 transition-colors"
              onClick={() => setIsAlarmDropdownOpen((prev) => !prev)}
              aria-label={messages.notificationsTitle}
            >
              <BellRing className="text-white" />
              {hasUnreadAlarms && (
                <span className="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-900"></span>
              )}
            </button>
            {/* Dropdown */}
            {isAlarmDropdownOpen && (
              <div
                className="
                  absolute right-0 mt-2
                  w-full max-w-xs sm:w-80
                  bg-slate-900 text-white shadow-xl rounded-xl overflow-hidden
                  ring-1 ring-slate-700 z-50
                "
                style={{ minWidth: "240px" }}
              >
                <div className="p-4 border-b border-slate-800 font-semibold">
                  {messages["notificationsTitle"] || "Notifications"}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {alarms.length === 0 ? (
                    <div className="p-4 text-slate-400 text-sm">
                      {messages["noNotifications"] || "No notifications"}
                    </div>
                  ) : (
                    alarms
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((alarm) => (
                        <div
                          key={alarm.id}
                          className={`group relative px-4 py-4 text-sm border-b border-slate-800 transition-all duration-200 hover:bg-slate-800/60 ${!alarm.read
                              ? "bg-slate-800/60 font-medium shadow-sm"
                              : "text-slate-200 hover:scale-[1.02]"
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${!alarm.read
                                ? "bg-blue-500 animate-pulse"
                                : "bg-slate-600"
                              }`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={`font-medium leading-relaxed ${!alarm.read
                                    ? "text-blue-100"
                                    : "text-slate-200"
                                  }`}>
                                  {alarm.title}
                                </p>
                                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                                  {alarm.type}
                                </span>
                              </div>
                              {alarm.content && (
                                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                                  {alarm.content}
                                </p>
                              )}
                              <div className="mt-1 flex items-center gap-2">
                                <p className="text-xs text-slate-500">
                                  {new Date(alarm.date).toLocaleDateString()}
                                </p>
                                <span className="text-xs text-slate-600">•</span>
                                <p className="text-xs text-slate-500">
                                  {new Date(alarm.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-1 h-1 bg-slate-500 rounded-full" />
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>}

          {!loading && user.email ? (
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={() => setIsAvatarMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-800/60"
              >
                <div className="h-10 w-10 rounded-full flex items-center justify-center">
                  <Image
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.avatar || "/user.jpg"}
                    alt=""
                    height={40}
                    width={40}
                  />
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isAvatarMenuOpen ? "rotate-180" : ""}
                    text-white`}
                />
              </button>
              {isAvatarMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-slate-900 text-white shadow-xl rounded-xl overflow-hidden ring-1 ring-slate-700 z-50">
                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-slate-800">
                    <p className="text-sm text-slate-400">
                      {messages["signasLabel"]}
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-sm text-slate-400">
                      ({user.role})
                    </p>
                  </div>

                  <Link
                    href="/changepassword"
                    className="flex items-center gap-2 px-5 py-3 text-sm text-slate-200 hover:bg-slate-800/60 transition-colors"
                  >
                    <Key size={16} className="text-blue-400" />
                    <span>
                      {messages.changepasswordTitle}
                    </span>
                  </Link>

                  {/* Navigation Links */}
                  <div className="py-1">

                    {user.isAdmin && (
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-5 py-3 text-sm text-slate-200 hover:bg-slate-800/60 transition-colors"
                      >
                        <Settings size={16} className="text-blue-400" />
                        <span>{messages["settingTitle"]}</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-5 py-3 text-sm text-red-400 hover:bg-slate-800/60 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>{messages["logoutTitle"]}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              >
                <LogIn />
              </Link>
            </div>
          )}

          <div className="lg:hidden">
            <MenuButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
