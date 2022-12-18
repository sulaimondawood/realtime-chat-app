import React from "react";
import Aside from "../src/components/Aside";
import Message from "../src/components/Message";
import classes from "../styles/screens/chatMe.module.css";
import Profile from "../src/components/Profile";

const chatMe = () => {
  return (
    <main className={classes.main}>
      <Aside />
      <Message />
      <Profile />
    </main>
  );
};

export default chatMe;
