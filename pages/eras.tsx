import prisma from "../lib/prisma";
import GridList, { GridItem } from "../components/gridlist";
import { getGroupedByCars } from "../utils/api";
import { pluralize } from "../utils/typography";
import * as changeCase from "change-case";

type Era = GridItem & {
  count: number;
};

type Props = {
  eras: Era[];
};

export default function ErasIndex({ eras }: Props) {
  return (
    <div>
      <GridList
        firstTitleFormatter={(e) => `${changeCase.sentenceCase(e.id)}`}
        items={eras}
        linkFormatter={(e) => `/cars?era=${e.id}`}
        secondTitleFormatter={(c) => `${pluralize(c.count, "car")}`}
      />
    </div>
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
