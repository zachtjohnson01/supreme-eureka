const express = require("express");
const router = express.Router();
var recipeingredientparser = require('recipe-ingredient-parser');
// import { parse } from "recipe-ingredient-parser";

router.get("/:id", (req, res) => {
    console.log("recipe ingredient parser call")
    let textInput = req.params.id.split("||");
    let parsedIngredientArray = new Array();
    textInput.forEach((ingredient) => {
        parsedIngredientArray.push(recipeingredientparser.parse(ingredient))
    })
    res.json(parsedIngredientArray);
})

module.exports = router;