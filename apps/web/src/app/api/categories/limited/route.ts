import { getLimitedCategories } from "@/lib/db/queries/categories";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "4", 10);

  const categories = await getLimitedCategories(limit);

  return NextResponse.json(categories);
}
