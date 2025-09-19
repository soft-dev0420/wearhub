"use client";

import { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  CreditCard,
  Check,
  Shirt,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/store";

export default function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping"
  );

  // Calculate shipping cost (free over $100)
  const shippingCost =
    Number.parseFloat(subtotal.replace("$", "")) > 100 ? 0 : 10;

  // Calculate tax (8%)
  const taxAmount = (
    Number.parseFloat(subtotal.replace("$", "")) * 0.08
  ).toFixed(2);

  // Calculate total with shipping and tax
  const total = (
    Number.parseFloat(subtotal.replace("$", "")) +
    shippingCost +
    Number.parseFloat(taxAmount)
  ).toFixed(2);

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
          <span className="font-medium">Checkout</span>
        </div>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="mt-12 flex flex-col items-center justify-center space-y-6 py-12">
          <div className="rounded-full bg-muted p-8">
            <CreditCard className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium">Your cart is empty</h2>
          <p className="text-center text-muted-foreground">
            You need to add items to your cart before proceeding to checkout.
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
        <span className="font-medium">Checkout</span>
      </div>
      <div className="mb-8">
        <Link
          href="/cart"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Checkout</h1>

      {step === "confirmation" ? (
        <div className="mt-12 flex flex-col items-center justify-center space-y-6 py-12">
          <div className="rounded-full bg-primary p-8">
            <Check className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-medium">Order Confirmed!</h2>
          <p className="text-center text-muted-foreground">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <p className="text-center font-medium">
            Order #: MS-{Math.floor(Math.random() * 10000)}
          </p>
          <p className="text-center text-muted-foreground">
            A confirmation email has been sent to your email address.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-card">
              <div className="p-6">
                {step === "shipping" ? (
                  <>
                    <h2 className="text-lg font-medium">
                      Shipping Information
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" className="mt-1" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" className="mt-1" />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input id="address" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Select>
                          <SelectTrigger id="state" className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                            <SelectItem value="fl">Florida</SelectItem>
                            <SelectItem value="il">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger id="country" className="mt-1">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" className="mt-1" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-base font-medium">Shipping Method</h3>
                      <RadioGroup defaultValue="standard" className="mt-3">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal">
                              Standard Shipping (3-5 business days)
                            </Label>
                          </div>
                          <span>
                            {shippingCost === 0
                              ? "Free"
                              : `$${shippingCost.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-normal">
                              Express Shipping (1-2 business days)
                            </Label>
                          </div>
                          <span>$19.99</span>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-6">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Special instructions for delivery"
                        className="mt-1"
                      />
                    </div>

                    <div className="mt-6">
                      <Button
                        className="w-full"
                        onClick={() => setStep("payment")}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-medium">Payment Information</h2>
                    <div className="mt-6">
                      <RadioGroup defaultValue="card" className="space-y-3">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="font-medium">
                              Credit Card
                            </Label>
                          </div>
                          <div className="mt-4 grid gap-4">
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                className="mt-1"
                                placeholder="•••• •••• •••• ••••"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  className="mt-1"
                                  placeholder="MM/YY"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  className="mt-1"
                                  placeholder="•••"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal" className="font-medium">
                              PayPal
                            </Label>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            You will be redirected to PayPal to complete your
                            purchase.
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="apple" id="apple" />
                            <Label htmlFor="apple" className="font-medium">
                              Apple Pay
                            </Label>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Pay with Apple Pay using your saved cards.
                          </p>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep("shipping")}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => setStep("confirmation")}
                      >
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl border bg-card">
              <div className="p-6">
                <h2 className="text-lg font-medium">Order Summary</h2>

                <Accordion type="single" collapsible className="mt-4 w-full">
                  <AccordionItem value="items">
                    <AccordionTrigger className="text-sm">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border grid place-items-center">
                              {/* <Image
                                src={item.images[0].url || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              /> */}
                              <Shirt className="group-hover:scale-120 transition-all" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">
                                {item.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium">{item.price}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>{subtotal}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-muted-foreground">Tax (8%)</p>
                    <p>${taxAmount}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>${total}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Secure Checkout</p>
                  <p className="mt-1 text-muted-foreground">
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
