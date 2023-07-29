import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CarList from "../components/carlist";

export default function CarsIndex() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const router = useRouter();
  const searchParams = new URLSearchParams();

  Object.keys(router.query).forEach((k) => {
    if (router.query[k]) {
      searchParams.append(k, router.query[k] as string);
    }
  });

  const path = `/api/cars?${searchParams.toString()}`;

  useSWR(path, fetcher, {
    onSuccess: (data) => {
      setLoading(false);
      setCars(data.items);
    },
  });

  return (
    <>
      {loading && (
        <Box className="flex flex-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && cars.length == 0 && (
        <Typography variant="h6">
          No results for {searchParams.get("q")}.
        </Typography>
      )}
      {!loading && cars.length > 0 && (
        <>
          <Typography variant="h6">
            Results for {searchParams.get("q")}
          </Typography>
          <CarList cars={cars} />
        </>
      )}
    </>
  );
}
