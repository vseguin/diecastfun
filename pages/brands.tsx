import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { getGroupedByCars } from "../utils/api";
import { GetServerSidePropsContext } from "next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import * as changeCase from "change-case";
import lookup from "country-code-lookup";

type Brand = Prisma.brandsGetPayload<{}> & {
  count: Number;
};

type Props = {
  brands: Brand[];
  countries: string[];
};

export default function BrandsIndex({ brands, countries }: Props) {
  const router = useRouter();
  const defaultValue = "None";
  const [country, setCountry] = useState<string | undefined>(
    (router.query.country as string) || defaultValue,
  );

  const onCountryChange = (value: string) => {
    setCountry(value);
    router.query.country = value === defaultValue ? undefined : value;
    router.push(router);
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          value={country}
          label="Country"
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <MenuItem key={defaultValue} value={defaultValue}>
            {defaultValue}
          </MenuItem>
          {countries.map((c) => {
            const displayValue = changeCase.capitalCase(c);
            const countryCode = lookup
              .byCountry(displayValue)
              ?.iso2.toLowerCase();

            return (
              <MenuItem key={c.toString()} value={c}>
                {
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>{displayValue}</Box>&nbsp;
                    <Box className={`fi fi-${countryCode}`}></Box>
                  </Box>
                }
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {brands.map((brand) => {
        return (
          <div key={brand.name}>
            <Link href={`/cars?brand=${brand.name}`}>{brand.name}</Link>
            <div>{brand.count.toString()}</div>
            <div>{brand.country}</div>
          </div>
        );
      })}
    </Box>
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
