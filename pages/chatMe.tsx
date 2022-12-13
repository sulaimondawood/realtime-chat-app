import React from "react";
import Aside from "../src/components/Aside";
import Message from "../src/components/Message";
import classes from "../styles/screens/chatMe.module.css";
const chatMe = () => {
  return (
    <main className={classes.main}>
      <Aside />
      <Message />
    </main>
  );
};

export default chatMe;
