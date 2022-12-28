import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth as authConfig } from "../../firebase/config";
import { authProvider } from "./AuthProvider";

interface IProps {
  children: React.ReactNode;
}

type Action = {
  type: "SET_USER";
  payload: {
    uid: string;
  };
};

type State = {
  user: {};
  userID: string;
};

export const chatProvider = createContext<string | any>("");
// console.log(authContext);

const ChatProvider = ({ children }: IProps) => {
  const { authContext } = useContext(authProvider);
  const initialState = {
    user: {},
    userID: "",
  };

  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          user: action.payload,
          userID:
            authContext.uid > action.payload.uid
              ? authContext.uid + action.payload.uid
              : action.payload.uid + authContext.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <chatProvider.Provider value={{ state, dispatch }}>
      {children}
    </chatProvider.Provider>
  );
};

export default ChatProvider;
