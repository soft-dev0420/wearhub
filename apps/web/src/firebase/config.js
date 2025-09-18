// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2PCSZW2whermccFX4fKNv9M8lYcbps0A",
  authDomain: "wearhub-c4c0f.firebaseapp.com",
  projectId: "wearhub-c4c0f",
  storageBucket: "wearhub-c4c0f.firebasestorage.app",
  messagingSenderId: "241901182047",
  appId: "1:241901182047:web:37c7c3ab8ca01a34014fea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
export default app;   