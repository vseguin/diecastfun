import { Car } from "../utils/types";
import GridList from "./gridlist";

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  const firstTitleFormatter = (car: Car) => `${car.brand} ${car.model}`;
  const secondTitleFormatter = (car: Car) => `${car.maker}`;
  return (
    <GridList
      firstTitleFormatter={firstTitleFormatter}
      imageFit="cover"
      items={cars}
      linkFormatter={(c) => `/cars/${c.id}`}
      secondTitleFormatter={secondTitleFormatter}
    />
  );
}
