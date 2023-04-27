import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const APP = initializeApp({
    apiKey: "AIzaSyDQ0Cu0O_uvO5Mx5yp1bXgeBTYK_fsvb2M",
    authDomain: "lg-homework.firebaseapp.com",
    projectId: "lg-homework",
    storageBucket: "lg-homework.appspot.com",
    messagingSenderId: "987819168557",
    appId: "1:987819168557:web:99d564aa2e864fc20e79a4",
    measurementId: "G-QYWWKWBW6V"
  });

export const database = () => {
	return getFirestore(APP);
};