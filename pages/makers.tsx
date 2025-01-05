import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { getGroupedByCars } from "../utils/api";
import GridList, { GridItem } from "../components/gridlist";
import { pluralize } from "../utils/typography";

type Maker = Prisma.makersGetPayload<{}> &
  GridItem & {
    count: number;
  };

type Props = {
  makers: Maker[];
};

export default function MakersIndex({ makers }: Props) {
  return (
    <div>
      <GridList
        firstTitleFormatter={(m) => `${m.name}`}
        items={makers}
        linkFormatter={(m) => `/cars?maker=${m.name}`}
        secondTitleFormatter={(m) => `${pluralize(m.count, "car")}`}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const makers = await prisma.makers.findMany({
    orderBy: [
      {
        name: "asc",
      },
    ],
  });

  const cars = await getGroupedByCars(prisma, "maker");

  const result = makers.map((m) => {
    return {
      ...m,
      count: cars[m.name],
      id: m.name,
      thumbnail: `${process.env.STORAGE_URL}/images/makers/${m.name
        .toLowerCase()
        .replace(" ", "")}.png`,
    };
  });

  return {
    props: { makers: result },
  };
}
