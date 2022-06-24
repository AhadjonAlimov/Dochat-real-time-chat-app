// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = { // I don't use this config, but I'm keeping it here for reference. 
    apiKey: "AIzaSyBJOg9XOmWJ1cUuHrLIygD2Dvqs7fSJwqU",
    authDomain: "dochat-eec9e.firebaseapp.com",
    projectId: "dochat-eec9e",
    storageBucket: "dochat-eec9e.appspot.com",
    messagingSenderId: "645959591759",
    appId: "1:645959591759:web:1616b92b8460534ddb073a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

