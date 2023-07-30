import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

type Response = {
  items: cars[];
  page: Number;
  per: Number;
  total: Number;
};

const getThumbnailUrl = (id: string) => {
  return `${process.env.STORAGE_URL}/images/cars-small/${id}-1.jpg`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const per = Number(req.query.per || 24);
  const page = Number(req.query.page || 0);

  const queries = [];

  if (req.query.brand) {
    queries.push({
      brand: {
        equals: req.query.brand as string,
      },
    });
  }

  if (req.query.customized) {
    queries.push({
      customized: {
        equals: true,
      },
    });
  }

  if (req.query.restored) {
    queries.push({
      restored: {
        equals: true,
      },
    });
  }

  if (req.query.maker) {
    queries.push({
      maker: {
        equals: req.query.maker as string,
      },
    });
  }

  if (req.query.era) {
    queries.push({
      era: {
        equals: req.query.era as string,
      },
    });
  }

  if (req.query.category) {
    queries.push({
      tags: {
        some: {
          tags: req.query.category as string,
        },
      },
    });
  }

  if (req.query.q) {
    const words = (req.query.q as string).split(" ");
    const wordQueries: {
      OR: (
        | {
            model: { contains: any };
            brand?: undefined;
            maker?: undefined;
            color?: undefined;
          }
        | {
            brand: { contains: any };
            model?: undefined;
            maker?: undefined;
            color?: undefined;
          }
        | {
            maker: { contains: any };
            model?: undefined;
            brand?: undefined;
            color?: undefined;
          }
        | {
            color: { contains: any };
            model?: undefined;
            brand?: undefined;
            maker?: undefined;
          }
      )[];
    }[] = [];
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

  let cars = await prisma.cars.findMany({
    include: {
      tags: true,
    },
    where: query,
    skip: page * per,
    take: per,
  });
  const count = await prisma.cars.count({
    where: query,
  });

  cars = cars.map((c) => {
    return {
      thumbnail: getThumbnailUrl(c.id),
      ...c,
    };
  });

  res.status(200).json({ items: cars, per, page, total: count });
}
