import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Schedule.css";
import WebFont from 'webfontloader';
import firebase, { database } from 'firebase';
import moment from 'moment';

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

    componentDidMount() {
        this.props.retrieveData();
        console.log(moment().week());
        let weeknum = moment().week();
        const userId = sessionStorage.getItem('userId');
        let data = {};
        if(this.props.isSignedIn) {
            // firebase.database().ref('users/' + userId + "/schedules/schedule").on("value", function(snapshot) {
            //     // console.log(snapshot.val());
            //     data = snapshot.val();
            //     // console.log(data.monday_breakfast);
            //     // let bfast = data.monday_breakfast;
            // }, function(errorObject) {
            //     console.log("The read failed: " + errorObject.code);
            // })
            firebase.database().ref('schedules/' + userId + "/" + weeknum).on("value", function(snapshot) {
                // console.log(snapshot.val());
                data = snapshot.val();
                // console.log(data.monday_breakfast);
                // let bfast = data.monday_breakfast;
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
            })
            this.setState({
                // monday_breakfast: data.monday_breakfast,
                // monday_lunch: data.monday_lunch, 
                // monday_dinner: data.monday_dinner,
                // tuesday_breakfast: data.tuesday_breakfast
                // tuesday_lunch: data.tuesday_lunch, 
                // tuesday_dinner: data.tuesday_dinner,
                // wednesday_breakfast: data.wednesday_breakfast,
                // wednesday_lunch: data.wednesday_lunch, 
                // wednesday_dinner: data.wednesday_dinner,
                // thursday_breakfast: data.thursday_breakfast,
                // thursday_lunch: data.thursday_lunch, 
                // thursday_dinner: data.thursday_dinner,
                // friday_breakfast: data.friday_breakfast,
                // friday_lunch: data.friday_lunch, 
                // friday_dinner: data.friday_dinner,
                // saturday_breakfast: data.saturday_breakfast,
                // saturday_lunch: data.saturday_lunch, 
                // saturday_dinner: data.saturday_dinner,
                // sunday_breakfast: data.sunday_breakfast,
                // sunday_lunch: data.sunday_lunch, 
                // sunday_dinner: data.sunday_dinner
            })
        }
    }

    toggleMeal = (event) => {
        const item = event.target.getAttribute("data-tag");
        const person = event.target.parentNode.parentNode.parentNode.firstChild.getAttribute("data-tag");
        // console.log(event.target.parentNode.parentNode.parentNode.firstChild.getAttribute("data-tag"))
        // console.log(item);
        this.setState(prevState => ({
            [item]:!prevState[item]
        }))
    }

    componentDidUpdate() {
        let data = this.state;
        let userId = sessionStorage.getItem('userId');
        let weeknum = moment().week();
        if(this.props.isSignedIn) {
            firebase.database().ref('schedules/' + userId).set({
                [weeknum]: data
            })
        }
        this.props.writeData(this.state)
    }

    render() {
        return (
            <div className="container">
                <div className="item auto person" data-tag="person_1">
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
                        <button className={this.state.monday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.monday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Tuesday</div>
                    <div className="meal-container">
                        <button className={this.state.tuesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.tuesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.tuesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Wednesday</div>
                    <div className="meal-container">
                        <button className={this.state.wednesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.wednesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.wednesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Thursday</div>
                    <div className="meal-container">
                        <button className={this.state.thursday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.thursday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.thursday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Friday</div>
                    <div className="meal-container">
                        <button className={this.state.friday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.friday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.friday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Saturday</div>
                    <div className="meal-container">
                        <button className={this.state.saturday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.saturday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.saturday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_dinner">Dinner</button>
                    </div>
                </div>
                <div className="day">
                    <div className="day-title">Sunday</div>
                    <div className="meal-container">
                        <button className={this.state.sunday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_breakfast">Breakfast</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.sunday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_lunch">Lunch</button>
                    </div>
                    <div className="meal-container">
                        <button className={this.state.sunday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_dinner">Dinner</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Schedule;