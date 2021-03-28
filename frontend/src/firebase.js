
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDubd5kSNeSKvezP2Yd2Ll2N5hH4JPG_MM",
    authDomain: "hope-plants-dbab9.firebaseapp.com",
    projectId: "hope-plants-dbab9",
    storageBucket: "hope-plants-dbab9.appspot.com",
    messagingSenderId: "107011253813",
    appId: "1:107011253813:web:cefc8cf4e708e5c889f37c",
    measurementId: "G-F5T4RC0E2P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
export const fbprovider = new firebase.auth.FacebookAuthProvider();