"use client";

import { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  ArrowUpDown,
  Shirt,
} from "lucide-react";
import { useCart, useFavorites } from "@/lib/store";

// Sample product data
const products = [
  {
    id: "prod-1",
    name: "Slim Fit Cotton Shirt",
    price: "$59.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.8,
    category: "men",
    subcategory: "shirts",
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
  {
    id: "prod-2",
    name: "Premium Denim Jeans",
    price: "$89.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.7,
    category: "men",
    subcategory: "pants",
    colors: ["blue", "black", "gray"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
    isSale: false,
  },
  {
    id: "prod-3",
    name: "Casual Knit Sweater",
    price: "$69.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.9,
    category: "women",
    subcategory: "sweaters",
    colors: ["beige", "gray", "black"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: "prod-4",
    name: "Leather Crossbody Bag",
    price: "$129.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.6,
    category: "accessories",
    subcategory: "bags",
    colors: ["brown", "black", "tan"],
    sizes: [],
    isNew: false,
    isSale: true,
  },
  {
    id: "prod-5",
    name: "Floral Print Dress",
    price: "$79.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.5,
    category: "women",
    subcategory: "dresses",
    colors: ["floral", "blue", "red"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isSale: true,
  },
  {
    id: "prod-6",
    name: "Classic Oxford Shoes",
    price: "$149.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.8,
    category: "men",
    subcategory: "shoes",
    colors: ["brown", "black"],
    sizes: ["8", "9", "10", "11", "12"],
    isNew: false,
    isSale: false,
  },
  {
    id: "prod-7",
    name: "Wool Blend Coat",
    price: "$199.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.9,
    category: "women",
    subcategory: "outerwear",
    colors: ["camel", "black", "gray"],
    sizes: ["S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: "prod-8",
    name: "Stainless Steel Watch",
    price: "$179.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.7,
    category: "accessories",
    subcategory: "watches",
    colors: ["silver", "gold", "black"],
    sizes: [],
    isNew: false,
    isSale: false,
  },
  {
    id: "prod-9",
    name: "Graphic Print T-Shirt",
    price: "$34.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.5,
    category: "men",
    subcategory: "t-shirts",
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
  },
  {
    id: "prod-10",
    name: "High-Waisted Jeans",
    price: "$79.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.6,
    category: "women",
    subcategory: "pants",
    colors: ["blue", "black", "white"],
    sizes: ["24", "26", "28", "30"],
    isNew: false,
    isSale: false,
  },
  {
    id: "prod-11",
    name: "Leather Wallet",
    price: "$49.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.8,
    category: "accessories",
    subcategory: "wallets",
    colors: ["brown", "black"],
    sizes: [],
    isNew: false,
    isSale: false,
  },
  {
    id: "prod-12",
    name: "Polarized Sunglasses",
    price: "$89.99",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
    rating: 4.7,
    category: "accessories",
    subcategory: "eyewear",
    colors: ["black", "tortoise", "clear"],
    sizes: [],
    isNew: true,
    isSale: false,
  },
];

// Categories data
const categories = [
  {
    id: "women",
    name: "Women",
    subcategories: [
      { id: "dresses", name: "Dresses" },
      { id: "tops", name: "Tops" },
      { id: "sweaters", name: "Sweaters" },
      { id: "pants", name: "Pants & Jeans" },
      { id: "skirts", name: "Skirts" },
      { id: "outerwear", name: "Outerwear" },
      { id: "activewear", name: "Activewear" },
    ],
  },
  {
    id: "men",
    name: "Men",
    subcategories: [
      { id: "shirts", name: "Shirts" },
      { id: "t-shirts", name: "T-Shirts" },
      { id: "sweaters", name: "Sweaters" },
      { id: "pants", name: "Pants & Jeans" },
      { id: "outerwear", name: "Outerwear" },
      { id: "activewear", name: "Activewear" },
      { id: "shoes", name: "Shoes" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    subcategories: [
      { id: "bags", name: "Bags" },
      { id: "wallets", name: "Wallets" },
      { id: "jewelry", name: "Jewelry" },
      { id: "watches", name: "Watches" },
      { id: "eyewear", name: "Eyewear" },
      { id: "hats", name: "Hats & Scarves" },
      { id: "belts", name: "Belts" },
    ],
  },
  {
    id: "shoes",
    name: "Shoes",
    subcategories: [
      { id: "womens-shoes", name: "Women's Shoes" },
      { id: "mens-shoes", name: "Men's Shoes" },
      { id: "sneakers", name: "Sneakers" },
      { id: "boots", name: "Boots" },
      { id: "sandals", name: "Sandals" },
      { id: "heels", name: "Heels" },
      { id: "flats", name: "Flats" },
    ],
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { addItem: addToCart } = useCart();
  const {
    addItem: addToFavorites,
    removeItem: removeFromFavorites,
    isFavorite,
  } = useFavorites();

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (activeCategory !== "all" && product.category !== activeCategory) {
      return false;
    }

    // Filter by subcategory
    if (activeSubcategory && product.subcategory !== activeSubcategory) {
      return false;
    }

    // Filter by price range
    const price = Number.parseFloat(product.price.replace("$", ""));
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number.parseFloat(a.price.replace("$", ""));
    const priceB = Number.parseFloat(b.price.replace("$", ""));

    switch (sortBy) {
      case "price-low-high":
        return priceA - priceB;
      case "price-high-low":
        return priceB - priceA;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default:
        return 0;
    }
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
        <span className="font-medium">Shop</span>
        {activeCategory !== "all" && (
          <>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium capitalize">{activeCategory}</span>
          </>
        )}
        {activeSubcategory && (
          <>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium capitalize">
              {activeSubcategory.replace("-", " ")}
            </span>
          </>
        )}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop Our Collection</h1>
        <p className="mt-2 text-muted-foreground">
          Discover our curated selection of premium fashion items for every
          style and occasion.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Button
                    variant={activeCategory === "all" ? "secondary" : "ghost"}
                    className="w-full justify-start px-2"
                    onClick={() => {
                      setActiveCategory("all");
                      setActiveSubcategory("");
                    }}
                  >
                    All Categories
                  </Button>
                </div>
                {categories.map((category) => (
                  <Accordion key={category.id} type="single" collapsible>
                    <AccordionItem value={category.id} className="border-none">
                      <AccordionTrigger className="py-1 hover:no-underline max-w-9/10">
                        <div
                          className={`${buttonVariants({
                            variant:
                              activeCategory === category.id
                                ? "secondary"
                                : "ghost",
                          })} w-full justify-start px-2 cursor-pointer`}
                          onClick={() => {
                            setActiveCategory(category.id);
                            setActiveSubcategory("");
                          }}
                        >
                          {category.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <Button
                              key={subcategory.id}
                              variant={
                                activeSubcategory === subcategory.id
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start px-2 text-sm"
                              onClick={() => {
                                setActiveCategory(category.id);
                                setActiveSubcategory(subcategory.id);
                              }}
                            >
                              {subcategory.name}
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Price Range</h3>
              <Slider
                defaultValue={[0, 200]}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="mt-2 flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Colors</h3>
              <div className="space-y-2">
                {[
                  "black",
                  "white",
                  "blue",
                  "red",
                  "green",
                  "brown",
                  "gray",
                ].map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox id={`color-${color}`} />
                    <Label htmlFor={`color-${color}`} className="capitalize">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Size</h3>
              <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="size-all" />
                  <Label htmlFor="size-all">All Sizes</Label>
                </div>
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={size.toLowerCase()}
                      id={`size-${size.toLowerCase()}`}
                    />
                    <Label htmlFor={`size-${size.toLowerCase()}`}>{size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Product Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" defaultChecked />
                  <Label htmlFor="in-stock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="on-sale" />
                  <Label htmlFor="on-sale">On Sale</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="new-arrivals" />
                  <Label htmlFor="new-arrivals">New Arrivals</Label>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setActiveCategory("all");
                setActiveSubcategory("");
                setPriceRange([0, 200]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between lg:hidden">
          <Button variant="outline" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-md border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none border-r"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>
          </div>
        </div>

        {filtersOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background p-6 lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setFiltersOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
              <Tabs defaultValue="categories">
                <TabsList className="w-full">
                  <TabsTrigger value="categories" className="flex-1">
                    Categories
                  </TabsTrigger>
                  <TabsTrigger value="filters" className="flex-1">
                    Filters
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="categories" className="mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Button
                        variant={
                          activeCategory === "all" ? "secondary" : "ghost"
                        }
                        className="w-full justify-start px-2"
                        onClick={() => {
                          setActiveCategory("all");
                          setActiveSubcategory("");
                        }}
                      >
                        All Categories
                      </Button>
                    </div>
                    {categories.map((category) => (
                      <Accordion key={category.id} type="single" collapsible>
                        <AccordionItem
                          value={category.id}
                          className="border-none"
                        >
                          <AccordionTrigger className="py-1 hover:no-underline">
                            <Button
                              variant={
                                activeCategory === category.id
                                  ? "secondary"
                                  : "ghost"
                              }
                              className="w-full justify-start px-2"
                              onClick={() => {
                                setActiveCategory(category.id);
                                setActiveSubcategory("");
                              }}
                            >
                              {category.name}
                            </Button>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="ml-4 space-y-1">
                              {category.subcategories.map((subcategory) => (
                                <Button
                                  key={subcategory.id}
                                  variant={
                                    activeSubcategory === subcategory.id
                                      ? "secondary"
                                      : "ghost"
                                  }
                                  className="w-full justify-start px-2 text-sm"
                                  onClick={() => {
                                    setActiveCategory(category.id);
                                    setActiveSubcategory(subcategory.id);
                                  }}
                                >
                                  {subcategory.name}
                                </Button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="filters" className="mt-4 space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Price Range</h3>
                    <Slider
                      defaultValue={[0, 200]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Colors</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "black",
                        "white",
                        "blue",
                        "red",
                        "green",
                        "brown",
                        "gray",
                      ].map((color) => (
                        <div
                          key={color}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`mobile-color-${color}`} />
                          <Label
                            htmlFor={`mobile-color-${color}`}
                            className="capitalize"
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Size</h3>
                    <RadioGroup defaultValue="all">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="mobile-size-all" />
                          <Label htmlFor="mobile-size-all">All Sizes</Label>
                        </div>
                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                          <div
                            key={size}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={size.toLowerCase()}
                              id={`mobile-size-${size.toLowerCase()}`}
                            />
                            <Label
                              htmlFor={`mobile-size-${size.toLowerCase()}`}
                            >
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Product Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-in-stock" defaultChecked />
                        <Label htmlFor="mobile-in-stock">In Stock</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-on-sale" />
                        <Label htmlFor="mobile-on-sale">On Sale</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-new-arrivals" />
                        <Label htmlFor="mobile-new-arrivals">
                          New Arrivals
                        </Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSubcategory("");
                  setPriceRange([0, 200]);
                }}
              >
                Reset
              </Button>
              <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium">{sortedProducts.length}</span>{" "}
                products
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm">
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none border-r"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
                    {/* <Image
                      src={product.image || "/placeholder.svg"}
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
                    {product.isNew && (
                      <div className="absolute left-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        New
                      </div>
                    )}
                    {product.isSale && (
                      <div className="absolute left-4 top-4 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Sale
                      </div>
                    )}
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
                      <span className="font-bold">{product.price}</span>
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
          )}

          {viewMode === "list" && (
            <div className="space-y-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-xl border bg-card sm:flex-row"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-muted sm:w-48 sm:rounded-l-xl sm:rounded-tr-none">
                    {/* <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    /> */}
                    <Shirt className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-120 transition-all" />
                    {product.isNew && (
                      <div className="absolute left-4 top-4 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        New
                      </div>
                    )}
                    {product.isSale && (
                      <div className="absolute left-4 top-4 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white">
                        Sale
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="ml-1 text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod, diam quis aliquam ultricies.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="rounded-full border px-2 py-1 text-xs font-medium capitalize text-muted-foreground"
                        >
                          {color}
                        </div>
                      ))}
                      {product.sizes.length > 0 &&
                        product.sizes.map((size) => (
                          <div
                            key={size}
                            className="rounded-full border px-2 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {size}
                          </div>
                        ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="text-lg font-bold">{product.price}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleToggleFavorite(product)}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              isFavorite(product.id)
                                ? "fill-primary text-primary"
                                : ""
                            }`}
                          />
                          {isFavorite(product.id) ? "Saved" : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sortedProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
                  <ArrowUpDown className="h-4 w-4 rotate-90" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  4
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowUpDown className="h-4 w-4 -rotate-90" />
                  <span className="sr-only">Next page</span>
                </Button>
              </nav>
            </div>
          )}

          {sortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No products found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters or search criteria to find what{" "}
                {"you're"} looking for.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveSubcategory("");
                  setPriceRange([0, 200]);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
