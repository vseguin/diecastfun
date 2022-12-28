import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

type WantedCar = Prisma.wanted_carsGetPayload<{}>;

type Props = {
  cars: WantedCar[];
};

export default function WantedList({ cars }: Props) {
  return (
    <div>
      {cars.map((car) => {
        return (
          <h1 key={car.id}>
            {car.brand} {car.model}
          </h1>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const wantedList = await prisma.wanted_cars.findMany({
    orderBy: [
      {
        maker: "asc",
      },
      {
        brand: "asc",
      },
      {
        model: "asc",
      },
    ],
  });

  return {
    props: { cars: wantedList },
  };
}
