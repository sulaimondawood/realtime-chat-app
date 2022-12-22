import React from "react";
import classes from "../../styles/components/message.module.css";
import Image from "../../src/assets/photo.jpeg";
import TextEditor from "./TextEditor";
const Message = () => {
  return (
    <section className={classes.message}>
      {/* <div className={classes.top}>
        <div>
          <img className={classes.img} src={Image.src} alt="" />
          <div>
            <p className={classes.name}>Dawood</p>
            <p className={classes.seen}> last seen today</p>
          </div>
        </div>

        <div className={classes.dots}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> */}
      <div className={classes.btm}>
        {/* <p className={classes.date}>Augus 21</p> */}
        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>

        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>
        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>
        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>
        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>
        <div className={classes.msgs}>
          <img src={Image.src} alt="" />
          <p className={classes.msg}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda
            iure, magnam quasi delectus maxime vero eveniet voluptatum modi id
            odit!
          </p>
        </div>
        <TextEditor />
      </div>
    </section>
  );
};

export default Message;
