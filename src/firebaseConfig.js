// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV6QX6NrhOsTt_HcZMDKPLwq--PvjdkEA",
  authDomain: "coder29-blogs.firebaseapp.com",
  projectId: "coder29-blogs",
  storageBucket: "coder29-blogs.appspot.com",
  messagingSenderId: "971950400665",
  appId: "1:971950400665:web:5a6d35630afc2545790408",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
