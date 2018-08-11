
import firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
    authDomain: "supreme-eureka.firebaseapp.com",
    databaseURL: "https://supreme-eureka.firebaseio.com",
    projectId: "supreme-eureka",
    storageBucket: "supreme-eureka.appspot.com",
    messagingSenderId: "714618331132"
  };
firebase.initializeApp(config);
export default firebase;