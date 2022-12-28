import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../utils/api";

export default function Cars() {
  const router = useRouter();
  const { q, brand } = router.query;

  const searchParams = new URLSearchParams();

  if (q) {
    searchParams.append("q", q.toString());
  }
  if (brand) {
    searchParams.append("brand", brand.toString());
  }

  const path = `/api/cars?${searchParams.toString()}`;

  const { data } = useSWR(path, fetcher);
  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.items.map((car) => {
        return (
          <h1 key={car.id}>
            {car.brand} {car.model}
          </h1>
        );
      })}
    </div>
  );
}
