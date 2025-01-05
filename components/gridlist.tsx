/* eslint-disable no-unused-vars */

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export type GridItem = {
  id: string;
  thumbnail: string;
};

type Props<T extends GridItem> = {
  imageFit?: string;
  firstTitleFormatter: (item: T) => string;
  items: T[];
  linkFormatter: (item: T) => string;
  secondTitleFormatter?: (item: T) => string | ReactNode;
};

export default function GridList<T extends GridItem>({
  firstTitleFormatter,
  imageFit = "contain",
  items,
  linkFormatter,
  secondTitleFormatter,
}: Props<T>) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => {
        return (
          <Grid item key={item.id} xs={12} sm={4} md={3}>
            <Link href={linkFormatter(item)}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  height="200"
                  sx={{ backgroundSize: imageFit, objectFit: imageFit }}
                />
                <CardContent>
                  <Typography gutterBottom component="div">
                    {firstTitleFormatter(item)}
                  </Typography>
                  {secondTitleFormatter && (
                    <Typography variant="body2" color="text.secondary">
                      {secondTitleFormatter(item)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
