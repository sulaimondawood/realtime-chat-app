import React from "react";
import classes from "../../styles/components/layout.module.css";
import Aside from "../components/Aside";
import Message from "../components/Message";

interface IChildren {
  children: React.ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return (
    <div className={classes.layout}>
      <Aside />
      <Message />
    </div>
  );
};

export default Layout;
