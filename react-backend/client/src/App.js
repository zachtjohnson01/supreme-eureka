import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MultiWeek from "./components/MultiWeek/MultiWeek";

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({users}));
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <MultiWeek />
        <Footer />
      </div>
    );
  }
}

export default App;
