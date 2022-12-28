import { wanted_cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import validate from "../../../lib/middlewares/validation";

type Response = wanted_cars;

const schema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  maker: Joi.string().required(),
});

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const wanted = await prisma.wanted_cars.create({
      data: {
        id: uuidv4(),
        brand: req.body.brand,
        model: req.body.model,
        maker: req.body.maker,
      },
    });
    res.status(200).json(wanted);
  } else if (req.method === "DELETE") {
    await prisma.wanted_cars.delete({
      where: {
        id: req.query.id as string,
      },
    });
    res.status(204).end;
  }
};

export default validate({ body: schema }, handler);
