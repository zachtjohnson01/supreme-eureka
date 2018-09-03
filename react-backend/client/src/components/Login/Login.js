// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Modal from "../UI/Modal/Modal";
import "./Login.css";

// Configure Firebase.
const config = {
    apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
    authDomain: "supreme-eureka.firebaseapp.com",
    databaseURL: "https://supreme-eureka.firebaseio.com"
    // ...
};
// firebase.initializeApp(config);


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        }
        this.email;
        this.signedIn = props.signedIn;
        this.signedOut = props.signedOut;
        this.setUserName = props.setUserName;
        this.hideLoginHandler = props.hideLoginHandler;
        this.uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'redirect',
            // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
            // signInSuccessUrl: '/signedIn',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccess: () => false
            }
        };
    
    

    }

        // // Configure FirebaseUI.
        // uiConfig = {
        //     // Popup signin flow rather than redirect flow.
        //     signInFlow: 'popup',
        //     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        //     // signInSuccessUrl: '/signedIn',
        //     // We will display Google and Facebook as auth providers.
        //     signInOptions: [
        //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //         firebase.auth.FacebookAuthProvider.PROVIDER_ID
        //     ],
        //     callbacks: {
        //         signInSuccess: () => false
        //     }
        // }
    
    writeUserData = (userId, name, email, imageUrl) => {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            profile_picture: imageUrl
        })
    }

    componentDidMount = () => {
        if(!sessionStorage.getItem('userId')) {
            console.log('Setting default user');
            sessionStorage.setItem('userId','default')
        };
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isSignedIn: !!user});
            this.signedIn(!!user);
            if (user) {
                console.log('isSignedIn: ' + this.state.isSignedIn)
                this.setUserName(user.displayName);
                this.hideLoginHandler();
                var name, email, photoURL, uid;
                user.providerData.forEach(function(profile) {
                    name = profile.displayName;
                    email = profile.email;
                    photoURL = profile.photoURL;
                    // emailVerified = profile.emailVerified;
                    uid = profile.uid
                });
                // schedule = {};
                firebase.database().ref('users/' + user.uid).on('value', function(snapshot) {
                    // console.log('true');
                    if(snapshot.exists()) {
                        this.writeUserData(uid, name, email, photoURL);
                        console.log('Creating user')
                    } else {
                        console.log('User.uid: ' + user.uid)
                        console.log('User already created')
                    }
                  }, function (errorObject) {
                    console.log('The read failed: ' + errorObject.code);
                  })
                sessionStorage.setItem('userId', uid);
            } else {
                console.log('User not logged in');
            }
        })
    }
    
    componentWillUnmount = () => {
        this.unregisterAuthObserver();
    }
    
    logout = () => {
        firebase.auth().signOut().then( () => {
            console.log("Signed out");
            this.hideLoginHandler();
            sessionStorage.removeItem('userId');
        });
    }

  render() {
    return (
      <div className="login-popup-modal">
        <Modal 
        show={this.props.showLogin}
        modalClosed={this.hideLoginHandler}
        >
            {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
            <div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            }
            {this.state.isSignedIn &&
                <div onClick={this.logout.bind(this)} className="logoutConfirmation">
                    Are you sure you want to sign out?
                </div>
            }
        </Modal>
      </div>
    );
  }
}


export default Login;