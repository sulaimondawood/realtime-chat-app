import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

// firebase
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, auth, provider, app } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

// firebase

import { authProvider } from "../src/components/AuthProvider";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authContext } = useContext(authProvider);

  console.log(authContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      console.log(res);
      await setDoc(doc(db, "users", res.user.uid), {
        id: authContext.uid,
        name: authContext.displayName,
        email: authContext.email,
        photo: authContext.photoURL,
      });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
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
