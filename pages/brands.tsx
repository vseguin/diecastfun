import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { getGroupedByCars } from "../utils/api";
import { GetServerSidePropsContext } from "next";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import * as changeCase from "change-case";
import lookup from "country-code-lookup";
import GridList, { GridItem } from "../components/gridlist";
import { pluralize } from "../utils/typography";

type Brand = Prisma.brandsGetPayload<{}> &
  GridItem & {
    count: number;
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
    if (value === defaultValue) {
      delete router.query.country;
    } else {
      router.query.country = value;
    }

    router.push(router);
  };

  const getCountryCode = (country: string | null) => {
    const displayValue = changeCase.capitalCase(country || "");
    return lookup.byCountry(displayValue)?.iso2.toLowerCase();
  };

  return (
    <Box>
      <Box className="flex-between mb-24">
        <Typography variant="h4" className="font-weight-600">
          Brands
        </Typography>
        <FormControl sx={{ minWidth: 180 }} size="small">
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
              const countryCode = getCountryCode(c);

              return (
                <MenuItem key={c.toString()} value={c}>
                  {
                    <Box className="flex-between" sx={{ width: "100%" }}>
                      <Box>{displayValue}</Box>&nbsp;
                      <Box className={`fi fi-${countryCode}`}></Box>
                    </Box>
                  }
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <GridList
        firstTitleFormatter={(b) => `${b.id}`}
        items={brands}
        linkFormatter={(b) => `/cars?brand=${b.id}`}
        secondTitleFormatter={(b) => (
          <>
            {`${pluralize(b.count, "car")}`} -{" "}
            <span className={`fi fi-${getCountryCode(b.country)}`}></span>
          </>
        )}
        imageBackgroundColor="#ffffff"
      />
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
    return {
      ...b,
      count: cars[b.name] || 0,
      id: b.name,
      thumbnail: `${process.env.STORAGE_URL}/images/brands/${b.name.toLowerCase().replace(/[\s-]/g, "")}.png`,
    };
  });

  return {
    props: { brands: result, countries },
  };
}
