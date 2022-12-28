import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

// firebase

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
// firebase

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");
  const refs = useRef();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, email);
      const uploadTask = uploadBytesResumable(storageRef, fileData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              photoURL: downloadURL,
              displayName: name,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );

      await setDoc(doc(db, "userChats", res.user.uid), {});
      console.log(fileData);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
    }
  };

  const handleFile = (e: any) => {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
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
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
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

          <button>Create Account</button>
          <div className="">
            <label className={classes.file_label} htmlFor="file">
              <img className={classes.folder} src={Folder.src} alt="" />
              <span>Upload your image</span>
            </label>
            <input
              className={classes.file}
              type="file"
              id="file"
              // value={fileData}
              onChange={handleFile}
            />
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
