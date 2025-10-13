import prisma from "../lib/prisma";
import GridList, { GridItem } from "../components/gridlist";
import { getGroupedByCars } from "../utils/api";
import { pluralize } from "../utils/typography";
import * as changeCase from "change-case";
import { Box, Typography } from "@mui/material";

type Era = GridItem & {
  count: number;
};

type Props = {
  eras: Era[];
};

export default function ErasIndex({ eras }: Props) {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: "24px", fontWeight: 600 }}>
        Eras
      </Typography>
      <GridList
        firstTitleFormatter={(e) => `${changeCase.sentenceCase(e.id)}`}
        items={eras}
        linkFormatter={(e) => `/cars?era=${e.id}`}
        secondTitleFormatter={(c) => `${pluralize(c.count, "car")}`}
        imageBackgroundColor="#ffffff"
      />
    </Box>
  );
}

export async function getServerSideProps() {
  const eras = [
    "OldTimers",
    "Forties",
    "Fifties",
    "Sixties",
    "Seventies",
    "Eighties",
    "Nineties",
    "Modern",
  ];

  const cars = await getGroupedByCars(prisma, "era");

  const result = eras.map((e) => {
    return {
      count: cars[e],
      id: e,
      thumbnail: `${process.env.STORAGE_URL}/images/eras/${e.toLowerCase()}.png`,
    };
  });

  return {
    props: { eras: result },
  };
}
