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

  const query = req.query.q
    ? {
        OR: [
          {
            model: {
              search: req.query.q,
            },
          },
          {
            brand: {
              search: req.query.q,
            },
          },
          {
            maker: {
              search: req.query.q,
            },
          },
          {
            color: {
              search: req.query.q,
            },
          },
        ],
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
