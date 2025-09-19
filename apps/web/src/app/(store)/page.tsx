"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Heart,
  ChevronRight,
  Star,
  ArrowRight,
  Instagram,
  Shirt,
  Grid,
} from "lucide-react";
import { useCart, useFavorites } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { addItem: addToCart } = useCart();
  const {
    addItem: addToFavorites,
    removeItem: removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const {
    data: products,
    error: productsError,
    isLoading: productsIsLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products/limited?limit=12");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories/limited?limit=4");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });

  const handleToggleFavorite = (product: (typeof products)[0]) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart(product);
  };

  if (productsIsLoading || categoriesIsLoading) return <div>Loading...</div>;
  if (productsError instanceof Error || categoriesError instanceof Error)
    return (
      <div>
        {productsError?.message} <br /> {categoriesError?.message}
      </div>
    );

  console.log(products);

  return (
    <main className="flex-1">
      <section className="relative grid place-items-center">
        <div className="container flex flex-col items-center justify-between gap-4 py-12 md:flex-row md:py-24 lg:py-32">
          <div className="flex flex-col items-start space-y-4 md:max-w-[50%]">
            <div className="rounded-full bg-lime-400/20 text-lime-400 px-4 py-1.5 text-sm font-medium">
              New Collection 2025
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover Your <span className="text-primary">Perfect Style</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our curated collection of premium fashion items designed
              for the modern lifestyle.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1" asChild>
                <Link href="/shop">
                  Shop Now <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">Explore Collections</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 aspect-square w-full max-w-[500px] md:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Featured product"
              width={600}
              height={600}
              className="rounded-xl object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/80 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Premium Leather Jacket</h3>
                  <p className="text-sm text-muted-foreground">
                    Limited Edition
                  </p>
                </div>
                <div className="text-lg font-bold text-primary">$299.99</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-16 grid place-items-center">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium text-primary"
            >
              View All Categories <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {categories.map(
              (category: (typeof categories)[0], index: number) => {
                // const initials = category.name
                //   .split(" ")
                //   .map((word: string) => word.charAt(0).toUpperCase())
                //   .slice(0, 2)
                //   .join("");

                return (
                  <Link
                    key={index}
                    href="/categories"
                    className="group relative aspect-square overflow-hidden rounded-xl grid place-items-center"
                  >
                    {/* <h1 className="text-xl font-bold">{initials}</h1> */}
                    <Grid className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 grid place-items-center">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <Link
              href="/shop"
              className="flex items-center text-sm font-medium text-primary"
            >
              View All Products <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: (typeof products)[0]) => (
              <div key={product.id} className="group relative flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                  {/* <Image
                      src={product.images[0].url || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    /> */}
                  <Shirt className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-4 opacity-100 transition-opacity"
                    onClick={() => handleToggleFavorite(product)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isFavorite(product.id)
                          ? "fill-primary text-primary"
                          : ""
                      }`}
                    />
                    <span className="sr-only">
                      {isFavorite(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"}
                    </span>
                  </Button>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-1 font-medium">{product.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-bold">{product.price} &#8364;</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="sr-only">Add to cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 md:py-16 grid place-items-center">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-start space-y-4 text-primary-foreground md:max-w-[50%]">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Summer Sale Up To 50% Off
              </h2>
              <p className="text-lg opacity-90">
                Limited time offer on our summer collection. Refresh your
                wardrobe with the latest trends.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/shop?sale=true">Shop the Sale</Link>
              </Button>
            </div>
            <div className="relative aspect-video w-full max-w-[500px] overflow-hidden rounded-xl md:aspect-square">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Summer sale"
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 grid place-items-center">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            What Our Customers Say
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Johnson",
                text: "The quality of the clothes is exceptional. I've been shopping here for years and have never been disappointed.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                text: "Fast shipping and the fit is perfect. The customer service team was very helpful when I needed to exchange an item.",
                rating: 5,
              },
              {
                name: "Emma Williams",
                text: "Love the new collection! The designs are modern and the fabrics are so comfortable. Will definitely be ordering more.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border bg-card p-6 text-card-foreground shadow"
              >
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                </div>
                <blockquote className="mt-4 flex-1">
                  <p className="text-muted-foreground">
                    &quot;{testimonial.text}&quot;
                  </p>
                </blockquote>
                <div className="mt-4 font-medium">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 md:py-16 grid place-items-center">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Join Our Newsletter
            </h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit" className="gap-1">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 grid place-items-center">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-3xl font-bold tracking-tight">
              Follow Us on Instagram
            </h2>
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-primary"
            >
              @modernshop <Instagram className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Link
                  key={index}
                  href="#"
                  className="group relative aspect-square overflow-hidden rounded-xl"
                >
                  {/* <Image
                      src={`/placeholder.svg?height=200&width=200`}
                      alt={`Instagram post ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    /> */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
                    <Instagram className="h-8 w-8 transition-all group-hover:scale-120" />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
