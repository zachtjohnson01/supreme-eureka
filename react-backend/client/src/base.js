import Rebase from 're-base';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
    authDomain: "supreme-eureka.firebaseapp.com",
    databaseURL: "https://supreme-eureka.firebaseio.com"
    // ...
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())

export { base }