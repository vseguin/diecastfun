import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { mapCars } from "../../../../utils/api";

type Response = {
  items: cars[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const car = await prisma.cars.findUnique({
    where: {
      id: String(req.query.id),
    },
  });

  if (!car) {
    return {
      notFound: true,
    };
  }

  const cars =
    (await prisma.$queryRaw`SELECT * FROM cars WHERE id != ${req.query.id} AND brand = ${car.brand} ORDER BY RAND() LIMIT 4;`) as cars[];
  res.status(200).json({ items: mapCars(cars) });
}
