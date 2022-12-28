import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../utils/api";

type Car = Prisma.carsGetPayload<{}>;

export default function CarsIndex() {
  const router = useRouter();
  const searchParams = new URLSearchParams();

  Object.keys(router.query).forEach((k) => {
    if (router.query[k]) {
      searchParams.append(k, router.query[k] as string);
    }
  });

  const path = `/api/cars?${searchParams.toString()}`;

  const { data } = useSWR(path, fetcher);
  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.items.map((car: Car) => {
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
