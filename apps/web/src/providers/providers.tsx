"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { StoreProvider } from "@/lib/store";
import QueryClientProvider from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryClientProvider>
          <StoreProvider>{children}</StoreProvider>
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
