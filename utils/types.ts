import { Prisma } from "@prisma/client";

export type Car = Prisma.carsGetPayload<{}> & {
  thumbnail: string;
};
