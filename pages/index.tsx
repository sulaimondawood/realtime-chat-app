import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import classes from "../styles/screens/sign.module.css";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
    } catch (error) {}
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your email  address" />

          <input type="text" placeholder="Enter your email  address" />

          <div className="">
            <input type="file" id="file" />
            <label htmlFor="file">
              <img src="" alt="" />
            </label>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Home;
