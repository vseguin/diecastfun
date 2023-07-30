import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type Item = {
  id: string;
  thumbnail: string;
};

type Props<T extends Item> = {
  firstTitleFormatter: (item: T) => string;
  items: T[];
  secondTitleFormatter?: (item: T) => string;
  section: string;
};

export default function GridList<T extends Item>({
  firstTitleFormatter,
  items,
  secondTitleFormatter,
  section,
}: Props<T>) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => {
        return (
          <Grid item key={item.id} xs={12} sm={4} md={3}>
            <Link href={`/${section}/${item.id}`}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  image={item.thumbnail}
                  height="200"
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
