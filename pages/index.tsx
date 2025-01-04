import Link from "next/link";
import prisma from "../lib/prisma";
import { Typography } from "@mui/material";
import CarList from "../components/carlist";
import { Car } from "../utils/types";
import { mapCar, mapCars } from "../utils/api";
import Box from "@mui/material/Box";

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
        <Box>
          <Typography variant="h4">Latest additions</Typography>
          <CarList cars={latestAdditions} />
        </Box>
        <Box>
          <Typography variant="h4">Featured car</Typography>
          <CarList cars={[featuredCar]} />
        </Box>
        <Box>
          <Link href="/cars?customized=true">See customs</Link>
        </Box>
        <Box>
          <Link href="/cars?restored=true">See restorations</Link>
        </Box>
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
    take: 48,
  });

  latestAdditions = mapCars(latestAdditions).sort((a, b) =>
    (a.id || "").localeCompare(b.id || ""),
  );

  return {
    props: { featuredCar: mapCar(featuredCar), latestAdditions, totalCount },
  };
}
