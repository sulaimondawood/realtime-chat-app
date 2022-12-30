import React, { useContext } from "react";
import Image from "../../src/assets/photo.jpeg";
import classes from "../../styles/components/profile.module.css";
import { authProvider } from "./AuthProvider";
const Profile = () => {
  const { authContext } = useContext(authProvider);
  // console.log(authContext);

  return (
    <div className={classes.profile}>
      <div className={classes.top}>
        <p>Profile</p>
        <p>😎</p>
      </div>
      <div>
        <img src={authContext.photoURL} alt="" />
        {/* <img src={Image.src} alt="" /> */}
        {/* <p className={classes.name}>{authContext.displayName}</p> */}
        <p className={classes.name}>Dawood Sulaimon</p>
        <p>{authContext.email}</p>
      </div>
    </div>
  );
};

export default Profile;
