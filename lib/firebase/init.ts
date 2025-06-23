// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM5Iwp2IFVvkxR-R5e_fQVgToFg40rP2g",
  authDomain: "dashboard-porsiai.firebaseapp.com",
  projectId: "dashboard-porsiai",
  storageBucket: "dashboard-porsiai.firebasestorage.app",
  messagingSenderId: "249166650815",
  appId: "1:249166650815:web:fc0ee33799eb458ba7d50a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;