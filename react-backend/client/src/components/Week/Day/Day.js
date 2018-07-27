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
        }
    }

    render() {

        return (
            <div className="day">
                <div className="day-title">
                    {this.props.day_name}
                </div>

                <Meal 
                    meal_name={"Breakfast"}
                    changebreakfast={this.props.changeBreakfast}
                    />
                <Meal 
                    meal_name={"Lunch"}
                    changelunch={this.props.changeLunch}
                    />
                <Meal 
                    meal_name={"Dinner"}
                    changedinner={this.props.changeDinner}
                />
            </div>
        )
    }

}

export default Day;