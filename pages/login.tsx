import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider, app } from "../firebase/config";
// import {  signInWithPopup } from "firebase/auth";

console.log(app);

// signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     const user = result.user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     const email = error.customData.email;

//     const credential = GoogleAuthProvider.credentialFromError(error);
//   });

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  const handleGoogleSignIn = async () => {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
  };

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
        <h3 className={classes.top}> RealTime Chat App</h3>
        <h2 className={classes.title}>Sign In</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your email  address" />
          <input type="password" placeholder="Enter your password" />

          <button onClick={handleGoogleSignIn} className={classes.google}>
            Google SignIn
          </button>
          <div>
            <span>Does not have an account?</span>
            <Link href="/">Create an account</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
