"use client";

import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  Shirt,
} from "lucide-react";
import { useCart } from "@/lib/store";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, subtotal, clearCart } =
    useCart();

  // Calculate shipping cost (free over $100)
  const shippingCost =
    Number.parseFloat(subtotal.replace("$", "")) > 100 ? 0 : 10;

  // Calculate total with shipping
  const total = (
    Number.parseFloat(subtotal.replace("$", "")) + shippingCost
  ).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <div className="mt-12 flex flex-col items-center justify-center space-y-6 py-12">
          <div className="rounded-full bg-muted p-8">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium">Your cart is empty</h2>
          <p className="text-center text-muted-foreground">
            Looks like you {"haven't"} added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/" className="mt-4">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button variant="ghost" size="sm" onClick={clearCart} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card">
            <div className="p-6">
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg font-medium">
                  Cart Items ({totalItems})
                </h2>
              </div>

              <Separator />

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border grid place-items-center">
                      {/* <Image
                        src={item.images[0].url || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      /> */}
                      <Shirt className="group-hover:scale-120 transition-all" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">{item.price}</p>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-xl border bg-card">
            <div className="p-6">
              <h2 className="text-lg font-medium">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">{subtotal}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p className="font-medium">Calculated at checkout</p>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${total}</p>
                </div>
              </div>

              <Button asChild className="mt-6 w-full gap-2">
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Have a promo code?</p>
                <div className="flex">
                  <Input placeholder="Enter code" className="rounded-r-none" />
                  <Button variant="secondary" className="rounded-l-none">
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
