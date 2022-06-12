import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseconfig = firebase.initializeApp( {
    apiKey: "AIzaSyC4OyPp38sGXYsAtziY9nSv2KNbvxsdC0U",
    authDomain: "villasanamed.firebaseapp.com",
    projectId: "villasanamed",
    storageBucket: "villasanamed.appspot.com",
    messagingSenderId: "350646001030",
    appId: "1:350646001030:web:8066d0437c3925f152a007"
});


export default firebaseconfig;


