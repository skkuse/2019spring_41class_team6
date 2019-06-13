import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBiCCOhDhhbkaL6XP95zGoRt0zQ7MbJgYc",
  authDomain: "indi-market.firebaseapp.com",
  databaseURL: "https://indi-market.firebaseio.com",
  projectId: "indi-market",
  storageBucket: "indi-market.appspot.com",
  messagingSenderId: "867548987294",
  appId: "1:867548987294:web:7d7a54a9b6c9b082"
});

export const db = firebase.firestore();

export const storage = firebase.storage();

export const fb = firebase;
