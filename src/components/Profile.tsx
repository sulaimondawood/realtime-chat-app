import React from "react";
import Image from "../../src/assets/photo.jpeg";
import classes from "../../styles/components/profile.module.css";

const Profile = () => {
  return (
    <div className={classes.profile}>
      <div className={classes.top}>
        <p>Profile</p>
        <p>😎</p>
      </div>
      <div>
        <img src={Image.src} alt="" />
        <p className={classes.name}>Dawood Sulaimon</p>
        <p>sulaimondakddm@gmail.com</p>
      </div>
    </div>
  );
};

export default Profile;
