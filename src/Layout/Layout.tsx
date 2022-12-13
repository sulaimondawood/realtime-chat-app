import React from "react";
import classes from "../../styles/components/layout.module.css";
import Aside from "../components/Aside";
import Message from "../components/Message";
import Profile from "../components/Profile";

interface IChildren {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return (
    <div className={classes.layout}>
      <Aside />
      <Message />
      <Profile />
    </div>
  );
};

export default Layout;
