// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxXnTAuxMKaKPiFo6i_EF04gyE6DfOj_w",
  authDomain: "trek-gram-image-bucket.firebaseapp.com",
  projectId: "trek-gram-image-bucket",
  storageBucket: "trek-gram-image-bucket.appspot.com",
  messagingSenderId: "1041979236774",
  appId: "1:1041979236774:web:f4e6594d68cca14827ef67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);