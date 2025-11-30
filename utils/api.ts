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
  criteria: string,
) => {
  const cars = await prisma.cars.groupBy({
    by: [criteria],
    _count: {
      _all: true,
    },
  });
  return Object.assign(
    {},
    ...cars.map((c) => ({ [c[criteria]]: c._count._all })),
  );
};

export const mapCar = (car: Prisma.carsGetPayload<{}>) => {
  const encodedId = encodeURIComponent(car.id);
  return {
    images: [
      `/images/cars/${encodedId}-1.jpg`,
      `/images/cars/${encodedId}-2.jpg`,
      `/images/cars/${encodedId}-3.jpg`,
    ],
    thumbnail: `${process.env.STORAGE_URL}/images/cars-small/${encodedId}-1.jpg`,
    ...car,
  };
};

export const mapCars = (cars: Prisma.carsGetPayload<{}>[]) => {
  return cars.map((c) => mapCar(c));
};
