import React, { useContext, useState, useEffect } from "react";
import Aside from "../src/components/Aside";
import Message from "../src/components/Message";
import classes from "../styles/screens/chatMe.module.css";
import Profile from "../src/components/Profile";
import Link from "next/link";

import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { authProvider } from "../src/components/AuthProvider";
// import Image from "../../src/assets/photo.jpeg";
import Image from "../src/assets/photo.jpeg";

const chatMe = () => {
  const { authContext } = useContext(authProvider);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  // const [userName, setUserName] = useState("");
  // console.log(authContext);

  const searchUser = async () => {
    const searchedUser = collection(db, "users");

    const q = query(searchedUser, where("name", "==", userName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data() as any);
      console.log(doc);
    });
  };

  const handleKey = (e: any) => {
    e.code = "Enter" && searchUser();
  };

  return (
    <main className={classes.grand}>
      <div className={classes.top}>
        <div className={classes.links}>
          <h1> ChatME</h1>
          <div className={classes.search}>
            <input
              type="text"
              placeholder="Search"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              // onKeyDown={(e)=>{}}
              onKeyDown={handleKey}
            />
            <svg
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.82422 17C14.2425 17 17.8242 13.4183 17.8242 9C17.8242 4.58172 14.2425 1 9.82422 1C5.40594 1 1.82422 4.58172 1.82422 9C1.82422 13.4183 5.40594 17 9.82422 17Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.1742 18.9999L17.8242 14.6499"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div>
            <Link href="/">HOME</Link>
            <Link href="/">CHAT</Link>
            <Link href="/">CONTACTS</Link>
            <Link href="/">SETTINGS</Link>
            <Link href="/">FAQS</Link>
          </div>
        </div>
        <img className={classes.img} src={Image.src} alt="" />
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

      <div className={classes.main}>
        <Aside />
        <Message />
      </div>
    </main>
  );
};

export default chatMe;
