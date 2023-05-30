import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDz_a-9wuekT_qpe_H9K87_wW4Ai5KhxLY",
    authDomain: "auth-dev-abecb.firebaseapp.com",
    projectId: "auth-dev-abecb",
    storageBucket: "auth-dev-abecb.appspot.com",
    messagingSenderId: "1074095174911",
    appId: "1:1074095174911:web:e432e9d59ce582fe01c8ca"
});

export const auth = app.auth()
export const db = getFirestore(app)

export const firebaseApp = app;


export default app;