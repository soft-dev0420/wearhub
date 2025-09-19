"use client";

import { AuthHeader } from "@/components/auth-header";
import { CartSheet } from "@/components/cart-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Heart,
  Instagram,
  Search,
  ShoppingBag,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { FooterModeToggle } from "@/components/footer-mode-toggle";

export default function StoreLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 grid place-items-center">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                ModernShop
              </span>
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
      {children}
      <footer className="border-t bg-background grid place-items-center">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <span className="font-bold">ModernShop</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Curated fashion for the modern lifestyle. Quality products that
                stand the test of time.
              </p>
              <div className="mt-4 flex space-x-3">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Youtube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Shop</h3>
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
            <div>
              <h3 className="text-lg font-medium">Company</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
                <Link
                  href="/about#careers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Store Locations
                </Link>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Our Blog
                </Link>
                <Link
                  href="/reviews"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Reviews
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="text-lg font-medium">Customer Service</h3>
              <nav className="mt-4 flex flex-col space-y-2">
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Shipping & Returns
                </Link>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  FAQs
                </Link>
                <Link
                  href="/size-guide"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Size Guide
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ModernShop. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Image
                src="https://cdn.freebiesupply.com/logos/large/2x/visa-2-logo-png-transparent.png"
                alt="Visa"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="https://pngimg.com/d/mastercard_PNG16.png"
                alt="Mastercard"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="https://www.pngplay.com/wp-content/uploads/12/PayPal-PNG-Pic-Background.png"
                alt="PayPal"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
              <Image
                src="https://static-00.iconduck.com/assets.00/apple-pay-icon-2048x1594-cl3st1bm.png"
                alt="Apple Pay"
                width={50}
                height={30}
                className="h-8 w-auto"
              />
              <FooterModeToggle />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
