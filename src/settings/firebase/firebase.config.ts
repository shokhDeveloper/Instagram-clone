import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDPyY43n2c5kaQKmUkCqmy4x-jV6OW5j3M",
  authDomain: "instagram-bfb84.firebaseapp.com",
  projectId: "instagram-bfb84",
  storageBucket: "instagram-bfb84.appspot.com",
  messagingSenderId: "1098348848285",
  appId: "1:1098348848285:web:0ab890bde3939697e76074",
  measurementId: "G-K1XWRSGXC9"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
