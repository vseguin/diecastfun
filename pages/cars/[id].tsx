import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

type Car = Prisma.carsGetPayload<{}>;

type Props = {
  car: Car;
};

export default function CarPage({ car }: Props) {
  return <div>{car.model}</div>;
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
