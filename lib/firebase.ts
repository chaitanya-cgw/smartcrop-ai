import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBm0DtNxPt-RnR6V5tRFpwgaR5ExP4Cbi4",
  authDomain: "smartcrop-ai.firebaseapp.com",
  projectId: "smartcrop-ai",
  storageBucket: "smartcrop-ai.firebasestorage.app",
  messagingSenderId: "754082544200",
  appId: "1:754082544200:web:a172d8b0c8e9748ffb367d",
  measurementId: "G-B3QLQQLG3T"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();