import React from "react";
import classes from "../../styles/components/aside.module.css";
import Search from "../../src/assets/search.svg";
import RecentMessage from "./RecentMessage";
const Aside = () => {
  return (
    <section className={classes.aside}>
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

      <div className={classes.btm}>
        <div className={classes.top}>
          <h2>
            Inbox <span>4 new</span>
          </h2>

          <p className={classes.recent}>Recent Chats</p>
          <div className={classes.recent_msgs}>
            <RecentMessage />
            <RecentMessage />
            <RecentMessage />
            <RecentMessage />
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
