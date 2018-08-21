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
import firebase, { database } from 'firebase';

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

  writeData = (schedule) => {
    const userId = sessionStorage.getItem('userId');
    if(this.state.isSignedIn) {
      firebase.database().ref('users/' + userId + "/schedules").set({
        schedule
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
          path="/multiweek"
          render={(props) => <MultiWeek />}
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
              writeData={this.writeData.bind(this)} 
              isSignedIn={this.state.isSignedIn}
              // retrieveData={this.retrieveData.bind(this)}
            />}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
