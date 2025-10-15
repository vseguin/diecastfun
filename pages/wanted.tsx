import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { borders } from "../utils/theme";

type WantedCar = Prisma.wanted_carsGetPayload<{}>;

type Props = {
  cars: WantedCar[];
};

export default function WantedList({ cars }: Props) {
  return (
    <Box>
      <Typography variant="h4" className="page-heading">
        Wanted List
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          border: borders.default,
          borderRadius: "12px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
              }}
            >
              <TableCell>Maker</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car.id}
                className="transition-smooth"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  },
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell>{car.maker}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
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
