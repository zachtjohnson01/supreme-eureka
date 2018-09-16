import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Recipe.css";
import axios from "axios";
import fs from "fs";
// import { parse } from "recipe-ingredient-parser";

class Recipe extends Component {
    constructor(props) {
        super();
        this.state = {
            recipe: 'ingredient'
        }
    }

    handleChange(event) {
        // let recipeParse;
        // recipeParse = parse(event.target.value)
        this.setState({
            // recipe: recipeParse
            recipe: event.target.value
        })
    }

    parseRecipe = () => {
        let ingredient = this.state.recipe;
        let ingArray;
        ingArray = ingredient.split("\n").join("||");

        axios
            .get("api/recipeParser/" + ingArray)
            .then(response => {
                console.log(response)
                // this.setState({
                //     parsed: response
                // })
            })
    }

    render() {
        return(
            <div className="container">
                <div>Recipe</div>
                <div className="recipeContainer">
                    <textarea className="recipe-item recipe-input" type="text" onChange={this.handleChange.bind(this)}/>
                    <div className="recipe-item recipe-output">
                        ({this.state.recipe.split('\r\n')})
                        {this.state.parsed}
                        <button className="recipe-parse" onClick={this.parseRecipe.bind(this)}>Parse Recipe</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;