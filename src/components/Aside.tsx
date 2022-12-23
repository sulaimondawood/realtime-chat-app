import React from "react";
import classes from "../../styles/components/aside.module.css";
import Search from "../../src/assets/search.svg";
import RecentMessage from "./RecentMessage";
import Image from "../../src/assets/photo.jpeg";

const Aside = () => {
  return (
    <section className={classes.aside}>
      <div className={classes.msg}>
        <img className={classes.img} src={Image.src} alt="" />
        <p className={classes.msg_name}>Dawood Sulaimon</p>
      </div>

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
