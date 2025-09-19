"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Edit,
  Lock,
  ArrowLeft,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";

const orders = [
  {
    id: "ORD-2024-1234",
    date: "May 5, 2024",
    status: "Delivered",
    total: "$189.99",
    items: [
      {
        id: "prod-1",
        name: "Slim Fit Cotton Shirt",
        price: "$59.99",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "prod-2",
        name: "Premium Denim Jeans",
        price: "$89.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-2024-1198",
    date: "April 22, 2024",
    status: "Processing",
    total: "$129.99",
    items: [
      {
        id: "prod-4",
        name: "Leather Crossbody Bag",
        price: "$129.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-2024-1056",
    date: "March 15, 2024",
    status: "Delivered",
    total: "$69.99",
    items: [
      {
        id: "prod-3",
        name: "Casual Knit Sweater",
        price: "$69.99",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
];

// Mock data for addresses
const addresses = [
  {
    id: "addr-1",
    name: "Home",
    isDefault: true,
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  {
    id: "addr-2",
    name: "Work",
    isDefault: false,
    street: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
  },
];

// Mock data for payment methods
const paymentMethods = [
  {
    id: "card-1",
    type: "Visa",
    last4: "4242",
    expiry: "05/25",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "Mastercard",
    last4: "8888",
    expiry: "09/26",
    isDefault: false,
  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "account");

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // This should not happen due to middleware, but just in case
  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const user = session.user;

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
        <span className="font-medium">Profile</span>

        {activeTab && (
          <>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium capitalize">{activeTab}</span>
          </>
        )}
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

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/4">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user?.image || undefined}
                  alt={user?.name || "User"}
                />
                <AvatarFallback>
                  {user?.name
                    ? user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground truncate max-w-[120px]">
                  {user?.email}
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              <Button
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "addresses" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "payment" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "security" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("security")}
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </Button>
            </nav>

            <Separator className="my-4" />

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === "account" && (
            <div>
              <h1 className="text-2xl font-bold">Account Information</h1>
              <p className="text-muted-foreground">
                Manage your personal information and preferences
              </p>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={user?.name || ""}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue=""
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <Input id="birthdate" type="date" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                  <CardDescription>
                    Manage your email notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new products and promotions
                      </p>
                    </div>
                    <Switch id="marketing" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="orders">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your orders
                      </p>
                    </div>
                    <Switch id="orders" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly newsletter
                      </p>
                    </div>
                    <Switch id="newsletter" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h1 className="text-2xl font-bold">Your Orders</h1>
              <p className="text-muted-foreground">
                Track and manage your orders
              </p>

              <div className="mt-6 space-y-6">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <CardTitle className="text-base">
                            {order.id}
                          </CardTitle>
                          <CardDescription>{order.date}</CardDescription>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              order.status === "Delivered"
                                ? "default"
                                : "secondary"
                            }
                            className="font-normal"
                          >
                            {order.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.price}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Buy Again
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div>
                        <p className="text-sm font-medium">
                          Total: {order.total}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm">
                          Invoice
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Your Addresses</h1>
                  <p className="text-muted-foreground">
                    Manage your shipping and billing addresses
                  </p>
                </div>
                <Button>
                  <MapPin className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {addresses.map((address) => (
                  <Card key={address.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">
                            {address.name}
                          </CardTitle>
                          {address.isDefault && (
                            <Badge variant="outline" className="font-normal">
                              Default
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      {!address.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Payment Methods</h1>
                  <p className="text-muted-foreground">
                    Manage your payment methods
                  </p>
                </div>
                <Button>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">
                            {method.type} ending in {method.last4}
                          </CardTitle>
                          {method.isDefault && (
                            <Badge variant="outline" className="font-normal">
                              Default
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>Expires: {method.expiry}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h1 className="text-2xl font-bold">Notification Settings</h1>
              <p className="text-muted-foreground">
                Manage how you receive notifications
              </p>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Manage your mobile app notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-orders">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your orders
                      </p>
                    </div>
                    <Switch id="push-orders" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-promotions">Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about sales and promotions
                      </p>
                    </div>
                    <Switch id="push-promotions" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-stock">Back in Stock</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when items in your wishlist are
                        back in stock
                      </p>
                    </div>
                    <Switch id="push-stock" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>SMS Notifications</CardTitle>
                  <CardDescription>
                    Manage your text message notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-orders">Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages about your orders
                      </p>
                    </div>
                    <Switch id="sms-orders" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-promotions">Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive text messages about sales and promotions
                      </p>
                    </div>
                    <Switch id="sms-promotions" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h1 className="text-2xl font-bold">Security Settings</h1>
              <p className="text-muted-foreground">
                Manage your account security
              </p>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">
                        Enable Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a verification code via SMS when signing in from
                        a new device
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>
                    Manage your active login sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Current Session</h4>
                        <p className="text-sm text-muted-foreground">
                          Chrome on macOS • San Francisco, CA
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started May 9, 2024
                        </p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Mobile App</h4>
                        <p className="text-sm text-muted-foreground">
                          iPhone 13 • San Francisco, CA
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started May 7, 2024
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                  >
                    Sign Out All Devices
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
