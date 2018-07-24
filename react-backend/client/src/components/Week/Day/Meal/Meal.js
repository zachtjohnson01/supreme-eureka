import React, {Component} from "react";
import "./Meal.css";

class Meal extends Component {
    constructor() {
        super();
        this.state = {
            button_style: true
        }
    }

    changeColor(){
        this.setState(prevState => ({
            button_style: !prevState.button_style
        }));
    }
    render(){
        return (
            <div className="meal-container">
                <button className={this.state.button_style ? "clicked" : "unclicked"} onClick={this.changeColor.bind(this)}>{this.props.meal_name}</button>
            </div>
        );
    }
};

export default Meal;