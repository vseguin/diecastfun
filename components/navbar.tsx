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
import { gradients, overlays } from "../utils/theme";

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
    const isActive = router.pathname === item.href;
    return (
      <Box
        key={item.title}
        sx={{
          margin: "0 4px",
          padding: "8px 16px",
          borderRadius: "8px",
          backgroundColor: isActive ? overlays.light : "transparent",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: overlays.lighter,
          },
        }}
      >
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
        <Toolbar sx={{ padding: "8px 32px !important", minHeight: "70px" }}>
          <Box className="flex flex-align-center flex-grow">
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                background: gradients.primary,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <Link href="/">1/64 DIECAST FUN</Link>
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
              }}
            >
              <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 20px", height: "24px" }}
              />
              {navElements}
            </Box>
          </Box>
          <form action="#" onSubmit={onSubmit} className="flex">
            <TextField
              onInput={(event) => {
                setSearchTerm((event.target as HTMLInputElement).value);
              }}
              variant="outlined"
              placeholder="Search cars..."
              size="small"
              value={searchTerm}
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    aria-label="search"
                    size="small"
                    sx={{ color: "primary.main" }}
                  >
                    <Search />
                  </IconButton>
                ),
              }}
              sx={{
                minWidth: "250px",
                "& .MuiOutlinedInput-root": {
                  paddingRight: "4px",
                },
              }}
            />
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
