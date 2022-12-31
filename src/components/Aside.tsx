import React, { useContext, useEffect, useState } from "react";
import classes from "../../styles/components/aside.module.css";
import Search from "../../src/assets/search.svg";
import RecentMessage from "./RecentMessage";
import Image from "../../src/assets/photo.jpeg";
import { searchContext } from "../../pages/chat-me";
import { authProvider } from "./AuthProvider";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { chatProvider } from "./ChatContext";
import { RxAvatar } from "react-icons/rx";
const Aside = () => {
  // state
  const [userSnap, setUserSnap] = useState("");
  const [idFromSnap, setIdFromSnap] = useState([]);
  // state
  const user2: any = useContext(searchContext);
  // useContext for search input
  const {
    isLoadingUser,
    isLoadedUser,
    setIsLoadedUser,
    setIsLoadingUser,
    error,
    setUserName,
  }: any = useContext(searchContext);

  // console.log(error);

  // useContext for current User
  const { authContext } = useContext(authProvider);
  // useContext for current User
  const { state, dispatch } = useContext(chatProvider);
  // console.log(authContext.uid, user2.user.uid);

  const handleSetUser = (user: {}) => {
    dispatch({ type: "SET_USER", payload: user });
    // console.log(state);
  };

  // let combinedID: string;
  const handleSearchedUser = async () => {
    setUserName("");
    setIsLoadedUser(false);

    const combinedID =
      authContext.uid > user2.user.uid
        ? authContext.uid + user2.user.uid
        : user2.user.uid + authContext.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] });
      }

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

      // console.log("Try Ctach");
    } catch (error) {
      // console.log("errroorrrrr!!!!!!!");
    }
  };
  useEffect(() => {
    const snapLoads = () => {
      const unsub = onSnapshot(doc(db, "userChats", authContext.uid), (doc) => {
        // setIdFromSnap();
        setUserSnap(doc.data() as any);
        // console.log(userSnap);
      });
    };

    authContext.uid && snapLoads();
  }, [authContext?.uid]);

  return (
    <section className={classes.aside}>
      {isLoadingUser && <p>Loadinng</p>}
      {isLoadedUser && (
        <div className={classes.msg} onClick={handleSearchedUser}>
          {user2?.user.photoURL ? (
            <img
              className={classes.img}
              src={user2?.user.photoURL}
              referrerPolicy="no-referrer"
              alt=""
            />
          ) : (
            <div className="avatar">
              <RxAvatar />
            </div>
          )}

          <p className={classes.msg_name}>
            {user2?.user.displayName
              ? user2?.user.displayName
              : "User Not Found"}
          </p>
        </div>
      )}
      {error && <p>No user found!</p>}
      <div className={classes.btm}>
        <div className={classes.top}>
          <div className={classes.recent_msgs}>
            {authContext?.uid &&
              Object?.entries(userSnap as any)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((item: any) => {
                  return (
                    <RecentMessage
                      key={item[0]}
                      displayName={item[1].userInfo?.displayName}
                      photoURL={item[1]?.userInfo?.photoURL}
                      msg={item[1]?.lastMessage?.message}
                      date={item[1]?.userInfo?.date}
                      clickMe={() => handleSetUser(item[1]?.userInfo)}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aside;
