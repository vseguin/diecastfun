import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";

type Car = Prisma.carsGetPayload<{}>;

export default function CarsIndex() {
  const [cars, setCars] = useState([]);
  const router = useRouter();
  const searchParams = new URLSearchParams();

  Object.keys(router.query).forEach((k) => {
    if (router.query[k]) {
      searchParams.append(k, router.query[k] as string);
    }
  });

  const path = `/api/cars?${searchParams.toString()}`;

  useSWR(path, fetcher, {
    onSuccess: (data) => {
      setCars(data.items);
    },
  });

  return (
    <div>
      {cars.map((car: Car) => {
        return (
          <h1 key={car.id}>
            <Link href={`/cars/${car.id}`}>
              {car.brand} {car.model}
            </Link>
          </h1>
        );
      })}
    </div>
  );
}
