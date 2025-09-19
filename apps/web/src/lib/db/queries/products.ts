import { db } from "@/lib/db";

export async function getLimitedProducts(limit = 20) {
  return await db.query.products.findMany({
    with: {
      images: true,
    },
    limit,
  });
}

export async function getAllProducts() {
  return await db.query.products.findMany({
    with: {
      images: true,
    },
  });
}

export async function getPaginatedProducts({ limit = 20, offset = 0 }) {
  return await db.query.products.findMany({
    with: {
      images: true,
    },
    limit,
    offset,
  });
}
