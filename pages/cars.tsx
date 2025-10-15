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
import SearchOffIcon from "@mui/icons-material/SearchOff";

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
    <Box>
      {loading && (
        <Box className="flex flex-justify-center" sx={{ padding: "48px 0" }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && cars.length == 0 && !query && (
        <>
          <Typography variant="h4" className="page-heading">
            All Cars
          </Typography>
          <Typography variant="h6" color="text.secondary">
            No cars found.
          </Typography>
        </>
      )}
      {!loading && cars.length == 0 && query && (
        <>
          <Typography variant="h4" className="page-heading">
            Search Results
          </Typography>
          <Box className="empty-state">
            <Box
              className="mb-24"
              sx={{
                position: "relative",
                animation: "shake 3s ease-in-out infinite",
                "@keyframes shake": {
                  "0%, 100%": { transform: "rotate(0deg)" },
                  "25%": { transform: "rotate(-10deg)" },
                  "75%": { transform: "rotate(10deg)" },
                },
              }}
            >
              <SearchOffIcon
                sx={{
                  fontSize: 120,
                  color: "text.disabled",
                  opacity: 0.3,
                }}
              />
            </Box>
            <Typography
              variant="h5"
              className="font-weight-600"
              sx={{
                marginBottom: "12px",
                color: "text.primary",
              }}
            >
              No Matches Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400, marginBottom: "8px" }}
            >
              We couldn&apos;t find any diecast cars matching{" "}
              <strong>&quot;{query}&quot;</strong>.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              Try adjusting your search terms or browse all cars instead.
            </Typography>
          </Box>
        </>
      )}
      {!loading && cars.length > 0 && (
        <>
          <Box className="flex flex-wrap flex-between mb-24">
            <Typography variant="h4" className="font-weight-600">
              {query ? `Results for "${query}"` : "All Cars"}
            </Typography>
            <Pagination total={total} page={page} />
          </Box>
          <CarList cars={cars} />
        </>
      )}
    </Box>
  );
}
