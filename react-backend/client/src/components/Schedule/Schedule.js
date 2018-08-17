import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Schedule.css";
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});

class Schedule extends Component {
    constructor(props) {
        super();
        this.state = {
            monday_breakfast: true,
            monday_lunch: true, 
            monday_dinner: true,
            tuesday_breakfast: true,
            tuesday_lunch: true, 
            tuesday_dinner: true,
            wednesday_breakfast: true,
            wednesday_lunch: true, 
            wednesday_dinner: true,
            thursday_breakfast: true,
            thursday_lunch: true, 
            thursday_dinner: true,
            friday_breakfast: true,
            friday_lunch: true, 
            friday_dinner: true,
            saturday_breakfast: true,
            saturday_lunch: true, 
            saturday_dinner: true,
            sunday_breakfast: true,
            sunday_lunch: true, 
            sunday_dinner: true
        }
    }

    toggleMeal = (event) => {
        let state_item = event.target.getAttribute("data-tag");
        console.log(state_item);
        this.setState(prevState => {
            state_item: !prevState.state_item
        })
    }

    render() {
        return (
            <div className="container">
                <div className="item auto person">
                    <div className="input-title">
                        Person 1
                    </div>
                    <div className="input-input">
                        <input type="text" name="name" value="name" />
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Monday</div>
                    <div className="meal-container">
                        <button className={this.state.monday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Tuesday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Wednesday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Thursday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Friday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Saturday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Sunday</div>
                    <div className="meal-container">
                        <button className="clicked">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className="clicked">Dinner</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Schedule;