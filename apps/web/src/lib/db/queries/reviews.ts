import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";

export async function getAllReviews() {
  return await db.select().from(reviews);
}
