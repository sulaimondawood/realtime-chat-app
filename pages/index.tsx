import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import classes from "../styles/screens/sign.module.css";
import Folder from "../src/assets/folder-open.svg";
import Link from "next/link";

import { BsFillImageFill } from "react-icons/bs";

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
import { useRouter } from "next/router";
// firebase

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const refs = useRef();

  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(res);

      const storageRef = ref(storage, email);
      const uploadTask = uploadBytesResumable(storageRef, fileData as any);

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
      router.push("/login");
      await setDoc(doc(db, "userChats", res.user.uid), {});
      // console.log(fileData);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
      setErrorMsg(errorCode);
      setTimeout(() => {
        setError(false);
      }, 2000);
      // console.log(errorCode);
    }
  };

  const handleFile = (e: any) => {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  };

  return (
    <div>
      <Head>
        <title>RealTime Chat Application - Dawood</title>
        <meta
          name="description"
          content="One to One real time chat application - Dawood Sulaimon"
        />
        <meta
          name="keywords"
          content="CHAT, REALTIME CHAT, REACT, NEXTJS, JS, APP, CHATAPP"
        />
        <meta name="author" content="Dawood Sulaimon Adekunle" />
        <link rel="icon" type="image/ico" href="/favicon.ico" />
      </Head>

      <main className={classes.sign_in_wrp}>
        {/* style={{ textAlign: "center" }} */}
        {/* <h3 className={classes.top}> RealTime Chat App</h3> */}
        <h2 className={classes.title}>Create Account</h2>
        {error && <p className={classes.error_m}>{errorMsg}</p>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value.trim())}
            value={name}
          />
          <input
            required
            type="text"
            placeholder="Enter your email  address"
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
          />
          <input
            required
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value.trim())}
            value={password}
          />

          <button className={classes.google}>Create Account</button>
          <div className="">
            <label className={classes.file_label} htmlFor="file">
              <div className={classes.folder}>
                <BsFillImageFill />
              </div>

              <span>Upload your image</span>
            </label>
            <input
              className={classes.file}
              type="file"
              id="file"
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
