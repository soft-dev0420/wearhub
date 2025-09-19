import Link from "next/link";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, ArrowRight, Grid } from "lucide-react";

// Categories data
const categories = [
  {
    id: "women",
    name: "Women",
    description: "Elegant and contemporary styles for the modern woman",
    image: "/placeholder.svg?height=600&width=800&text=Women",
    featured: "New Spring Collection",
    subcategories: [
      {
        id: "dresses",
        name: "Dresses",
        image: "/placeholder.svg?height=300&width=300&text=Dresses",
      },
      {
        id: "tops",
        name: "Tops",
        image: "/placeholder.svg?height=300&width=300&text=Tops",
      },
      {
        id: "sweaters",
        name: "Sweaters",
        image: "/placeholder.svg?height=300&width=300&text=Sweaters",
      },
      {
        id: "pants",
        name: "Pants & Jeans",
        image: "/placeholder.svg?height=300&width=300&text=Pants",
      },
      {
        id: "skirts",
        name: "Skirts",
        image: "/placeholder.svg?height=300&width=300&text=Skirts",
      },
      {
        id: "outerwear",
        name: "Outerwear",
        image: "/placeholder.svg?height=300&width=300&text=Outerwear",
      },
      {
        id: "activewear",
        name: "Activewear",
        image: "/placeholder.svg?height=300&width=300&text=Activewear",
      },
    ],
  },
  {
    id: "men",
    name: "Men",
    description: "Refined essentials and statement pieces for the modern man",
    image: "/placeholder.svg?height=600&width=800&text=Men",
    featured: "Summer Essentials",
    subcategories: [
      {
        id: "shirts",
        name: "Shirts",
        image: "/placeholder.svg?height=300&width=300&text=Shirts",
      },
      {
        id: "t-shirts",
        name: "T-Shirts",
        image: "/placeholder.svg?height=300&width=300&text=T-Shirts",
      },
      {
        id: "sweaters",
        name: "Sweaters",
        image: "/placeholder.svg?height=300&width=300&text=Sweaters",
      },
      {
        id: "pants",
        name: "Pants & Jeans",
        image: "/placeholder.svg?height=300&width=300&text=Pants",
      },
      {
        id: "outerwear",
        name: "Outerwear",
        image: "/placeholder.svg?height=300&width=300&text=Outerwear",
      },
      {
        id: "activewear",
        name: "Activewear",
        image: "/placeholder.svg?height=300&width=300&text=Activewear",
      },
      {
        id: "shoes",
        name: "Shoes",
        image: "/placeholder.svg?height=300&width=300&text=Shoes",
      },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Elevate your look with our curated selection of accessories",
    image: "/placeholder.svg?height=600&width=800&text=Accessories",
    featured: "Statement Pieces",
    subcategories: [
      {
        id: "bags",
        name: "Bags",
        image: "/placeholder.svg?height=300&width=300&text=Bags",
      },
      {
        id: "wallets",
        name: "Wallets",
        image: "/placeholder.svg?height=300&width=300&text=Wallets",
      },
      {
        id: "jewelry",
        name: "Jewelry",
        image: "/placeholder.svg?height=300&width=300&text=Jewelry",
      },
      {
        id: "watches",
        name: "Watches",
        image: "/placeholder.svg?height=300&width=300&text=Watches",
      },
      {
        id: "eyewear",
        name: "Eyewear",
        image: "/placeholder.svg?height=300&width=300&text=Eyewear",
      },
      {
        id: "hats",
        name: "Hats & Scarves",
        image: "/placeholder.svg?height=300&width=300&text=Hats",
      },
      {
        id: "belts",
        name: "Belts",
        image: "/placeholder.svg?height=300&width=300&text=Belts",
      },
    ],
  },
  {
    id: "shoes",
    name: "Shoes",
    description: "Step out in style with our premium footwear collection",
    image: "/placeholder.svg?height=600&width=800&text=Shoes",
    featured: "Trending Footwear",
    subcategories: [
      {
        id: "womens-shoes",
        name: "Women's Shoes",
        image: "/placeholder.svg?height=300&width=300&text=Women's+Shoes",
      },
      {
        id: "mens-shoes",
        name: "Men's Shoes",
        image: "/placeholder.svg?height=300&width=300&text=Men's+Shoes",
      },
      {
        id: "sneakers",
        name: "Sneakers",
        image: "/placeholder.svg?height=300&width=300&text=Sneakers",
      },
      {
        id: "boots",
        name: "Boots",
        image: "/placeholder.svg?height=300&width=300&text=Boots",
      },
      {
        id: "sandals",
        name: "Sandals",
        image: "/placeholder.svg?height=300&width=300&text=Sandals",
      },
      {
        id: "heels",
        name: "Heels",
        image: "/placeholder.svg?height=300&width=300&text=Heels",
      },
      {
        id: "flats",
        name: "Flats",
        image: "/placeholder.svg?height=300&width=300&text=Flats",
      },
    ],
  },
];

// Collections data
const collections = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    description: "The latest additions to our collection",
    image: "/placeholder.svg?height=600&width=800&text=New+Arrivals",
  },
  {
    id: "bestsellers",
    name: "Bestsellers",
    description: "Our most popular items loved by customers",
    image: "/placeholder.svg?height=600&width=800&text=Bestsellers",
  },
  {
    id: "summer-collection",
    name: "Summer Collection",
    description: "Light and breezy styles for warm weather",
    image: "/placeholder.svg?height=600&width=800&text=Summer+Collection",
  },
  {
    id: "sustainable",
    name: "Sustainable Edit",
    description: "Eco-friendly fashion for conscious consumers",
    image: "/placeholder.svg?height=600&width=800&text=Sustainable+Edit",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto max-w-7xl py-12">
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Categories</span>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Shop by Category</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Explore our wide range of categories and find exactly what {"you're"}
          looking for. From the latest fashion trends to timeless classics, we
          have something for everyone.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.id}`}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              /> */}
              <Grid className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-bold text-white">
                  {category.name}
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Explore Categories
        </h2>
        <Tabs defaultValue="women">
          <TabsList className="mb-8 w-full justify-start overflow-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="min-w-[100px]"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-xl">
                  {/* <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  /> */}
                  <Grid className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
                  <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/70 to-transparent p-8">
                    <h3 className="text-3xl font-bold text-white">
                      {category.featured}
                    </h3>
                    <p className="mt-2 text-white/80">
                      Discover the latest trends in{" "}
                      {category.name.toLowerCase()}
                      {"'s"} fashion
                    </p>
                    <Button className="mt-4 gap-2" asChild>
                      <Link href={`/shop?category=${category.id}`}>
                        Shop Now <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-medium">
                    Popular in {category.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {category.subcategories.slice(0, 6).map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/shop?category=${category.id}&subcategory=${subcategory.id}`}
                        className="group"
                      >
                        <div className="bg-black/20 overflow-hidden rounded-lg grid place-items-center h-[300px]">
                          {/* <Image
                            src={subcategory.image || "/placeholder.svg"}
                            alt={subcategory.name}
                            width={300}
                            height={300}
                            className="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          /> */}
                          <Grid className="group-hover:scale-120 transition-all" />
                        </div>
                        <p className="mt-2 text-center text-sm font-medium">
                          {subcategory.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <Link href={`/shop?category=${category.id}`}>
                        View All {category.name} Categories
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Featured Collections
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Card
              key={collection.id}
              className="overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                /> */}
                <Grid className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{collection.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/shop?collection=${collection.id}`}>
                    Shop Collection
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="relative overflow-hidden rounded-xl">
          {/* <Image
            src="/placeholder.svg?height=600&width=1600&text=Summer+Collection"
            alt="Summer Collection"
            width={1600}
            height={600}
            className="h-[400px] w-full object-cover"
          /> */}
          <Grid className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center">
            <h2 className="text-4xl font-bold text-white">
              Summer Collection 2024
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Discover our latest summer styles designed for comfort and
              elegance in the warm weather.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/shop?collection=summer-collection">
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="mb-8 text-center text-3xl font-bold">All Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.flatMap((category) =>
            category.subcategories.map((subcategory) => (
              <Link
                key={`${category.id}-${subcategory.id}`}
                href={`/shop?category=${category.id}&subcategory=${subcategory.id}`}
                className="group flex flex-col items-center"
              >
                <div className="overflow-hidden rounded-full grid place-items-center h-[150px] w-[150px] bg-black/20">
                  {/* <Image
                    src={subcategory.image || "/placeholder.svg"}
                    alt={subcategory.name}
                    width={150}
                    height={150}
                    className="h-[150px] w-[150px] object-cover transition-transform duration-300 group-hover:scale-105"
                  /> */}
                  <Grid className="group-hover:scale-120 transition-all" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-medium">{subcategory.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="mt-20 rounded-xl bg-muted p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold md:text-3xl">
          {"Can't"} Find What {"You're"} Looking For?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Our customer service team is here to help you find exactly what you
          need. Contact us for personalized assistance.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
