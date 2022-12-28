import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { getGroupedByCars } from "../utils/api";

type Maker = Prisma.makersGetPayload<{}> & {
  count: Number;
};

type Props = {
  makers: Maker[];
};

export default function MakersIndex({ makers }: Props) {
  return (
    <div>
      {makers.map((maker) => {
        return (
          <div key={maker.name}>
            <Link href={`/cars?maker=${maker.name}`}>{maker.name}</Link>
            <div>{maker.count.toString()}</div>
          </div>
        );
      })}
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
    return { ...m, count: cars[m.name] };
  });

  return {
    props: { makers: result },
  };
}
