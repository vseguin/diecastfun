import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q.toString());
    }
  }, [router.query.q]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      pathname: "/cars",
      query: { q: searchTerm },
    });
  };

  return (
    <div>
      <form action="#" onSubmit={onSubmit}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Enter search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
