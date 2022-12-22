import React from "react";
import classes from "../../styles/components/recentMsg.module.css";
import Image from "../../src/assets/photo.jpeg";

const RecentMessage = () => {
  return (
    <div className={classes.msg}>
      <img className={classes.img} src={Image.src} alt="" />
      <div className={classes.msg_contents}>
        <p className={classes.msg_name}>Dawood Sulaimon</p>
        <p className={classes.msg_msg}>Hey there! how's it going over there</p>
      </div>
      <div className={classes.time_wrp}>
        <p className={classes.dates}>02:10</p>
        {/* <p className={classes.no}></p> */}
        <p className={classes.nos}>3</p>
      </div>
    </div>
  );
};

export default RecentMessage;
