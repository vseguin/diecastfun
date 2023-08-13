import { Prisma } from "@prisma/client";

export type Car = Prisma.carsGetPayload<{}> & {
  images: string[];
  tags: Prisma.tagsGetPayload<{}>[];
  thumbnail: string;
};
