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
  // console.log(user2?.user.id);

  const handleSearchedUser = async () => {
    setUserName("");
    setIsLoadingUser(false);

    const combinedID =
      authContext.uid > user2.user.id
        ? authContext.uid + user2.user.id
        : user2.user.id + authContext.uid;

    const res = await getDoc(doc(db, "chats", combinedID));
    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedID), { messages: [] });
      await updateDoc(doc(db, "usersChats", user2.id), { name: "me" });
    }
  };

  return (
    <section className={classes.aside}>
      {isLoadingUser && (
        <div className={classes.msg} onClick={handleSearchedUser}>
          <img
            className={classes.img}
            src={user2?.user.photo}
            referrerpolicy="no-referrer"
            alt=""
          />
          <p className={classes.msg_name}>{user2?.user.name}</p>
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
