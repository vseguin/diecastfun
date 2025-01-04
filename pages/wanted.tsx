import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

type WantedCar = Prisma.wanted_carsGetPayload<{}>;

type Props = {
  cars: WantedCar[];
};

export default function WantedList({ cars }: Props) {
  return (
    <TableContainer>
      <Table sx={{ maxWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Maker</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Brand
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Model
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.maker}</TableCell>
              <TableCell align="right">{car.brand}</TableCell>
              <TableCell align="right">{car.model}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
