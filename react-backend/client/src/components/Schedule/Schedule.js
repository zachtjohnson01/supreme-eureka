import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Schedule.css";
import WebFont from 'webfontloader';
// import firebase, { database } from 'firebase';
import moment from 'moment';
import { base } from '../../base.js';
import update from 'immutability-helper';

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});

class Schedule extends Component {
    constructor(props) {
        super();
        this.state = {
            // schedule: [
            //     {monday_breakfast: true},
            //     {monday_lunch: true}, 
            //     {monday_dinner: true},
            //     {tuesday_breakfast: true},
            //     {tuesday_lunch: true}, 
            //     {tuesday_dinner: true},
            //     {wednesday_breakfast: true},
            //     {wednesday_lunch: true}, 
            //     {wednesday_dinner: true},
            //     {thursday_breakfast: true},
            //     {thursday_lunch: true}, 
            //     {thursday_dinner: true},
            //     {friday_breakfast: true},
            //     {friday_lunch: true}, 
            //     {friday_dinner: true},
            //     {saturday_breakfast: true},
            //     {saturday_lunch: true}, 
            //     {saturday_dinner: true},
            //     {sunday_breakfast: true},
            //     {sunday_lunch: true}, 
            //     {sunday_dinner: true}
            // ],
            schedule: {
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
            },
            // schedule: [
            //     monday_breakfast,
            //     monday_lunch, 
            //     monday_dinner,
            //     tuesday_breakfast,
            //     tuesday_lunch, 
            //     tuesday_dinner,
            //     wednesday_breakfast,
            //     wednesday_lunch, 
            //     wednesday_dinner,
            //     thursday_breakfast,
            //     thursday_lunch, 
            //     thursday_dinner,
            //     friday_breakfast,
            //     friday_lunch, 
            //     friday_dinner,
            //     saturday_breakfast,
            //     saturday_lunch, 
            //     saturday_dinner,
            //     sunday_breakfast,
            //     sunday_lunch, 
            //     sunday_dinner
            // ],
            // schedule: {},
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
        this.initSchedule = this.initSchedule.bind(this);
        this.toggleMeal = this.toggleMeal.bind(this);
        // this.getData = this.getbind(true);
    }

    initSchedule = (userId, weeknum) => {
        console.log('Initializing schedule');
        // base.push(`schedules/${userId}/${weeknum}`, {
        //     data: {name:
        // });
        base.post(`schedules/${userId}/${weeknum}`, {
            data: {
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
        })
    }


    componentDidMount() {
        let weeknum = moment().week();
        const userId = sessionStorage.getItem('userId');

        base.fetch('schedules/' + userId + "/" + weeknum, {
            context: this,
            then(data) {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    // console.log('No data exists for this week')
                    this.initSchedule(userId,weeknum);
                    this.ref = base.syncState(`schedules/${userId}/${weeknum}`, {
                        context: this,
                        state: 'schedule',
                        asArray: false
                    })
                } else {
                    // console.log(data);
                    this.ref = base.syncState(`schedules/${userId}/${weeknum}`, {
                        context: this,
                        state: 'schedule',
                        asArray: false
                    })
                }
            }
        });
    }

    toggleMeal = (event) => {
        const item = event.target.getAttribute("data-tag");
        const person = event.target.parentNode.parentNode.parentNode.firstChild.getAttribute("data-tag");
        if (this.props.isSignedIn) {
            const newSched = update(this.state, {
                schedule: {
                    [item]: { $apply: function(x) {return !x}}
                }
            })
            this.setState(newSched)
        } else {
            console.log('NOT SIGNED IN')
        }
    }
    
    componentWillUnmount(){
        console.log('UNMOUNTING')
        if(this.props.isSignedIn) {
            base.removeBinding(this.ref);
            this.userId = "";
        } else {
            console.log("USER NOT SIGNED IN")
        }
    }

    render() {
        const weeknum = moment().week();
        return (
            <div className="container">
                <div className="week-heading">
                    <div className="weeknum">Week {weeknum} Meal Schedule</div>
                </div>
                <div className="meals-container">
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
                            <button className={this.state.schedule.monday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.monday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.monday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="monday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Tuesday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.tuesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.tuesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.tuesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="tuesday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Wednesday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.wednesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.wednesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.wednesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="wednesday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Thursday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.thursday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.thursday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.thursday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="thursday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Friday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.friday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.friday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.friday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="friday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Saturday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.saturday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.saturday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.saturday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="saturday_dinner">Dinner</button>
                        </div>
                    </div>
                    <div className="day">
                        <div className="day-title">Sunday</div>
                        <div className="meal-container">
                            <button className={this.state.schedule.sunday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_breakfast">Breakfast</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.sunday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_lunch">Lunch</button>
                        </div>
                        <div className="meal-container">
                            <button className={this.state.schedule.sunday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} data-tag="sunday_dinner">Dinner</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Schedule;