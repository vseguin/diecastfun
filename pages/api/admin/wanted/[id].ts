import type { NextApiRequest, NextApiResponse } from "next";
import authenticate from "../../../../lib/middlewares/authentication";
import prisma from "../../../../lib/prisma";

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "DELETE") {
    const wantedEntry = await prisma.wanted_cars.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    if (!wantedEntry) {
      res.status(404).end();
      return;
    }

    await prisma.wanted_cars.delete({
      where: {
        id: req.query.id as string,
      },
    });
    res.status(204).end();
  }
};

export default authenticate(handler);
