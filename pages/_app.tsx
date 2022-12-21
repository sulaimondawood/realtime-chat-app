import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../src/Layout/Layout";
import AuthProvider from "../src/components/AuthProvider";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
