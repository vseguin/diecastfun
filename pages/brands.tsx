import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";

type Brand = Prisma.brandsGetPayload<{}>;

type Props = {
  brands: Brand[];
};

export default function Brands({ brands }: Props) {
  return (
    <div>
      {brands.map((brand) => {
        return (
          <h1 key={brand.name}>
            <Link href={`/cars?brand=${brand.name}`}>{brand.name}</Link>
          </h1>
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

  return {
    props: { brands },
  };
}
