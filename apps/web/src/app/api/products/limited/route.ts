import { getLimitedProducts } from "@/lib/db/queries/products";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const products = await getLimitedProducts(limit);

  return NextResponse.json(products);
}
