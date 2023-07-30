import { ReactElement } from "react";
import Box from "@mui/material/Box";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <Box className="flex" sx={{ flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </Box>
  );
}
