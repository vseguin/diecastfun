import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Cars() {
  const router = useRouter();
  const { q } = router.query;
  let path = "/api/cars";

  if (q) {
    path = path + `?q=${q}`;
  }

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
