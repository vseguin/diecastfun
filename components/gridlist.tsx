/* eslint-disable no-unused-vars */

import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

export type GridItem = {
  id: string;
  thumbnail: string;
};

type Props<T extends GridItem> = {
  imageFit?: string;
  imageBackgroundColor?: string;
  firstTitleFormatter: (item: T) => string;
  items: T[];
  linkFormatter: (item: T) => string;
  secondTitleFormatter?: (item: T) => string | ReactNode;
};

export default function GridList<T extends GridItem>({
  firstTitleFormatter,
  imageFit = "contain",
  imageBackgroundColor = "rgba(10, 10, 10, 0.5)",
  items,
  linkFormatter,
  secondTitleFormatter,
}: Props<T>) {
  return (
    <Grid container spacing={3} size={12}>
      {items.map((item) => {
        return (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Link href={linkFormatter(item)} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "75%",
                    overflow: "hidden",
                    backgroundColor: imageBackgroundColor,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.thumbnail}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: imageFit,
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    padding: "16px",
                  }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: 1.4,
                      marginBottom: "8px",
                    }}
                  >
                    {firstTitleFormatter(item)}
                  </Typography>
                  {secondTitleFormatter && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
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
