import Link from "next/link";
import prisma from "../lib/prisma";
import { Typography } from "@mui/material";
import CarList from "../components/carlist";
import { Car } from "../utils/types";
import { mapCarsWithThumbnails } from "../utils/api";

type Props = {
  featuredCar: Car;
  latestAdditions: Car[];
  totalCount: Number;
};

export default function Home({
  featuredCar,
  latestAdditions,
  totalCount,
}: Props) {
  return (
    <>
      <main>
        <span>I currently have</span>
        <span> {totalCount.toString()} </span>
        <span>cars.</span>
        <div>
          Featured car: <span>{featuredCar.brand}</span>{" "}
          <span>{featuredCar.model}</span>
        </div>
        <Typography variant="h3">Latest additions</Typography>
        <CarList cars={latestAdditions} />
        <Link href="/cars?customized=true">See customs</Link>
        <Link href="/cars?restored=true">See restorations</Link>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const totalCount = await prisma.cars.count();
  const ids = await prisma.cars.findMany({
    select: {
      id: true,
    },
  });

  const id = ids[Math.floor(Math.random() * totalCount)].id;
  const featuredCar = await prisma.cars.findUnique({
    where: {
      id,
    },
  });

  let latestAdditions = await prisma.cars.findMany({
    orderBy: [
      {
        insertion_date: "desc",
      },
    ],
    take: 50,
  });

  latestAdditions = mapCarsWithThumbnails(latestAdditions).sort((a, b) =>
    (a.id || "").localeCompare(b.id || "")
  );

  return {
    props: { featuredCar, latestAdditions, totalCount },
  };
}
