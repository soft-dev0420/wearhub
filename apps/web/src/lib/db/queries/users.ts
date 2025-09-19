import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getAllUsers() {
  return await db.select().from(users);
}
