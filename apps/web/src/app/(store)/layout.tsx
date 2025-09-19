import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropsWithChildren } from "react";

export default function StoreLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}