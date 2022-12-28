import React from "react";
import classes from "../../styles/components/recentMsg.module.css";
import Image from "../../src/assets/photo.jpeg";

const RecentMessage = ({ displayName, photoURL, date, clickMe, msg }: any) => {
  return (
    <div onClick={clickMe} className={classes.msg}>
      {/* <img className={classes.img} src={Image.src} alt="" /> */}
      <img className={classes.img} src={photoURL} alt="" />
      <div className={classes.msg_contents}>
        {/* <p className={classes.msg_name}>Dawood Sulaimon</p> */}
        <p className={classes.msg_name}>{displayName}</p>
        <p className={classes.msg_msg}>{msg}</p>
      </div>
      <div className={classes.time_wrp}>
        <p className={classes.dates}>02:10</p>
        {/* <p className={classes.no}></p> */}
        {/* <p className={classes.nos}>3</p> */}
      </div>
    </div>
  );
};

export default RecentMessage;
