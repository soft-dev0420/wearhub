import { getAllProducts } from "@/lib/db/queries/products";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getAllProducts();

  return NextResponse.json(products);
}
