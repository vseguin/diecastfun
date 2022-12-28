import { ReactElement } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
