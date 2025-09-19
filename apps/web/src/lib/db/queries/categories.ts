import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export async function getLimitedCategories(limit = 20) {
  return await db.select().from(categories).limit(limit);
}

export async function getAllCategories() {
  return await db.select().from(categories);
}
