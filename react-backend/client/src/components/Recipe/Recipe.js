import React, {Component} from "react";
// import {Link, withRouther} from "react-router-dom";
import "../../App.css";
import "./Recipe.css";
import axios from "axios";
import fs from "fs";
import update from 'immutability-helper';
// import { parse } from "recipe-ingredient-parser";

class Recipe extends Component {
    constructor(props) {
        super();
        this.state = {
            // recipe: 'ingredient'
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
        let ingrArray;
        ingrArray = ingredient.split("\n").join("||");

        axios
            .get("api/recipeParser/" + ingrArray)
            .then(response => {
                const resp = response.data;
                const parsedRecipe = update(this.state.parsedRecipe, {
                     $set: resp }
                )
                console.log(response.data)
                this.setState({
                    parsedRecipe
                })
            })
    }

    render() {

        if (this.state.parsedRecipe) {
            var parsedIngredientes = 
                [...this.state.parsedRecipe].map(recipe => {
                    return (
                        <div className="recipe-ingredient">
                            <div className="recipe-ingredient-item"> {recipe.quantity} </div>
                            <div className="recipe-ingredient-item"> {recipe.unit} </div>
                            <div className="recipe-ingredient-item"> {recipe.ingredient} </div>
                        </div>
                    )
                })
        }
        return(
            <div className="container">
                <div>Recipe</div>
                <div className="recipeContainer">
                    <textarea className="recipe-item recipe-input" type="text" onChange={this.handleChange.bind(this)}/>
                    <div className="recipe-item recipe-output">
                        {/* ({this.state.recipe.split('\r\n')}) */}
                        <button className="recipe-parse" onClick={this.parseRecipe.bind(this)}>Parse Recipe</button>
                        { parsedIngredientes}
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;