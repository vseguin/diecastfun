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

  if (req.query.maker) {
    queries.push({
      maker: {
        equals: req.query.maker,
      },
    });
  }

  if (req.query.era) {
    queries.push({
      era: {
        equals: req.query.era,
      },
    });
  }

  if (req.query.category) {
    queries.push({
      tags: {
        some: {
          tags: req.query.category,
        },
      },
    });
  }

  if (req.query.q) {
    const words = req.query.q.split(" ");
    const wordQueries = [];
    words.forEach((w) => {
      const queries = [
        {
          model: {
            contains: w,
          },
        },
        {
          brand: {
            contains: w,
          },
        },
        {
          maker: {
            contains: w,
          },
        },
        {
          color: {
            contains: w,
          },
        },
      ];

      wordQueries.push({
        OR: queries,
      });
    });
    console.log(words);
    queries.push({
      AND: wordQueries,
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
