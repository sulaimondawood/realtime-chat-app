import "../styles/globals.css";
import { useContext } from "react";
import type { AppProps } from "next/app";
import Layout from "../src/Layout/Layout";
import AuthProvider, { authProvider } from "../src/components/AuthProvider";
import { auth } from "../firebase/config";
import Home from "./login";
import ChatProvider from "../src/components/ChatContext";
function MyApp({ Component, pageProps }: AppProps) {
  const { authContext } = useContext(authProvider);

  // if (!authContext) {
  //   return <Home />;
  // }
  // console.log(authContext);

  return (
    <AuthProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </AuthProvider>
  );
}

export default MyApp;
