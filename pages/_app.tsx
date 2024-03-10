import "../styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";
import { theme } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";

const clientSideEmotionCache = createEmotionCache();

export interface DiecastFunProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function DiecastFun({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: DiecastFunProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>1/64 Diecast Fun</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
