import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import validate from "../../../lib/middlewares/validation";

type Response = cars;

const generateId = async ({
  brand,
  model,
}: {
  brand: string;
  model: string;
}): Promise<string> => {
  const count = await prisma.cars.count({
    where: {
      AND: [
        {
          brand: {
            equals: brand,
          },
        },
        {
          model: {
            equals: model,
          },
        },
      ],
    },
  });

  const id =
    brand.toLowerCase() + model.toLowerCase() + (count === 0 ? "" : count);
  return id.replaceAll("/", "").replaceAll(" ", "").replaceAll(".", "");
};

const schema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  maker: Joi.string().required(),
  era: Joi.string().required(),
  color: Joi.string().required(),
  scale: Joi.string(),
  customized: Joi.boolean(),
  restored: Joi.boolean(),
  tags: Joi.array().items(Joi.string()).required(),
});

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const id = await generateId(req.body);
    const tags = req.body.tags.map((t: string) => {
      return {
        tags: t,
      };
    });

    const car = await prisma.cars.create({
      include: {
        tags: true,
      },
      data: Object.assign({}, req.body, {
        id,
        insertion_date: new Date(),
        count: 0, // TODO, remove when old app is unplugged
        scale: req.body.scale || "1:64",
        customized: req.body.customized || false,
        restored: req.body.restored || false,
        tags: {
          create: tags,
        },
      }),
    });
    res.status(200).json(car);
  }
};

export default validate({ body: schema }, handler);
