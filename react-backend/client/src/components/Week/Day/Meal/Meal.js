import React, {Component} from "react";
import "./Meal.css";

class Meal extends Component {
    constructor(props) {
        super();
        this.state = {
            button_style: true
        }
        this.changebreakfast = props.changebreakfast;
        this.changelunch = props.changelunch;
        this.changedinner = props.changedinner;
    }

    changeColor(){
        let mealnum = 0;
        if (this.state.button_style) {
            mealnum = -1
        } else if (!this.state.button_style) {
            mealnum = 1
        }
        this.setState(prevState => ({
            button_style: !prevState.button_style,
        }));
        if (this.props.meal_name === "Breakfast") {
            this.changebreakfast(mealnum);
        } else if (this.props.meal_name === "Lunch") {
            this.changelunch(mealnum);
        } else if (this.props.meal_name === "Dinner") {
            this.changedinner(mealnum);
        }
    }

    render(){
        return (
            <div className="meal-container">
                <button 
                    className={this.state.button_style ? "clicked" : "unclicked"} 
                    onClick={this.changeColor.bind(this)}
                >
                    {this.props.meal_name}
                </button>
            </div>
        );
    }
};

export default Meal;