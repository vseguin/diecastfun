import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { getGroupedByCars } from "../utils/api";

type Brand = Prisma.brandsGetPayload<{}> & {
  count: Number;
};

type Props = {
  brands: Brand[];
};

export default function BrandsIndex({ brands }: Props) {
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

  const cars = await getGroupedByCars(prisma, "brand");

  const result = brands.map((b) => {
    return { ...b, count: cars[b.name] };
  });

  return {
    props: { brands: result },
  };
}
