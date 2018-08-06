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
    constructor(props) {
        super();
        this.state = {
            breakfast: 7,
            lunch: 7,
            dinner: 7,
            breakfast_variety: 1,
            lunch_variety: 1,
            dinner_variety: 7,
            breakfast_people: 2,
            lunch_people: 2,
            dinner_people: 2,
        }
        this.removeUniquePerson = props.removeUniquePerson;
    }

    handleChange(event) {
        this.setState( {name: event.target.value})
    }

    
    render() {

        return (

            <div className="container">
                <div className={this.props.classNameProp}>
                    <div className="item auto person">
                        <div className="input-title">
                            Person {this.props.personNumber}
                        </div>
                        <div className="input-input">
                            <input 
                                type="text" 
                                name="name" 
                                value={this.state.name}
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                    </div>
                    <Day 
                        day_name={"Monday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Tuesday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Wednesday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Thursday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Friday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Saturday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                        />
                    <Day 
                        day_name={"Sunday"}
                        changeBreakfast={this.props.changeBreakfast}
                        changeLunch={this.props.changeLunch}
                        changeDinner={this.props.changeDinner}
                    />
                </div>


            </div>
        )
    }

}

export default Week;