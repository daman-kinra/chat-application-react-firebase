import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAMCtdO17-GDtC2sCQzeaO3_06r2Lp61zE",
  authDomain: "group-chat-95b10.firebaseapp.com",
  projectId: "group-chat-95b10",
  storageBucket: "group-chat-95b10.appspot.com",
  messagingSenderId: "893331731762",
  appId: "1:893331731762:web:f9f17c89714e394f03532b",
};
const app = firebase.initializeApp(firebaseConfig);

const fieldValue = firebase.firestore.FieldValue;
const provider = new firebase.auth.GoogleAuthProvider();
export { app, provider, fieldValue };
