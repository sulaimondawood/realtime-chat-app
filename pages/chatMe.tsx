import React, { useContext, useState, useEffect, createContext } from "react";
import Aside from "../src/components/Aside";
import Message from "../src/components/Message";
import classes from "../styles/screens/chatMe.module.css";
import Profile from "../src/components/Profile";

import { RxAvatar } from "react-icons/Rx";
import { CiSearch } from "react-icons/Ci";

import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import Link from "next/link";
import { authProvider } from "../src/components/AuthProvider";
import { useRouter } from "next/router";
import { FcCallTransfer } from "react-icons/Fc";

export const searchContext = createContext({});

const chatMe = () => {
  const { authContext } = useContext(authProvider);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState<any>({});
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  // console.log(user);

  const searchUser = async () => {
    try {
      setIsLoadingUser(true);
      const searchedUser = collection(db, "users");
      const q = query(
        searchedUser,
        where("displayName", "array-contains", userName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as any);
      });
      setIsLoadingUser(false);
    } catch (error) {
      // setUser("");
      setIsLoadingUser(false);
      // setError(true);
    }
  };
  const handleKey = (e: any) => {
    if (e.code === "Enter") {
      searchUser();
      console.log(user);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <searchContext.Provider
      value={{ user, isLoadingUser, setIsLoadingUser, error, setUserName }}
    >
      <main className={classes.grand}>
        <div className={classes.top}>
          <div className={classes.links}>
            <h1> ChatME</h1>
            <div className={classes.search}>
              <input
                type="text"
                placeholder="Search for users"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyUp={handleKey}
              />

              <CiSearch />
            </div>
            <div>
              <Link href="/">HOME</Link>
              <Link href="/">CHAT</Link>
              <Link href="/">CONTACTS</Link>
              <Link href="/">SETTINGS</Link>
              <Link href="/">FAQS</Link>
            </div>
          </div>

          {authContext?.photoURL ? (
            <img
              className={classes.img}
              referrerPolicy="no-referrer"
              src={authContext?.photoURL}
              alt=""
            />
          ) : (
            <div className="avatar">
              <RxAvatar />
            </div>
          )}

          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className={classes.main}>
          <Aside />
          <Message />
        </div>
      </main>
    </searchContext.Provider>
  );
};

export default chatMe;
