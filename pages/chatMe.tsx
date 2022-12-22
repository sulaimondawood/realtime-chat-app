import React from "react";
import Aside from "../src/components/Aside";
import Message from "../src/components/Message";
import classes from "../styles/screens/chatMe.module.css";
import Profile from "../src/components/Profile";

const chatMe = () => {
  return (
    <main className={classes.grand}>
      <div className={classes.top}>
        <h1> ChatME</h1>
        <button>Logout</button>
      </div>

      <div className={classes.top_2}>
        <div className={classes.search}>
          <input type="text" placeholder="Search" />
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.82422 17C14.2425 17 17.8242 13.4183 17.8242 9C17.8242 4.58172 14.2425 1 9.82422 1C5.40594 1 1.82422 4.58172 1.82422 9C1.82422 13.4183 5.40594 17 9.82422 17Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.1742 18.9999L17.8242 14.6499"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div className={classes.btns}>
          <button>CLEAR CHAT</button>
          <button>MORE</button>
        </div>
      </div>
      <div className={classes.main}>
        <Aside />
        <Message />
      </div>
    </main>
  );
};

export default chatMe;
