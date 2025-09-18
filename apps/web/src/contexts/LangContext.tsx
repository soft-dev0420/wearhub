// context/LangContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

interface LangContextType {
  locale: string;
  messages: typeof en;
  switchLocale: (newLocale: string) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>('en');
  const [messages, setMessages] = useState<typeof en>(en);

  useEffect(() => {
    const stored = localStorage.getItem('locale') || 'en';
    setLocale(stored);
    setMessages(stored === 'pl' ? pl : en);
  }, []);

  const switchLocale = (newLocale: string): void => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    setMessages(newLocale === 'pl' ? pl : en);
  };

  return (
    <LangContext.Provider value={{ locale, messages, switchLocale }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};
