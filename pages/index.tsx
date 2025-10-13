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
        <Box sx={{ marginBottom: "48px" }}>
          <Card
            sx={{
              background: gradients.subtle,
              border: borders.subtle,
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <DirectionsCar
                sx={{ fontSize: "2.5rem", color: "primary.main" }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: gradients.primary,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
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

        <Box sx={{ marginBottom: "48px" }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "24px", fontWeight: 600 }}
          >
            Latest Additions
          </Typography>
          <CarList cars={latestAdditions} />
        </Box>

        <Box sx={{ marginBottom: "48px" }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "24px", fontWeight: 600 }}
          >
            Featured Car
          </Typography>
          <CarList cars={[featuredCar]} />
        </Box>

        <Box>
          <Typography
            variant="h4"
            sx={{ marginBottom: "24px", fontWeight: 600 }}
          >
            Browse Collections
          </Typography>
          <Grid container spacing={3} size={12}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Link
                href="/cars?customized=true"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    padding: "24px",
                    cursor: "pointer",
                    background: gradients.subtle,
                    "&:hover": {
                      background: gradients.subtleHover,
                      borderColor: overlays.medium,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Build sx={{ fontSize: "2rem", color: "primary.main" }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
              <Link
                href="/cars?restored=true"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    padding: "24px",
                    cursor: "pointer",
                    background: gradients.subtleReverse,
                    "&:hover": {
                      background: gradients.subtleHoverReverse,
                      borderColor: overlays.medium,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Restore
                      sx={{ fontSize: "2rem", color: "secondary.main" }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
