// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  ChevronRight,
  Star,
  Quote,
  Instagram,
  Twitter,
  Linkedin,
  Image,
  User,
  Group,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative">
        <div className="absolute inset-0 z-0">
          {/* <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="About ModernShop"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 mx-auto max-w-6xl py-24 text-white md:py-32">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">About</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl text-white/90">
              Founded in 2015, ModernShop has grown from a small boutique to a
              leading fashion destination. {"We're"}
              committed to quality, sustainability, and helping you express your
              unique style.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white hover:text-white"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At ModernShop, our mission is to provide high-quality,
                sustainable fashion that empowers individuals to express their
                unique style with confidence. We believe that fashion should be
                accessible, ethical, and a form of self-expression.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                {"We're"} committed to creating a shopping experience {"that's"}{" "}
                not just about buying clothes, but about discovering pieces that
                resonate with your personal style and values.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary p-1">
                    <ChevronRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quality First</h3>
                    <p className="text-muted-foreground">
                      We never compromise on quality. Each item in our
                      collection is carefully selected and tested to ensure it
                      meets our high standards.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary p-1">
                    <ChevronRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Sustainability</h3>
                    <p className="text-muted-foreground">
                      {"We're"} committed to reducing our environmental impact
                      through sustainable sourcing, eco-friendly packaging, and
                      ethical manufacturing practices.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary p-1">
                    <ChevronRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Inclusivity</h3>
                    <p className="text-muted-foreground">
                      Fashion is for everyone. We design and curate our
                      collections with diversity in mind, offering styles for
                      all body types, ages, and preferences.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-primary p-1">
                    <ChevronRight className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Customer Experience</h3>
                    <p className="text-muted-foreground">
                      We believe in creating meaningful relationships with our
                      customers through exceptional service, transparency, and
                      genuine care.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Our Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            From a small boutique to a leading fashion destination, our journey
            has been defined by growth, innovation, and a commitment to our
            values.
          </p>

          <div className="mt-16 space-y-12">
            {[
              {
                year: "2015",
                title: "The Beginning",
                description:
                  "ModernShop was founded as a small boutique in San Francisco with a curated collection of locally designed apparel.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                year: "2017",
                title: "Online Expansion",
                description:
                  "We launched our e-commerce platform, making our unique collection available to customers nationwide.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                year: "2019",
                title: "Sustainability Initiative",
                description:
                  "We introduced our sustainability pledge, committing to ethical sourcing and eco-friendly practices across our supply chain.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                year: "2021",
                title: "Global Reach",
                description:
                  "ModernShop expanded internationally, bringing our curated fashion to customers around the world.",
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                year: "2023",
                title: "Innovation & Growth",
                description:
                  "We launched our mobile app and opened our flagship store, enhancing the shopping experience for our customers.",
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((milestone, index) => (
              <div
                key={milestone.year}
                className={`flex flex-col gap-8 md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="overflow-hidden rounded-xl grid place-items-center h-[400px] w-full bg-black/20">
                    {/* <Image
                      src={milestone.image || "/placeholder.svg"}
                      alt={milestone.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    /> */}
                    <Image />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <div className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                    {milestone.year}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{milestone.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Meet Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Our diverse team of fashion experts, designers, and retail
            specialists work together to bring you the best shopping experience.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400",
                bio: "With over 15 years in fashion retail, Sarah founded ModernShop with a vision to create accessible, sustainable fashion.",
              },
              {
                name: "Michael Chen",
                role: "Creative Director",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Michael brings his unique design perspective and industry experience to curate our distinctive collections.",
              },
              {
                name: "Emma Williams",
                role: "Head of Sustainability",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Emma leads our sustainability initiatives, ensuring our products and practices align with our environmental values.",
              },
              {
                name: "David Rodriguez",
                role: "Chief Technology Officer",
                image: "/placeholder.svg?height=400&width=400",
                bio: "David oversees our digital platforms, creating seamless shopping experiences for our customers worldwide.",
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="aspect-square overflow-hidden grid place-items-center">
                  {/* <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  /> */}
                  <User />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Our Commitment to Sustainability
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                At ModernShop, sustainability {"isn't"} just a {"buzzword—it's"}{" "}
                a core part of our business model and values. We believe that
                fashion can be both beautiful and responsible.
              </p>
              <div className="mt-8 space-y-6">
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-bold">Ethical Sourcing</h3>
                  <p className="mt-2 text-muted-foreground">
                    We carefully select suppliers who share our commitment to
                    fair labor practices and ethical manufacturing. We regularly
                    audit our supply chain to ensure compliance with our
                    standards.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-bold">Eco-Friendly Materials</h3>
                  <p className="mt-2 text-muted-foreground">
                    We prioritize sustainable fabrics like organic cotton,
                    recycled polyester, and Tencel. By 2025, we aim to have 80%
                    of our collection made from sustainable materials.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-6">
                  <h3 className="font-bold">Reducing Waste</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our packaging is made from recycled and biodegradable
                    materials. {"We've"} also implemented a closed-loop system
                    to minimize waste in our production process.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="overflow-hidden rounded-xl grid place-items-center w-full bg-black/20 h-full">
                {/* <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Sustainability at ModernShop"
                  width={500}
                  height={600}
                  className="h-full w-full object-cover"
                /> */}
                <Image />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {"Don't"} just take our word for it. {"Here's"} what our customers
            have to say about their ModernShop experience.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jessica T.",
                location: "New York, NY",
                text: "ModernShop has completely transformed my wardrobe. The quality of their clothes is exceptional, and I love their commitment to sustainability. Customer service is top-notch too!",
                rating: 5,
              },
              {
                name: "Marcus L.",
                location: "Chicago, IL",
                text: "I've been shopping at ModernShop for over two years now, and I'm consistently impressed by their selection and quality. Their sizing is consistent, and the clothes last for years.",
                rating: 5,
              },
              {
                name: "Sophia R.",
                location: "Los Angeles, CA",
                text: "As someone who cares deeply about ethical fashion, I appreciate ModernShop's transparency about their sourcing and manufacturing. Plus, their designs are always on trend!",
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
                <div className="mt-4 flex-1">
                  <Quote className="h-8 w-8 text-muted-foreground/30" />
                  <p className="mt-2 text-muted-foreground">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>
                <div className="mt-6">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Our Partners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            We collaborate with leading brands and organizations that share our
            values and commitment to quality and sustainability.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center grid place-items-center"
                >
                  {/* <Image
                    src={`/placeholder.svg?height=80&width=160&text=Partner+${
                      index + 1
                    }`}
                    alt={`Partner ${index + 1}`}
                    width={160}
                    height={80}
                    className="max-h-16 w-auto grayscale transition-all duration-300 hover:grayscale-0"
                  /> */}
                  <Group />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Join the ModernShop Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/90">
              Be the first to know about new collections, exclusive offers, and
              events. Join our community of fashion enthusiasts and
              sustainability advocates.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-primary-foreground hover:text-primary-foreground"
                asChild
              >
                <Link href="/contact">
                  Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator />
    </div>
  );
}
