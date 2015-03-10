import * as recipeModule from "../models/recipe.min.js";
import * as trolleyModule from "../models/trolley.min.js";

var trolley = new trolleyModule.Trolley();
var recipe = new recipeModule.Recipe(); 

trolley.getTrolleyItems(function(data){
	trolley.getSearchString(data,function(searchString){
		recipe.searchRecipes(searchString,recipe.renderRecipes);
	});
});

