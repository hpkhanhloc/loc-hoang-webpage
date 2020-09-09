import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtoma61bVtFp7opWe0pCfeJMIs5lmdQPg",
  authDomain: "loc-hoang-webpage.firebaseapp.com",
  databaseURL: "https://loc-hoang-webpage.firebaseio.com",
  projectId: "loc-hoang-webpage",
  storageBucket: "loc-hoang-webpage.appspot.com",
  messagingSenderId: "250402644426",
  appId: "1:250402644426:web:a8396c69b606845e9caf33",
  measurementId: "G-ZYTG3PFRJG",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
