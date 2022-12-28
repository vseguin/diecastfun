import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import Link from "next/link";

type Car = Prisma.carsGetPayload<{}>;

type Props = {
  car: Car;
};

export default function CarPage({ car }: Props) {
  const [similarCars, setSimilarCars] = useState([]);
  useSWR(`/api/cars/${car.id}/similar`, fetcher, {
    onSuccess: (data) => {
      setSimilarCars(data.items);
    },
  });

  return (
    <>
      <div>
        {car.brand} {car.model}
      </div>
      <div>
        {similarCars.map((car: Car) => {
          return (
            <h1 key={car.id}>
              <Link href={`/cars/${car.id}`}>
                {car.brand} {car.model}
              </Link>
            </h1>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const car = await prisma.cars.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: { car },
  };
}
