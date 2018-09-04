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
            schedule: {
                people: 1,
                person1: {
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
            },
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
    }

    initSchedule = (userId, weeknum) => {
        console.log('Initializing schedule');
        base.post(`schedules/${userId}/${weeknum}/person1`, {
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

    initPeopleCount = (userId, weeknum) => {
        base.post(`schedules/${userId}/${weeknum}/people`, {
            data: 1
        })
    }

    addPerson = () => {
        let weeknum = moment().week();
        const userId = sessionStorage.getItem('userId');
        const updatedPeople = this.state.schedule.people + 1;
        console.log(updatedPeople);
        const newPeople = update(this.state, {
            schedule: {
                people: { $apply: function(x) {return (x + 1)} }
            }
        })
        this.setState(newPeople);
        base.post(`schedules/${userId}/${weeknum}/person${this.state.schedule.people + 1}`, {
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

    removePerson = (event) => {
        let weeknum = moment().week();
        const userId = sessionStorage.getItem('userId');
        const person = event.target.parentNode.parentNode.parentNode.firstChild.getAttribute("data-tag");
        const newPeoples = update(this.state, {
            schedule: {
                people: { $apply: function(x) {return (x - 1)} }
            }
        })
        this.setState(newPeoples);
        base.remove(`schedules/${userId}/${weeknum}/${person}`)
    }


    componentDidMount() {
        let weeknum = moment().week();
        const userId = sessionStorage.getItem('userId');

        base.fetch('schedules/' + userId + "/" + weeknum, {
            context: this,
            then(data) {
                if (Object.keys(data).length === 0 && data.constructor === Object) {
                    this.initSchedule(userId,weeknum);
                    this.initPeopleCount(userId,weeknum);
                    this.ref = base.syncState(`schedules/${userId}/${weeknum}`, {
                        context: this,
                        state: 'schedule',
                        asArray: false
                    })
                } else {
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
        console.log(person);
        if (this.props.isSignedIn) {
            const newSched = update(this.state, {
                schedule: {
                    [person]: {
                        [item]: { $apply: function(x) {return !x}}
                    }
                }
            })
            this.setState(newSched)
        } else {
            console.log('NOT SIGNED IN')
        };

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

        if (this.state.schedule.person1) {
            var scheduleNodes = 
                [...Array(this.state.schedule.people).keys()].map(i => {
                    const i2 = (i+1).toString();
                    return (
                        <div className="week-meals-container">
                            <div className="item auto person" key={'person' + i} data-tag={"person" + (i+1)}>
                                <div className="input-title">
                                    Person {i2}
                                </div>
                                <div className="input-input">
                                    <input type="text" name="name" value="" />
                                </div>
                                { i === 0 ? null : 
                                    <div className="input-remove">
                                        <button onClick={this.removePerson.bind(this)}>Remove</button>
                                    </div>
                                }
                            </div>
                            <div className="day">
                                <div className="day-title">Monday</div>
                                <div className="meal-container">
                                    <button className={ this.state.schedule['person' + i2].monday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'monday_breakfast' + i} data-tag="monday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].monday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'monday_lunch' + i} data-tag="monday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].monday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'monday_dinner' + i} data-tag="monday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Tuesday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].tuesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'tuesday_breakfast' + i} data-tag="tuesday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].tuesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'tuesday_lunch' + i} data-tag="tuesday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].tuesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'tuesday_dinner' + i} data-tag="tuesday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Wednesday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].wednesday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'wednesday_breakfast' + i} data-tag="wednesday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].wednesday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'wednesday_lunch' + i} data-tag="wednesday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].wednesday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'wednesday_dinner' + i} data-tag="wednesday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Thursday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].thursday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'thursday_breakfast' + i} data-tag="thursday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].thursday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'thursday_lunch' + i} data-tag="thursday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].thursday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'thursday_dinner' + i} data-tag="thursday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Friday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].friday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'friday_breakfast' + i} data-tag="friday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].friday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'friday_lunch' + i} data-tag="friday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].friday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'friday_dinner' + i} data-tag="friday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Saturday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].saturday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'saturday_breakfast' + i} data-tag="saturday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].saturday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'saturday_lunch' + i} data-tag="saturday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].saturday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'saturday_dinner' + i} data-tag="saturday_dinner">Dinner</button>
                                </div>
                            </div>
                            <div className="day">
                                <div className="day-title">Sunday</div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].sunday_breakfast ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'sunday_breakfast' + i} data-tag="sunday_breakfast">Breakfast</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].sunday_lunch ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'sunday_lunch' + i} data-tag="sunday_lunch">Lunch</button>
                                </div>
                                <div className="meal-container">
                                    <button className={this.state.schedule['person' + i2].sunday_dinner ? "clicked" : "unclicked"} onClick={this.toggleMeal} key={'sunday_dinner' + i} data-tag="sunday_dinner">Dinner</button>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
        return (
            <div className="container">
                <div className="week-heading">
                    <div className="weeknum">Week {weeknum} Meal Schedule</div>
                </div>
                <div>{this.state.people}</div>
                <button onClick={this.addPerson.bind(this)}>Add Person</button>
                
                {scheduleNodes}

            </div>
        )
    }
}

export default Schedule;