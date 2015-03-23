exports.RecipeEvents = function(){
	var that = {},
	registerPagination = function(recipe,trolley){
		$('.next').click(function(){
			recipe.next(trolley);
		});
		$('.prev').click(function(){
			recipe.prev(trolley);
		});
	},
	viewBasket = function(trolley){
		$('.basket').click(function(){
			trolley.getTrolleyItems(function(items){
				trolley.renderTrolleyItems(items);
			});
		});
	},
	viewRecipes = function(recipe,trolley){
		$('.recipes').click(function(){
			recipe.searchRecipes(trolley, recipe.renderRecipes);
		});
	},
	viewIngredients = function(food){
		$('.ingredients').click(function(){
			food.getIngredientsPage(food.renderIngredientsPage,100);
		});
	};
	that.viewIngredients = viewIngredients;
	that.registerPagination = registerPagination; 
	that.viewRecipes = viewRecipes;
	that.viewBasket = viewBasket;
	return that;
};