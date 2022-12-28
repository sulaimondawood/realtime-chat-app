import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "../../styles/components/message.module.css";
import Image from "../../src/assets/photo.jpeg";
import TextEditor from "./TextEditor";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { chatProvider } from "./ChatContext";
import { authProvider } from "./AuthProvider";
const Message = () => {
  const [chatMsgs, setChatMsgs] = useState([]);

  const { authContext } = useContext(authProvider);

  const { state } = useContext(chatProvider);

  useEffect(() => {
    const getMyChats = () => {
      const unsub = onSnapshot(doc(db, "chats", state.userID), (doc) => {
        console.log("Current data: ", doc.data());
        const chatsFrmDB = doc.data();
        doc.exists() && setChatMsgs(chatsFrmDB?.messages);
        console.log(chatMsgs);
      });
    };

    state.userID && getMyChats();
  }, [state.userID]);

  const refLatestMsg = useRef(null);
  refLatestMsg.current?.scrollIntoView({ behaviour: "smooth" });

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
        <div className={classes.msgs_wrp}>
          {chatMsgs.map(
            (item: {
              date: any;
              id: string;
              message: string;
              senderID: string;
              photoURL: string;
            }) => {
              return (
                <div
                  ref={refLatestMsg}
                  className={`${classes.msgs} ${
                    authContext.uid !== item.senderID && classes.recipient
                  } `}
                >
                  <img
                    src={
                      authContext.uid === item.senderID
                        ? authContext.photoURL
                        : item.photoURL
                    }
                    alt=""
                  />
                  <p
                    className={`${classes.msg} ${
                      authContext.uid === item.senderID
                        ? classes.owner_msg
                        : classes.recipient_msg
                    }`}
                  >
                    {item.message}
                  </p>
                </div>
              );
            }
          )}
          {/* <div className={classes.msgs}>
            <img src={Image.src} alt="" />
            <p className={classes.msg}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Assumenda iure, magnam quasi delectus maxime vero eveniet
              voluptatum modi id odit!
            </p>
          </div> */}
        </div>
        <TextEditor />
      </div>
    </section>
  );
};

export default Message;
