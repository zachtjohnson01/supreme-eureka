import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MultiWeek from "./components/MultiWeek/MultiWeek";
import Schedule from "./components/Schedule/Schedule";
import GroceryTrip from "./components/GroceryTrip/GroceryTrip";
import Login from "./components/Login/Login";
// import firebase, { database } from 'firebase';
import moment from 'moment';
import { base } from './base';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      isSignedIn: false,
      userName: ''
    }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
    fetch('/')
  }
  hideLoginHandler = (e) => {
    console.log("Hiding login handler");
    // e.preventDefault();
    this.setState({
      showLogin: false
    });
  };

  showLoginHandler = (e) => {
    console.log("Setting show login");
    e.preventDefault();
    this.setState({
      showLogin: true
    });
  };

  signedIn = (status) => {
    this.setState({
      isSignedIn: status
    })
  }

  signedOut = () => {
    this.setState({
      isSignedIn: false
    })
  }

  setUserName = (name) => {
    this.setState({
      userName: name
    })

  }


  retrieveData = () => {
    const userId = sessionStorage.getItem('userId');
    if(this.state.isSignedIn) {
      base.ref('users/' + userId).on('value', function(snapshot) {
        // console.log('true');
        console.log(snapshot.exists());
        // console.log(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      })
    }
  }
  
  // retrieveData = () => {
  //   const userId = sessionStorage.getItem('userId');
  //   firebase.database().ref('users/' + userId + "/schedules").on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     if (!snapshot.val()) {
  //       let data = snapshot.val();
  //       return data;
  //     }
  //   })
  // }

  render() {
    return (
      <div className="App">
        <Navbar 
          showLoginHandler={this.showLoginHandler}
          showLogin={this.state.showLogin}
          isSignedIn={this.state.isSignedIn}
          userName={this.state.userName}
        />
        <Login
          showLogin={this.state.showLogin}
          hideLoginHandler={this.hideLoginHandler}
          signedIn={this.signedIn.bind(this)}
          signedOut={this.signedOut.bind(this)}
          setUserName={this.setUserName.bind(this)}
        />
        <Route
          path="/grocerytrip"
          render={(props) => <GroceryTrip />}
        />
        <Route
          path="/login"
          render={(props) => <Login />}
        />
        <Route
          path="/schedule"
          render={(props) => 
            <Schedule 
              isSignedIn={this.state.isSignedIn}
              retrieveData={this.retrieveData.bind(this)}
            />}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
