import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CarList from "../components/carlist";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function CarsIndex() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = `/api/cars?${searchParams.toString()}`;

  useEffect(() => {
    if (router.query.q) {
      setLoading(true);
    }
  }, [router.query.q]);

  useSWR(path, fetcher, {
    onSuccess: (data) => {
      setLoading(false);
      setCars(data.items);
    },
  });

  const query = searchParams.get("q");

  return (
    <>
      {loading && (
        <Box className="flex flex-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && cars.length == 0 && query && (
        <Typography variant="h6">No results for {query}.</Typography>
      )}
      {!loading && cars.length > 0 && (
        <>
          {query && <Typography variant="h6">Results for {query}</Typography>}
          <CarList cars={cars} />
        </>
      )}
    </>
  );
}
