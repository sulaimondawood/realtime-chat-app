import "../styles/globals.css";
import { useContext, useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "../src/Layout/Layout";
import AuthProvider, { authProvider } from "../src/components/AuthProvider";
import { auth } from "../firebase/config";
import Home from "./login";
import ChatProvider from "../src/components/ChatContext";
import { searchContext } from "./chat-me";
function MyApp({ Component, pageProps }: AppProps) {
  const user2: any = useContext(searchContext);
  const { authContext } = useContext(authProvider);

  // if (!authContext.uid) {
  //   return <Home />;
  // }

  return (
    <AuthProvider>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </AuthProvider>
  );
}

export default MyApp;
