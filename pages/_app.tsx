import Layout from "../components/layout";

export default function DiecastFun({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
