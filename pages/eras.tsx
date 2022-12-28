import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { getGroupedByCars } from "../utils/api";

type Era = {
  name: String;
  count: Number;
};

type Props = {
  eras: Era[];
};

export default function ErasIndex({ eras }: Props) {
  return (
    <div>
      {eras.map((era) => {
        return (
          <div key={era.name}>
            <Link href={`/cars?era=${era.name}`}>{era.name}</Link>
            <div>{era.count.toString()}</div>
          </div>
        );
      })}
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
    return { name: e, count: cars[e] };
  });

  return {
    props: { eras: result },
  };
}
