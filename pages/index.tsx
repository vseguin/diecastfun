import Link from "next/link";
import prisma from "../lib/prisma";
import { Typography, Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CarList from "../components/carlist";
import { Car } from "../utils/types";
import { mapCar, mapCars } from "../utils/api";
import Box from "@mui/material/Box";
import { DirectionsCar, Build, Restore } from "@mui/icons-material";
import { gradients, overlays, borders } from "../utils/theme";

type Props = {
  featuredCar: Car;
  latestAdditions: Car[];
  totalCount: Number;
};

export default function Home({
  featuredCar,
  latestAdditions,
  totalCount,
}: Props) {
  return (
    <>
      <main>
        <Box className="mb-48">
          <Card
            sx={{
              background: gradients.subtle,
              border: borders.subtle,
              padding: "32px",
            }}
            className="text-center"
          >
            <Box
              className="flex-center"
              sx={{ justifyContent: "center", gap: 2, flexWrap: "wrap" }}
            >
              <DirectionsCar
                className="icon-large"
                sx={{ fontSize: "2.5rem", color: "primary.main" }}
              />
              <Typography variant="h3" className="gradient-text">
                {totalCount.toString()} Cars
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ marginTop: 2, color: "text.secondary" }}
            >
              in my collection
            </Typography>
          </Card>
        </Box>

        <Box className="mb-48">
          <Typography variant="h4" className="page-heading">
            Latest Additions
          </Typography>
          <CarList cars={latestAdditions} />
        </Box>

        <Box className="mb-48">
          <Typography variant="h4" className="page-heading">
            Featured Car
          </Typography>
          <CarList cars={[featuredCar]} />
        </Box>

        <Box>
          <Typography variant="h4" className="page-heading">
            Browse Collections
          </Typography>
          <Grid container spacing={3} size={12}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Link href="/cars?customized=true">
                <Card
                  className="interactive-card"
                  sx={{
                    background: gradients.subtle,
                    "&:hover": {
                      background: gradients.subtleHover,
                      borderColor: overlays.medium,
                    },
                  }}
                >
                  <Box className="flex-center gap-2">
                    <Build
                      className="icon-large"
                      sx={{ color: "primary.main" }}
                    />
                    <Box>
                      <Typography variant="h6" className="font-weight-600">
                        Custom Cars
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        View all customized vehicles
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Link href="/cars?restored=true">
                <Card
                  className="interactive-card"
                  sx={{
                    background: gradients.subtleReverse,
                    "&:hover": {
                      background: gradients.subtleHoverReverse,
                      borderColor: overlays.medium,
                    },
                  }}
                >
                  <Box className="flex-center gap-2">
                    <Restore
                      className="icon-large"
                      sx={{ color: "secondary.main" }}
                    />
                    <Box>
                      <Typography variant="h6" className="font-weight-600">
                        Restorations
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        View all restored vehicles
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const totalCount = await prisma.cars.count();
  const ids = await prisma.cars.findMany({
    select: {
      id: true,
    },
  });

  const id = ids[Math.floor(Math.random() * totalCount)].id;
  const featuredCar = await prisma.cars.findUnique({
    where: {
      id,
    },
  });

  let latestAdditions = await prisma.cars.findMany({
    orderBy: [
      {
        insertion_date: "desc",
      },
    ],
    take: 48,
  });

  latestAdditions = mapCars(latestAdditions).sort((a, b) =>
    (a.id || "").localeCompare(b.id || ""),
  );

  return {
    props: {
      featuredCar: featuredCar ? mapCar(featuredCar) : null,
      latestAdditions,
      totalCount,
    },
  };
}
