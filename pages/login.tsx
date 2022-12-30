import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

import { FcGoogle } from "react-icons/Fc";

// firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, auth, provider, app } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

// firebase

import { authProvider } from "../src/components/AuthProvider";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  // router
  const router = useRouter();
  // router

  // states
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  // states

  const handleSignInEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      router.push("/chatMe");
    } catch (error: any) {
      setError(true);
      const errorCode = error.code;
      setTimeout(() => {
        setError(false);
      }, 2000);
      setErrorMsg(errorCode);
    }
  };

  // google sigin async function
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      console.log(res);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      router.push("/chatMe");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      setErrorMsg(errorCode);

      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };
  // google sigin async function

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="react realtime application by dawood"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.sign_in_wrp}>
        {/* <h3 className={classes.top}> RealTime Chat App</h3> */}
        <h2 className={classes.title}>Sign In</h2>
        {error && <p className={classes.error_m}>{errorMsg}</p>}

        <form className={classes.form} onSubmit={handleSignInEmail}>
          <input
            required
            type="text"
            placeholder="Enter your email  address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            required
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={classes.google} onClick={handleSignInEmail}>
            Submit
          </button>
          <p style={{ textAlign: "center", paddingBottom: "18px" }}>OR</p>
        </form>
        <button onClick={handleGoogleSignIn}>
          <FcGoogle className={classes.google_icon} />
        </button>

        <div>
          <span>Does not have an account?</span>
          <Link href="/">Create an account</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
