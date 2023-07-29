import { Prisma } from "@prisma/client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type Car = Prisma.carsGetPayload<{}>;

type Props = {
  cars: Car[];
};

export default function CarList({ cars }: Props) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      {cars.map((car: Car) => {
        return (
          <Grid item key={car.id} xs={12} sm={4} md={3}>
            <Link href={`/cars/${car.id}`}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" image={car.thumbnail} height="200" />
                <CardContent>
                  <Typography gutterBottom component="div">
                    {car.brand} {car.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {car.maker}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
