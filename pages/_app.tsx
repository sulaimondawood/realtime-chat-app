import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/Layout/Layout";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
