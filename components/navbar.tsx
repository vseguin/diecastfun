import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu as MenuIcon, Close } from "@mui/icons-material";
import React from "react";
import { overlays } from "../utils/theme";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className="border-radius-8 transition-smooth"
        sx={{
          margin: "0 4px",
          padding: "8px 16px",
          backgroundColor: isActive ? overlays.light : "transparent",
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
        <Toolbar sx={{ padding: "8px 32px", minHeight: "70px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileMenuOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box className="flex flex-align-center flex-grow">
            <Typography
              variant="h6"
              className="gradient-text"
              sx={{
                fontSize: "1.25rem",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <Link href="/">1/64 DIECAST FUN</Link>
            </Typography>

            <Box
              sx={{
                display: { xs: "none !important", md: "flex !important" },
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

          <Box
            component="form"
            action="#"
            onSubmit={onSubmit}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
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
                width: "250px",
                marginLeft: "12px",
                "& .MuiOutlinedInput-root": {
                  paddingRight: "4px",
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Box sx={{ width: 280, padding: "16px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" className="gradient-text">
              Menu
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box
            component="form"
            action="#"
            onSubmit={onSubmit}
            sx={{ marginBottom: 2 }}
          >
            <TextField
              onInput={(event) => {
                setSearchTerm((event.target as HTMLInputElement).value);
              }}
              variant="outlined"
              placeholder="Search cars..."
              size="small"
              fullWidth
              value={searchTerm}
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    aria-label="search"
                    size="small"
                    sx={{ color: "primary.main" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search />
                  </IconButton>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingRight: "4px",
                },
              }}
            />
          </Box>

          <Divider sx={{ marginBottom: 1 }} />

          <List>
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      borderRadius: "8px",
                      marginBottom: "4px",
                      backgroundColor: isActive
                        ? overlays.light
                        : "transparent",
                      "&:hover": {
                        backgroundColor: overlays.lighter,
                      },
                    }}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
