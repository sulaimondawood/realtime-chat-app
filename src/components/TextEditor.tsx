// import classes from "../../styles/components/textEditor.module.css";
import classes from "../../styles/components/textEditor.module.css";
const TextEditor = () => {
  return (
    <div className={classes.text_editor}>
      <div className={classes.form}>
        <form>
          <input type="text" placeholder="Type a message" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default TextEditor;
