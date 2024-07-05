// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCziZLQ3440dSYW947fAV4TUXxeFdudjr4",
    authDomain: "firereactjs.firebaseapp.com",
    projectId: "firereactjs",
    storageBucket: "firereactjs.appspot.com",
    messagingSenderId: "742355534889",
    appId: "1:742355534889:web:83b2bb019a9309efb60838"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export { auth, db, storage }
// npm install -g firebase-tools   second command for firebase..........!