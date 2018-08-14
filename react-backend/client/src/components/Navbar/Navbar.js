import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import "../../App.css";
import "./Navbar.css";
import WebFont from 'webfontloader';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {loginWithGoogle} from "../helpers/auth";
import {firebaseAuth} from "../config/constants";

const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});


// import axios from "axios";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.userName = props.userName;
        this.isSignedIn = props.isSignedIn;
    }
    
    render() {

        return (
            <nav className="navbar">
                <section className="navbar-title">
                    <h1 className="heading">Supreme Eureka</h1>
                </section>
                <section className="navbar-options">
                    <section className="navbar-section">
                        <h1 className="heading">
                            {this.props.isSignedIn && 
                            "Welcome, " + this.props.userName + "!"
                            } 
                        </h1>
                    </section>
                    <section className="navbar-section">
                        <Link to="/multiweek" className="logo btn btn-link">
                            <h1 className="heading">The Week</h1>
                        </Link>
                    </section>
                    <section className="navbar-section">
                        <Link to="/grocerytrip" className="logo btn btl-link">
                            <h1 className="heading">Grocery Trip</h1>
                        </Link>
                    </section>
                    <section className="navbar-section">

                            <Link to="/login" className="logo btn btl-link" onClick={this.props.showLoginHandler}>
                                <h1 className="heading"> 
                                    {!this.props.isSignedIn && "Login"}
                                    {this.props.isSignedIn && "Sign Out"}
                                </h1>
                            </Link>
                    </section>
                </section>
            </nav>
        )
    }

}

export default withRouter(Navbar);