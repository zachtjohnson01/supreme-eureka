import React, { Component } from 'react';
import {Redirect, Route} from "react-router-dom";
import axios from "axios";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MultiWeek from "./components/MultiWeek/MultiWeek";
import GroceryTrip from "./components/GroceryTrip/GroceryTrip";

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
    fetch('/')
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Route 
          path="/multiweek"
          render={(props) => <MultiWeek />}
        />
        <Route
          path="/grocerytrip"
          render={(props) => <GroceryTrip />}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
