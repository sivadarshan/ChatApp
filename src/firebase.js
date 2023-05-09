import firebase from "firebase/app";
import "firebase/auth";


// Exporting auth created by firebase that includes the apikeys,authdomain....
export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyBbOZAjc08IAhar1dVvxdfR_gQgtkKA3Xk",
    authDomain: "chatit-a75a3.firebaseapp.com",
    projectId: "chatit-a75a3",
    storageBucket: "chatit-a75a3.appspot.com",
    messagingSenderId: "131266581148",
    appId: "1:131266581148:web:b7f4915cc09287587c1359"
  }).auth();

