import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { getGroupedByCars } from "../utils/api";
import { GetServerSidePropsContext } from "next";

type Brand = Prisma.brandsGetPayload<{}> & {
  count: Number;
};

type Props = {
  brands: Brand[];
  countries: String[];
};

export default function BrandsIndex({ brands, countries }: Props) {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.toString()}>
            <Link href={`/brands?country=${country}`}>{country}</Link>
          </div>
        );
      })}

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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const whereClause = query.country
    ? {
        country: {
          equals: query.country as string,
        },
      }
    : {};

  const brands = await prisma.brands.findMany({
    where: whereClause,
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const countriesQuery = await prisma.brands.findMany({
    distinct: ["country"],
    select: {
      country: true,
    },
    orderBy: [
      {
        country: "asc",
      },
    ],
  });
  const countries = countriesQuery.map((c) => c.country);

  const cars = await getGroupedByCars(prisma, "brand");

  const result = brands.map((b) => {
    return { ...b, count: cars[b.name] || 0 };
  });

  return {
    props: { brands: result, countries },
  };
}
