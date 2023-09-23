import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBC2AJZbKcLXT-_5RJo1AA6ic2wUpxoDOI",
  authDomain: "ndmayecommpro.firebaseapp.com",
  projectId: "ndmayecommpro",
  storageBucket: "ndmayecommpro.appspot.com",
  messagingSenderId: "1000478491157",
  appId: "1:1000478491157:web:023964c18a3b8fd8c0041c"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app