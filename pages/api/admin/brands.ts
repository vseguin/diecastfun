import { brands } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import Joi from "joi";
import authenticate from "../../../lib/middlewares/authentication";
import validate from "../../../lib/middlewares/validation";

type Response = brands;

const schema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().required(),
});

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const brand = await prisma.brands.create({
      data: {
        name: req.body.name,
        country: req.body.country,
      },
    });
    res.status(200).json(brand);
  }
};

export default authenticate(validate({ body: schema }, handler));
