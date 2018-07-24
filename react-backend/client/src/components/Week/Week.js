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
    constructor(props){
        super(props);
        this.state = {
            B1: true,
            L1: true,
            D1: true,
            B2: true,
            L2: true,
            D2: true,
            B3: true,
            L3: true,
            D3: true,
            B4: true,
            L4: true,
            D4: true,
            B5: true,
            L5: true,
            D5: true,
            B6: true,
            L6: true,
            D6: true,
            B7: true,
            L7: true,
            D7: true
        }
    }

    handleClick() {
        this.setState(prevState => ({
            
        }))
    }

    changeColor(event){
        const target = event.target;
        const value = target.value;
        let value_update;
        if (target.value === true) {
            value_update = false
            console.log('true')
        } else {
            value_update = true
            console.log('false')
        };
        const name = target.name;
        const class_name = target.className.substring(0,2).toUpperCase();
        console.log(event.target);
        console.log(`value update: ${value_update}`);
        console.log(`target value: ${target.value}`);
        console.log(class_name);
        this.setState({
            class_name: value_update
        });
    }
    render() {
        let B1_class = this.state.B1 ? "b1-clicked" : "b1-unclicked";
        let L1 = this.state.B1 ? "clicked" : "unclicked";
        let D1 = this.state.B1 ? "clicked" : "unclicked";
        let B2 = this.state.B1 ? "clicked" : "unclicked";
        let L2 = this.state.B1 ? "clicked" : "unclicked";
        let D2 = this.state.B1 ? "clicked" : "unclicked";
        let B3 = this.state.B1 ? "clicked" : "unclicked";
        let L3 = this.state.B1 ? "clicked" : "unclicked";
        let D3 = this.state.B1 ? "clicked" : "unclicked";
        let B4 = this.state.B1 ? "clicked" : "unclicked";
        let L4 = this.state.B1 ? "clicked" : "unclicked";
        let D4 = this.state.B1 ? "clicked" : "unclicked";
        let B5 = this.state.B1 ? "clicked" : "unclicked";
        let L5 = this.state.B1 ? "clicked" : "unclicked";
        let D5 = this.state.B1 ? "clicked" : "unclicked";
        let B6 = this.state.B1 ? "clicked" : "unclicked";
        let L6 = this.state.B1 ? "clicked" : "unclicked";
        let D6 = this.state.B1 ? "clicked" : "unclicked";
        let B7 = this.state.B1 ? "clicked" : "unclicked";
        let L7 = this.state.B1 ? "clicked" : "unclicked";
        let D7 = this.state.B1 ? "clicked" : "unclicked";

        return (

            <div className="container">
                <Day day_name={"Monday"}/>
                <Day day_name={"Tuesday"}/>
                <Day day_name={"Wednesday"}/>
                <Day day_name={"Thursday"}/>
                <Day day_name={"Friday"}/>
                <Day day_name={"Saturday"}/>
                <Day day_name={"Sunday"}/>
           </div>
        )
    }

}

export default Week;