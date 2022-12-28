import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Brand = Prisma.brandsGetPayload<{}> & {
  count: Number;
};

type Props = {
  brands: Brand[];
};

export default function Brands({ brands }: Props) {
  return (
    <div>
      {brands.map((brand) => {
        return (
          <div key={brand.name}>
            <Link href={`/cars?brand=${brand.name}`}>{brand.name}</Link>
            <div>{brand.count.toString()}</div>
            <div>{brand.country}</div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const brands = await prisma.brands.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const cars = await prisma.cars.groupBy({
    by: ["brand"],
    _count: {
      _all: true,
    },
  });

  const groupedCars = Object.assign(
    {},
    ...cars.map((c) => ({ [c.brand]: c._count._all }))
  );

  const result = brands.map((b) => {
    return { ...b, count: groupedCars[b.name] };
  });

  return {
    props: { brands: result },
  };
}
