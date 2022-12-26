import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

// firebase

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
// firebase

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("me");
      console.log(res);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
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
        <h2 className={classes.title}>Sign Up</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your email  address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button></button>
          <div className="">
            <label className={classes.file_label} htmlFor="file">
              <img className={classes.folder} src={Folder.src} alt="" />
              <span>Upload your image</span>
            </label>
            <input className={classes.file} type="file" id="file" />
          </div>

          <div>
            <span>Already have an account?</span>
            <Link href="/login">login</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
