import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
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
                        <Link to="/multiweek" className="logo btn btn-link">
                            <h1 className="heading">The Week</h1>
                        </Link>
                    </section>
                    <section className="navbar-section">
                        <Link to="/grocerytrip" classname="logo btn btl-link">
                            <h1 className="heading">Grocery Trip</h1>
                        </Link>
                    </section>
                    <section className="navbar-section">
                        <h1 className="heading">Test</h1>
                    </section>
                </section>
            </nav>
        )
    }

}

export default withRouter(Navbar);