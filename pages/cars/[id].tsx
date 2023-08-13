import prisma from "../../lib/prisma";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/api";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { mapCar } from "../../utils/api";
import { Car } from "../../utils/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CarList from "../../components/carlist";

type Props = {
  car: Car;
};

export default function CarPage({ car }: Props) {
  const theme = useTheme();
  const lowerThanMid = useMediaQuery(theme.breakpoints.down("md"));

  const [similarCars, setSimilarCars] = useState([]);
  useSWR(`/api/cars/${car.id}/similar`, fetcher, {
    onSuccess: (data) => {
      setSimilarCars(data.items);
    },
  });

  return (
    <>
      <Box
        className="flex"
        sx={{ flexDirection: lowerThanMid ? "column" : "row" }}
      >
        <Box
          className="flex"
          sx={{ width: lowerThanMid ? null : "50%", flexDirection: "column" }}
        >
          <Typography variant="h4">
            {car.brand} {car.model}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <Typography>Maker</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/cars?maker=${car.maker}`}>
                      <Typography>{car.maker}</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Typography>Categories</Typography>
                  </TableCell>
                  <TableCell align="right">
                    {car.tags.map((t) => {
                      return (
                        <Link key={t.tags} href={`/cars?category=${t.tags}`}>
                          <Typography>{t.tags}</Typography>
                        </Link>
                      );
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Typography>Era</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/cars?era=${car.era}`}>
                      <Typography>{car.era}</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Typography>Scale</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>{car.scale}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          className="flex"
          sx={{
            paddingLeft: lowerThanMid ? 0 : "50px",
            width: lowerThanMid ? null : "50%",
          }}
        >
          <ImageList
            sx={{
              margin: 0,
              padding: 0,
              transform: "translateZ(0)",
            }}
          >
            <ImageListItem key={car.images[0]} cols={2} rows={1}>
              <img src={car.images[0]} alt="" loading="lazy" />
            </ImageListItem>
            <ImageListItem key={car.images[1]} cols={1} rows={1}>
              <img src={car.images[1]} alt="" loading="lazy" />
            </ImageListItem>
            <ImageListItem key={car.images[2]} cols={1} rows={1}>
              <img src={car.images[2]} alt="" loading="lazy" />
            </ImageListItem>
          </ImageList>
        </Box>
      </Box>
      <div>
        <CarList cars={similarCars} />
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
    include: {
      tags: true,
    },
  });

  if (!car) {
    return {
      notFound: true,
    };
  }

  return {
    props: { car: mapCar(car) },
  };
}
