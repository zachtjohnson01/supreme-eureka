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
// firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: undefined
        }
        this.signedIn = props.signedIn;
        this.signedOut = props.signedOut;
        this.setUserName = props.setUserName;
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isSignedIn: !!user});
            console.log(user.displayName)
            console.log(this.state.isSignedIn)
            this.signedIn(!!user);
            this.setUserName(user.displayName);
        });
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
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
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
            }
            {this.state.isSignedIn &&
                <div>
                    {firebase.auth().currentUser.displayName}
                    <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                </div>
            }
        </Modal>
      </div>
    );
  }
}

export default Login;