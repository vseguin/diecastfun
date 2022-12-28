import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Response = {
  items: cars[];
  total: Number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const per = Number(req.query.per || 25);
  const page = Number(req.query.page || 0);

  const queries = [];

  if (req.query.brand) {
    queries.push({
      brand: {
        equals: req.query.brand,
      },
    });
  }

  if (req.query.q) {
    queries.push({
      OR: [
        {
          model: {
            contains: req.query.q,
          },
        },
        {
          brand: {
            contains: req.query.q,
          },
        },
        {
          maker: {
            contains: req.query.q,
          },
        },
        {
          color: {
            contains: req.query.q,
          },
        },
      ],
    });
  }

  const query =
    queries.length > 0
      ? {
          AND: queries,
        }
      : {};

  const cars = await prisma.cars.findMany({
    where: query,
    skip: page * per,
    take: per,
  });
  const count = await prisma.cars.count({
    where: query,
  });

  res.status(200).json({ items: cars, total: count });
}
