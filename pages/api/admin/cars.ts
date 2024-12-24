import { cars } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import Joi from "joi";
import authenticate from "../../../lib/middlewares/authentication";
import validate from "../../../lib/middlewares/validation";

type Response = cars;

const generateId = async ({
  brand,
  model,
  year,
}: {
  brand: string;
  model: string;
  year: string;
}): Promise<string> => {
  const id = `${brand.toLowerCase()}${model.toLowerCase()}${year || ""}`
    .replaceAll("/", "")
    .replaceAll(" ", "")
    .replaceAll(".", "");

  const count = await prisma.cars.count({
    where: {
      id: {
        startsWith: id,
      },
    },
  });

  return `${id}${count === 0 ? "" : count}`;
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
  year: Joi.string(),
});

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method === "POST") {
    const id = await generateId(req.body);
    const tags = req.body.tags.map((t: string) => {
      return {
        tags: t,
      };
    });

    const brand = await prisma.brands.findUnique({
      where: {
        name: req.body.brand,
      },
    });
    if (!brand) {
      res.status(400).end();
      return;
    }

    const maker = await prisma.makers.findUnique({
      where: {
        name: req.body.maker,
      },
    });
    if (!maker) {
      await prisma.makers.create({
        data: {
          name: req.body.maker,
        },
      });
    }

    const car = await prisma.cars.create({
      include: {
        tags: true,
      },
      data: Object.assign({}, req.body, {
        id,
        insertion_date: new Date(),
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

export default authenticate(validate({ body: schema }, handler));
