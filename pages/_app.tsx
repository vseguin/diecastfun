import { AppProps } from "next/app";
import Layout from "../components/layout";

export default function DiecastFun({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
