import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

type Car = Prisma.carsGetPayload<{}>

type Props = {
    car: Car
}

export default function CarPage({ car }: Props) {
    return <div>{ car.model }</div>
}

export async function getServerSideProps({ params }) {
    const car = await prisma.cars.findUnique({
      where: {
        id: String(params?.id),
      },
    });
    return {
      props: { car },
    };
  };
