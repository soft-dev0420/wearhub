"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your server
    setFormSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      // Reset form fields here if needed
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 3000);
  };

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
        <span className="font-medium">Contact</span>
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

      <div className="text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Have questions about our products, orders, or need assistance?{" "}
          {"We're"}
          here to help. Reach out to our team and
          {"we'll"} get back to you as soon as possible.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-2">Email Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              For general inquiries and support
            </p>
            <p className="mt-1 font-medium">support@modernshop.com</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <a href="mailto:support@modernshop.com">Send Email</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-2">Call Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
            <p className="mt-1 font-medium">+1 (555) 123-4567</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <a href="tel:+15551234567">Call Now</a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="mt-2">Visit Us</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Our flagship store</p>
            <p className="mt-1 font-medium">
              123 Fashion Street, San Francisco, CA 94105
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below and {"we'll"} get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={5} className="mt-1" />
            </div>
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={formSubmitted}
            >
              {formSubmitted ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Message Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Store Location</h2>
          <p className="mt-2 text-muted-foreground">
            Visit our flagship store in San Francisco
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border">
            <div className="aspect-video w-full bg-muted grid place-items-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="p-6">
              <h3 className="font-medium">ModernShop Flagship Store</h3>
              <p className="text-sm text-muted-foreground">
                123 Fashion Street, San Francisco, CA 94105
              </p>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Store Hours</h4>
                    <div className="mt-1 grid grid-cols-2 gap-x-4 text-sm">
                      <p>Monday - Friday</p>
                      <p>10:00 AM - 9:00 PM</p>
                      <p>Saturday</p>
                      <p>10:00 AM - 8:00 PM</p>
                      <p>Sunday</p>
                      <p>11:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Store Phone</h4>
                    <p className="mt-1 text-sm">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-bold">Follow Us</h2>
          <p className="mt-2 text-muted-foreground">
            Stay connected with us on social media
          </p>

          <div className="mt-4 flex space-x-4">
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-2 text-muted-foreground">
          Find answers to common questions about our products and services
        </p>

        <Accordion type="single" collapsible className="mt-6 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What are your shipping options and costs?
            </AccordionTrigger>
            <AccordionContent>
              We offer standard shipping (3-5 business days) for $5.99 or free
              on orders over $100. Express shipping (1-2 business days) is
              available for $19.99. International shipping varies by location
              and is calculated at checkout.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 30 days of purchase for a full refund.
              Items must be unworn, unwashed, and with original tags attached.
              Return shipping is free for domestic orders. Exchanges can be
              processed online or in-store.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, {"you'll"} receive a confirmation email
              with tracking information. You can also track your order by
              logging into your account and viewing your order history. Please
              allow 24 hours for tracking information to update after receiving
              your shipping confirmation.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Do you offer international shipping?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we ship to most countries worldwide. International shipping
              rates and delivery times vary by location. Please note that
              customers are responsible for any customs fees, duties, or taxes
              imposed by their {"country's"} regulations.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How do I find my size?</AccordionTrigger>
            <AccordionContent>
              We provide detailed size guides for all our products. You can find
              the size guide on each product page. Measurements are provided in
              both inches and centimeters. If {"you're"} between sizes, we
              generally recommend sizing up for a more comfortable fit.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
