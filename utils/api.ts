// @ts-nocheck
import { PrismaClient, Prisma } from "@prisma/client";

export const fetcher = (...args: any[]) =>
  fetch(...args).then((res) => res.json());

export const getGroupedByCars = async (
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  criteria: string
) => {
  const cars = await prisma.cars.groupBy({
    by: [criteria],
    _count: {
      _all: true,
    },
  });
  return Object.assign(
    {},
    ...cars.map((c) => ({ [c[criteria]]: c._count._all }))
  );
};

export const mapCarsWithThumbnails = (cars: Prisma.carsGetPayload<{}>[]) => {
  return cars.map((c) => {
    return {
      thumbnail: `${process.env.STORAGE_URL}/images/cars-small/${c.id}-1.jpg`,
      ...c,
    };
  });
};
