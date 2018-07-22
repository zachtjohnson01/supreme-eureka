import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Navbar.css";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});


// import axios from "axios";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <section className="navbar-title">
                    <h1 className="heading">Supreme Eureka</h1>
                </section>
                <section className="navbar-options">
                    <section className="navbar-section">
                        <h1 className="heading">Test</h1>
                    </section>
                    <section className="navbar-section">
                        <h1 className="heading">Test</h1>
                    </section>
                    <section className="navbar-section">
                        <h1 className="heading">Test</h1>
                    </section>
                </section>
            </nav>
        )
    }

}

export default Navbar;