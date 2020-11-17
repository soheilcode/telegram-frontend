import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPCkmaZj65tc9mLLqTPMYh_bT5OA-h_AI",
    authDomain: "telegram-ba69e.firebaseapp.com",
    databaseURL: "https://telegram-ba69e.firebaseio.com",
    projectId: "telegram-ba69e",
    storageBucket: "telegram-ba69e.appspot.com",
    messagingSenderId: "825533110713",
    appId: "1:825533110713:web:6352b87a59591fbf503e68",
    measurementId: "G-W9MLB43J26"
};
const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()
const auth = firebase.auth()
export { db, auth }