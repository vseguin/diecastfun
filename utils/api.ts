import { PrismaClient, Prisma } from "@prisma/client";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
