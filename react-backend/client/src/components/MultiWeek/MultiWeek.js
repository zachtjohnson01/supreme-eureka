import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import Week from "../Week/Week";
import WebFont from 'webfontloader';
import "./MultiWeek.css";

WebFont.load({
    google: {
        families: ['Titillium Web: 300,400,700', 'sans-serif']
    }
});

class MultiWeek extends Component {
    constructor(){
        super();
        this.state = {
            people: 2,
            breakfast: 14,
            lunch: 14,
            dinner: 14,
            breakfast_variety: 1,
            lunch_variety: 1,
            dinner_variety: 7,
            breakfast_people: 2,
            lunch_people: 2,
            dinner_people: 2
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

    removePerson(){
        let updatedPeople = this.state.people - 1;
        let updatedBreakfast = updatedPeople * 7;
        let updatedLunch = updatedPeople * 7;
        let updatedDinner = updatedPeople * 7;
        if (this.state.people === 1){
            return
        } else {
            this.setState(prevState => ({
                people: updatedPeople,
                breakfast: updatedBreakfast,
                lunch: updatedLunch,
                dinner: updatedDinner
            }))
        }
    }
    addPerson(){
        let updatedPeople = this.state.people + 1;
        let updatedBreakfast = this.state.breakfast + 7;
        let updatedLunch = this.state.lunch + 7;
        let updatedDinner = this.state.dinner + 7;
        this.setState(prevState => ({
            people: updatedPeople,
            breakfast: updatedBreakfast,
            lunch: updatedLunch,
            dinner: updatedDinner
        }))
    }


    render() {
        return (

            <div className="">
                <div>{this.state.people}</div>
                <button onClick={this.removePerson.bind(this)}>Remove Person</button>
                <button onClick={this.addPerson.bind(this)}>Add Person</button>


        
                <div className="totals-container">
                    <div className="item auto">
                        <div>Title</div>
                        <div>Breakfast</div>
                        <div>Lunch</div>
                        <div>Dinner</div>
                    </div>
                    <div className="item auto">
                        <div>Servings</div>
                        <div>{this.state.breakfast}</div>
                        <div>{this.state.lunch}</div>
                        <div>{this.state.dinner}</div>
                    </div>
                    <div className="item auto">
                        <div>Variety (# of Recipes)</div>
                        <div>{this.state.breakfast_variety}</div>
                        <div>{this.state.lunch_variety}</div>
                        <div>{this.state.dinner_variety}</div>
                    </div>
                </div>

                {[...Array(this.state.people).keys()].map(i=> {
                    return (
                        <div className={'multiWeek ' + (i+1)}>
                            <Week 
                                changeBreakfast={this.onChangeBreakfastCount.bind(this)}
                                changeLunch={this.onChangeLunchCount.bind(this)}
                                changeDinner={this.onChangeDinnerCount.bind(this)}
                                classNameProp={'week-container week-' + (i+1)}
                                personNumber={i+1}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MultiWeek;