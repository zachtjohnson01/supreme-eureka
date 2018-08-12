
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
    authDomain: "supreme-eureka.firebaseapp.com",
    databaseURL: "https://supreme-eureka.firebaseio.com"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;