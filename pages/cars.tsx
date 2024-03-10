import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/api";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CarList from "../components/carlist";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Pagination from "../components/pagination";

export default function CarsIndex() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = `/api/cars?${searchParams.toString()}`;
  const page = router.query.page ? parseInt(router.query.page.toString()) : 0;

  useEffect(() => {
    if (router.query.q) {
      setLoading(true);
    }
  }, [router.query]);

  useSWR(path, fetcher, {
    onSuccess: (data) => {
      setLoading(false);
      setCars(data.items);
      setTotal(data.total);
    },
  });

  let searchTerms = [];
  const supportedQueryParams = ["q", "maker"];
  for (const [key, value] of searchParams.entries()) {
    if (supportedQueryParams.includes(key)) {
      searchTerms.push(value);
    }
  }
  const query = searchTerms.join(",");

  return (
    <>
      {loading && (
        <Box className="flex flex-justify-center">
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && cars.length == 0 && query && (
        <Typography variant="h6">No results for {query}.</Typography>
      )}
      {!loading && cars.length > 0 && (
        <>
          <Box
            className="flex flex-wrap"
            sx={{
              alignItems: "center",
              justifyContent: query ? "space-between" : "flex-end",
            }}
          >
            {query && <Typography variant="h4">Results for {query}</Typography>}
            <Pagination total={total} page={page} />
          </Box>
          <CarList cars={cars} />
        </>
      )}
    </>
  );
}
