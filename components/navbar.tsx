import { useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    router.push({
      pathname: "cars",
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
