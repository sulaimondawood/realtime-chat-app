import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import { db } from "../../firebase/config";
import classes from "../../styles/components/textEditor.module.css";
import { chatProvider } from "./ChatContext";
// import { v4 as uuid } from "uuid";
import { v4 as uuidv4 } from "uuid";
import { authProvider } from "./AuthProvider";
const TextEditor = () => {
  const [msg, setMsg] = useState("");
  const { state } = useContext(chatProvider);
  const { authContext } = useContext(authProvider);
  // console.log();

  const updateMsg = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "chats", state.userID), {
      messages: arrayUnion({
        id: uuidv4(),
        senderID: authContext.uid,
        message: msg,
        date: Timestamp.now(),
        photoURL: authContext.photoURL,
      }),
    });
    setMsg("");
  };

  return (
    <div className={classes.text_editor}>
      <div className={classes.form}>
        <form onSubmit={updateMsg}>
          <input
            type="text"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={updateMsg}>
            <RiSendPlaneLine />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;
