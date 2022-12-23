import React, { useContext } from "react";
import classes from "../../styles/components/aside.module.css";
import Search from "../../src/assets/search.svg";
import RecentMessage from "./RecentMessage";
import Image from "../../src/assets/photo.jpeg";
import { searchContext } from "../../pages/chatMe";
const Aside = () => {
  // const { name, photo }: any = useContext(searchContext);
  const me: any = useContext(searchContext);
  const { isLoadingUser, setIsLoadingUser, error, setUserName }: any =
    useContext(searchContext);

  // console.log(us);
  const handleClearS = () => {
    setUserName("");
    setIsLoadingUser(false);
  };
  return (
    <section className={classes.aside}>
      {isLoadingUser && (
        <div className={classes.msg} onClick={handleClearS}>
          <img
            className={classes.img}
            src={me?.user.photo}
            referrerpolicy="no-referrer"
            alt=""
          />
          <p className={classes.msg_name}>{me?.user.name}</p>
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
