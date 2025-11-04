import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeiyTVoKQOT4s5cxmzgJee-qFAU1xvhtw",
  authDomain: "foodiezone-auth.firebaseapp.com",
  projectId: "foodiezone-auth",
  storageBucket: "foodiezone-auth.appspot.com",
  messagingSenderId: "935911152235",
  appId: "1:935911152235:web:d4ba3a37b7e40cfdac2f2e",
  measurementId: "G-33VPRYR2BE"
};


export const app = initializeApp(firebaseConfig);
export const Auth=getAuth(app)
export const analytics = getAnalytics(app);


