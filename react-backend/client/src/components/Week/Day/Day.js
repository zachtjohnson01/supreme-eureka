import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../../App.css";
import "./Day.css";
import Meal from "./Meal/Meal";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});

// import axios from "axios";

class Day extends Component {
    constructor(props){
        super(props);
        this.state = {
            breakfast: true,
            lunch: true,
            dinner: true
        }
    }

    render() {

        return (
            <div className="day">
                <div className="day-title">{this.props.day_name}</div>
                <Meal meal_name={"Breakfast"}/>
                <Meal meal_name={"Lunch"}/>
                <Meal meal_name={"Dinner"}/>
            </div>
        )
    }

}

export default Day;