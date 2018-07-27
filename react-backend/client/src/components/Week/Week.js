import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Week.css";
import Day from "./Day/Day";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});

// import axios from "axios";

class Week extends Component {
    constructor() {
        super();
        this.state = {
            breakfast: 7,
            lunch: 7,
            dinner: 7
        }
    }

    onChangeBreakfastCount(change) {
        let updatebreakfast = this.state.breakfast + change
        this.setState(prevState => ({
            breakfast: updatebreakfast
        }))
    };
    onChangeLunchCount(change) {
        let updatelunch = this.state.lunch + change
        this.setState(prevState => ({
            lunch: updatelunch
        }))
    };
    onChangeDinnerCount(change) {
        let updatedinner = this.state.dinner + change
        this.setState(prevState => ({
            dinner: updatedinner
        }))
    };


    
    render() {

        return (

            <div className="container">
                <div className="week-container">
                    <Day 
                        day_name={"Monday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Tuesday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Wednesday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Thursday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Friday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Saturday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                        />
                    <Day 
                        day_name={"Sunday"}
                        changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                        changeLunch={this.onChangeLunchCount.bind(this)}
                        changeDinner={this.onChangeDinnerCount.bind(this)}
                    />
                </div>
                <div className="totals-container">
                    <div>Total Breakfasts: {this.state.breakfast}</div>
                    <div>Total Lunches: {this.state.lunch}</div>
                    <div>Total Dinners: {this.state.dinner}</div>
                </div>
            </div>
        )
    }

}

export default Week;