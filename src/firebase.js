import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnrGEbzBojCAXl9NA94bCQAt8Zt-zm8Pw",
  authDomain: "small-town-422d3.firebaseapp.com",
  projectId: "small-town-422d3",
  storageBucket: "small-town-422d3.firebasestorage.app",
  messagingSenderId: "1028795159542",
  appId: "1:1028795159542:web:03f8d31e275a9ad581add7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
