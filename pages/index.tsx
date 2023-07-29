import { Prisma } from "@prisma/client";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Typography } from "@mui/material";

type Car = Prisma.carsGetPayload<{}>;
type Props = {
  featuredCar: Car;
  newReleases: Car[];
  totalCount: Number;
};

export default function Home({ featuredCar, newReleases, totalCount }: Props) {
  return (
    <>
      <main>
        <span>I currently have</span>
        <span> {totalCount.toString()} </span>
        <span>cars.</span>
        <div>
          Featured Car: <span>{featuredCar.brand}</span>{" "}
          <span>{featuredCar.model}</span>
        </div>
        <h1>New Releases</h1>
        <div>
          {newReleases.map((car: Car) => {
            return (
              <h1 key={car.id}>
                <Link href={`/cars/${car.id}`}>
                  {car.brand} {car.model}
                </Link>
              </h1>
            );
          })}
        </div>
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

  const now = new Date();
  now.setMonth(now.getMonth() - 1);
  const newReleases = await prisma.cars.findMany({
    where: {
      insertion_date: {
        gte: now,
      },
    },
  });

  return {
    props: { featuredCar, newReleases, totalCount },
  };
}
