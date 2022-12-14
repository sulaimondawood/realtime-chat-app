import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlUB-rapvBcvJs73CB_jqvJv6X-JxBqNc",
  authDomain: "chat-app-8fd81.firebaseapp.com",
  projectId: "chat-app-8fd81",
  storageBucket: "chat-app-8fd81.appspot.com",
  messagingSenderId: "495993844879",
  appId: "1:495993844879:web:9f4fb70081104f1a0fecfa",
};

// if (!firebase.apps.length) {
// }
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const storageRef = ref(storage);
// export const db = getFirestore(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
