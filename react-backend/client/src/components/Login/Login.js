// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Modal from "../UI/Modal/Modal";

// Configure Firebase.
const config = {
    apiKey: "AIzaSyBe4LpKKm48PuMtTsaPmMPTfK4JXTnMxYA",
    authDomain: "supreme-eureka.firebaseapp.com",
    databaseURL: "https://supreme-eureka.firebaseio.com"
    // ...
};
firebase.initializeApp(config);

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false
        }
        this.signedIn = props.signedIn;
        this.signedOut = props.signedOut;
        this.setUserName = props.setUserName;
        this.hideLoginHandler = props.hideLoginHandler;
        this.uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
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
    


    componentDidMount = () => {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isSignedIn: !!user});
            // console.log(user.displayName)
            console.log('isSignedIn: ' + this.state.isSignedIn)
            this.signedIn(!!user);
            this.setUserName(user.displayName);
        });
    }
    
    componentWillUnmount = () => {
        this.unregisterAuthObserver();
    }
    
    logout = () => {
        firebase.auth().signOut().then( () => {
            console.log("Signed out");
            // {this.hideLoginHandler.bind(this)};
            // this.setUserName('');
            // this.signedIn(false);
        });
    }

  render() {
    return (
      <div className="login-popup-modal">
        <Modal 
        show={this.props.showLogin}
        modalClosed={this.props.hideLoginHandler}
        >
            {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
            <div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            }
            {this.state.isSignedIn &&
                <div>
                    <a onClick={this.logout}>Are you sure?</a>
                </div>
            }
        </Modal>
      </div>
    );
  }
}


export default Login;