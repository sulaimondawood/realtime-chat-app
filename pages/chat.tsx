import React from "react";
import WIP from "../src/assets/wip.png";
import classes from "../styles/components/wip.module.css";
const Chat = () => {
  return (
    <div className={classes.wip}>
      <img src={WIP.src} alt="" />
    </div>
  );
};

export default Chat;
