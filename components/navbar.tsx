import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "@mui/icons-material";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const navItems = [
    { href: "/makers", title: "Makers" },
    { href: "/brands", title: "Brands" },
    { href: "/eras", title: "Eras" },
    { href: "/categories", title: "Categories" },
    { href: "/wanted", title: "Wanted list" },
  ];

  const navElements = navItems.map((item) => {
    return (
      <Box key={item.title} sx={{ margin: "0 2px" }}>
        <Link href={item.href}>{item.title}</Link>
      </Box>
    );
  });

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
    <Box>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Box className="flex flex-align-center flex-grow">
            <Typography variant="h6">
              <Link href="/">1/64 DIECAST FUN</Link>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 20px" }}
              />
              {navElements}
            </Box>
          </Box>
          <form action="#" onSubmit={onSubmit} className="flex">
            <IconButton type="submit" aria-label="search">
              <Search />
            </IconButton>
            <TextField
              onInput={(event) => {
                setSearchTerm((event.target as HTMLInputElement).value);
              }}
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
