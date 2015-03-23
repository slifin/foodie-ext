url = 'http://arcanine.net/';


var trolley = require('../models/trolley.js').Trolley();
var recipe = require('../models/recipe.js').Recipe();
var food = require('../models/food.js').Food();
var events = require('../events/recipe.js').RecipeEvents(); 

$(document).ready(function(){
	events.registerPagination(recipe,trolley);
	events.viewBasket(trolley);
	events.viewRecipes(recipe,trolley);
	events.viewIngredients(food);
	recipe.searchRecipes(trolley, recipe.renderRecipes);
});

