import React, { useContext } from "react";
import classes from "../../styles/components/recentMsg.module.css";
import Image from "../../src/assets/photo.jpeg";
import { authProvider } from "./AuthProvider";
import { RxAvatar } from "react-icons/Rx";

const RecentMessage = ({ displayName, photoURL, date, clickMe, msg }: any) => {
  const { authContext } = useContext(authProvider);

  return (
    <div onClick={clickMe} className={classes.msg}>
      {authContext?.photoURL ? (
        <img className={classes.img} src={photoURL} alt="" />
      ) : (
        <div className="avatar">
          <RxAvatar />
        </div>
      )}
      <div className={classes.msg_contents}>
        <p className={classes.msg_name}>{displayName}</p>
        <p className={classes.msg_msg}>{msg}</p>
      </div>
    </div>
  );
};

export default RecentMessage;
