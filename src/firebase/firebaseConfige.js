// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQHSx0-UgJPhXlYmbMpQvreRn9TP0OsXw",
  authDomain: "mykitchenexam.firebaseapp.com",
  projectId: "mykitchenexam",
  storageBucket: "mykitchenexam.appspot.com",
  messagingSenderId: "760161794942",
  appId: "1:760161794942:web:73fe0480150c0c0e2b912f",
  measurementId: "G-HM3LPRD5VP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export let auth = getAuth(app);
export let db = getFirestore(app);
