import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

type Response = {
  items: cars[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const cars =
    (await prisma.$queryRaw`SELECT * FROM cars ORDER BY levenshtein(${req.query.id}, id) ASC LIMIT 4;`) as cars[];
  res.status(200).json({ items: cars });
}
