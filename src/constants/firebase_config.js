// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKeEIMHR-PIj_Ho8khnW2W08dnSLktFvE",
  authDomain: "kinderlink-chatting.firebaseapp.com",
  databaseURL: "https://kinderlink-chatting-default-rtdb.firebaseio.com",
  projectId: "kinderlink-chatting",
  storageBucket: "kinderlink-chatting.appspot.com",
  messagingSenderId: "875904785169",
  appId: "1:875904785169:web:23ce18fa96f8bfa57b0ab0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);