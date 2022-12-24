import React, { useContext } from "react";
import classes from "../../styles/components/aside.module.css";
import Search from "../../src/assets/search.svg";
import RecentMessage from "./RecentMessage";
import Image from "../../src/assets/photo.jpeg";
import { searchContext } from "../../pages/chatMe";
import { authProvider } from "./AuthProvider";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
const Aside = () => {
  const user2: any = useContext(searchContext);

  // useContext for search input
  const { isLoadingUser, setIsLoadingUser, error, setUserName }: any =
    useContext(searchContext);
  // useContext for current User

  const { authContext } = useContext(authProvider);
  // useContext for current User
  console.log(authContext.uid, user2.user.uid);

  const handleSearchedUser = async () => {
    setUserName("");
    setIsLoadingUser(false);

    const combinedID =
      authContext.uid > user2.user.uid
        ? authContext.uid + user2.user.uid
        : user2.user.uid + authContext.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      // if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedID), { messages: [] });

      await updateDoc(doc(db, "userChats", authContext?.uid), {
        [combinedID + ".userInfo"]: {
          uid: user2?.user?.uid,
          photoURL: user2?.user?.photoURL,
          displayName: user2?.user?.displayName,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", user2?.user?.uid), {
        [combinedID + ".userInfo"]: {
          uid: authContext.uid,
          photoURL: authContext.photoURL,
          displayName: authContext.displayName,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });

      console.log("Try Ctach");
      // }
    } catch (error) {
      console.log("errroorrrrr!!!!!!!");
    }
  };

  return (
    <section className={classes.aside}>
      {isLoadingUser && (
        <div className={classes.msg} onClick={handleSearchedUser}>
          <img
            className={classes.img}
            src={user2?.user.photoURL}
            referrerPolicy="no-referrer"
            alt=""
          />
          <p className={classes.msg_name}>{user2?.user.displayName}</p>
        </div>
      )}
      {error && <p>No user found!</p>}
      <div className={classes.btm}>
        <div className={classes.top}>
          <div className={classes.recent_msgs}>
            <RecentMessage />
            <RecentMessage />
            <RecentMessage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aside;
