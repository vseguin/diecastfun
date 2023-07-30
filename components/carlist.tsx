import { Prisma } from "@prisma/client";
import GridList from "./gridlist";

type Car = Prisma.carsGetPayload<{}> & {
  thumbnail: string;
};

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  const firstTitleFormatter = (car: Car) => `${car.brand} ${car.model}`;
  const secondTitleFormatter = (car: Car) => `${car.maker}`;
  return (
    <GridList
      firstTitleFormatter={firstTitleFormatter}
      items={cars}
      secondTitleFormatter={secondTitleFormatter}
      section="cars"
    />
  );
}
