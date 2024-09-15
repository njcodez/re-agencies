import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid ID' });
        return;
      }
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
