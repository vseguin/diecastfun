import { Prisma } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import prisma from "../lib/prisma";

type Car = Prisma.carsGetPayload<{}>;
type Props = {
  featuredCar: Car;
  newReleases: Car[];
  totalCount: Number;
};

export default function Home({ featuredCar, newReleases, totalCount }: Props) {
  return (
    <>
      <Head>
        <title>1/64 Diecast Fun</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
