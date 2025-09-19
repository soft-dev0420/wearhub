"use client";

import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Heart,
  ArrowLeft,
  Star,
  Shirt,
  ChevronRight,
} from "lucide-react";
import { useFavorites, useCart } from "@/lib/store";

export default function FavoritesPage() {
  const { items, removeItem } = useFavorites();
  const { addItem: addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Favorites</span>
        </div>
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <div className="mt-12 flex flex-col items-center justify-center space-y-6 py-12">
          <div className="rounded-full bg-muted p-8">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium">Your wishlist is empty</h2>
          <p className="text-center text-muted-foreground">
            Save items you love to your wishlist and find them here anytime.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Favorites</span>
      </div>
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to shopping
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Your Wishlist</h1>
      <p className="mt-2 text-muted-foreground">
        {items.length} {items.length === 1 ? "item" : "items"} saved to your
        wishlist
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col rounded-xl border bg-card p-4"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              {/* <Image
                src={item.images[0]?.url || "/placeholder.svg"}
                alt={item.name}
                width={300}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              /> */}
              <Shirt className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => removeItem(item.id)}
              >
                <Heart className="h-4 w-4 fill-current" />
                <span className="sr-only">Remove from wishlist</span>
              </Button>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-1 text-sm font-medium">
                    {item.rating}
                  </span>
                </div>
              </div>
              <h3 className="mt-1 font-medium">{item.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-bold">{item.price}</span>
                <Button size="sm" onClick={() => addToCart(item)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
