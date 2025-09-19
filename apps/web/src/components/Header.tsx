"use client";

import { AuthHeader } from "@/components/auth-header";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import LogoImg from "../../public/logo.svg";

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 grid place-items-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={LogoImg} width={70} alt="WearHub" />
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/shop"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/categories"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/about"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]"
              />
            </div>
          </div>
          <AuthHeader />
          <ModeToggle />
          <Link href="/favorites">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <CartSheet />
        </div>
      </div>
    </header>
  );
};