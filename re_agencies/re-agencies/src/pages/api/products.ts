import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const product = req.body;
        console.log("Received product data:", product); // Log the received product data

        // Ensure that all required fields are present
        if (
          !product.name ??
          !product.brandName ??
          !product.description ??
          !product.price ??
          !product.status
        ) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await prisma.product.upsert({
          where: { id: product.id ?? -1 },
          update: {
            name: product.name,
            brandName: product.brandName,
            description: product.description,
            price: product.price,
            images: product.images,
            status: product.status,
          },
          create: {
            name: product.name,
            brandName: product.brandName,
            description: product.description,
            price: product.price,
            images: product.images,
            status: product.status,
          },
        });

        console.log("Upsert result:", result); // Log the result of the upsert operation

        res.status(200).json(result);
      } catch (error) {
        console.error("Error upserting product:", error);
        res.status(500).json({ error: "Failed to upsert product" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        console.log("Received delete request for ID:", id); // Log the received ID for deletion

        if (!id) {
          return res.status(400).json({ error: "Invalid product ID" });
        }

        const result = await prisma.product.delete({
          where: { id },
        });

        console.log("Delete result:", result); // Log the result of the delete operation

        res.status(200).json(result);
      } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
