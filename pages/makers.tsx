import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { getGroupedByCars } from "../utils/api";
import GridList from "../components/gridlist";

type Maker = Prisma.makersGetPayload<{}> & {
  count: Number;
  id: string;
  thumbnail: string;
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
        secondTitleFormatter={(m) => `${m.count} cars`}
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
