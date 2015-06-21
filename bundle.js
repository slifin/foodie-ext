(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var runExt = function(){
	url = 'http://arcanine.net/';
	var trolley = require('../models/trolley.js').Trolley();
	var recipe  = require('../models/recipe.js').Recipe();
	var food    = require('../models/food.js').Food();
	var events  = require('../events/recipe.js').RecipeEvents(); 
	$(document).ready(function(){
		events.registerPagination(recipe,trolley);
		events.viewBasket(trolley);
		events.viewRecipes(recipe,trolley);
		events.viewIngredients(food);
		recipe.searchRecipes(trolley, recipe.renderRecipes);
	});
}; 
(function scanTrolley(){
	chrome.tabs.query({active:true,currentWindow:true},function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,{request: "trolley"}, function(response){
			runExt();
		});
	});
})();

},{"../events/recipe.js":2,"../models/food.js":3,"../models/recipe.js":4,"../models/trolley.js":5}],2:[function(require,module,exports){
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
		$(document).on('click','.ingredients',function(){
			food.getIngredientsPage(food.renderIngredientsPage,100);
		});
	};
	that.viewIngredients = viewIngredients;
	that.registerPagination = registerPagination; 
	that.viewRecipes = viewRecipes;
	that.viewBasket = viewBasket;
	return that;
};
},{}],3:[function(require,module,exports){
exports.Food = function(){
	var that = {},
	getIngredientsPage = function(callback,limit){
		limit = limit || 100;
		$.getJSON(url+"foodie/ingredients",{limit:limit},callback);
	},
	getAsdaURL = function(product_id){
		if (product_id)
			return 'http://groceries.asda.com/asda-webstore/landing/home.shtml?cmpid=ahc-_-ghs-sna1-_-asdacom-dsk-_-hp#/product/'+product_id;
	},
	renderIngredientsPage = function(json){
		if (!json) return;
		$('#results').html('');
		json.forEach(function(row){
			$('#results').append('<a target="_blank" class="ingredient-container" href="'+getAsdaURL(row.product_id)+'"><img src="'+row.image+'" />'+row.title+'</a>');	
		});
	}
	;
	that.renderIngredientsPage = renderIngredientsPage;
	that.getIngredientsPage = getIngredientsPage;
	return that;
};
},{}],4:[function(require,module,exports){
exports.Recipe = function(){
	var that = {},
	data = [],
	offset = 0;
	(function constructor(){
		that.offset = offset;
	})();
	var searchRecipes = function(trolley,callback){
		if (that.offset<0){
			that.offset = 0;
			return;
		}
		// var url = 'http://foodie/';
		var url = 'http://arcanine.net/';
		$('#results').html('<div class="loader"></div>').removeClass().addClass('loading-page');
		trolley.getTrolleyItems(function(data){
			trolley.getSearchString(data,function(searchString){
				$.post(url+"foodie/search",{offset:that.offset,search:searchString},callback,'json').fail(function(){
					toastr.warning('Connection to recipe engine failed');
				});

			});
		});
	},
	renderRecipes = function(json){

		if (parseInt(json[0].count)===0||json.length===0){
			$('#results').html('<div class="no-results">No recipes found, try adding more ingredients to your asda basket then try again.');
			return;
		}
		$('#results').remove();
		$('.side-trolley').after('<div id="results"></div>');
		$('#results').data('context','recipes');
		var pagination = json.shift();
		json.forEach(function(elem){
			$('#results').append('<a class="label-parent" target="_blank" href="http://bbcgoodfood.com'+elem[0]+'"><label class="recipe-label"><span class="recipe-title">'+elem[4]+'</span>'+elem[3]+' ingredients of '+elem[2]+'</label><img style="width:200px" src="'+elem[1]+'"/></a>');
		});
		if (pagination.offset !== undefined)
			$('.pagination-container').html('page '+parseInt(++pagination.offset)+' of '+pagination.pagesTotal);

	},
	next = function(trolley){
		that.offset++;
		that.searchRecipes(trolley,function(json){
			that.renderRecipes(json);
		});
	},
	prev = function(trolley){
		that.offset--; 
		that.searchRecipes(trolley,function(json){
			that.renderRecipes(json);
		});
	};
	that.prev = prev;
	that.next = next;
	that.offset = offset;
	that.searchRecipes = searchRecipes; 
	that.renderRecipes = renderRecipes;
	return that;
};

},{}],5:[function(require,module,exports){
exports.Trolley = function(){
	var that = {},
	itemIds = [],
	updateTrolleyCounter = function(data){
		if (data !== undefined)
			$('.basket-count').text('('+data.length+')');
	},
	renderTrolleyItems = function(trolleyItems){
		trolleyItems = trolleyItems.trolley;
		$('#results').html('').data('context','basket');
		if (!trolleyItems)return;
		$.each(trolleyItems,function(k,item){
			$('#results').append('<div class="basket-item"><a class="product-link" target="_blank" href="http://groceries.asda.com/asda-webstore/landing/home.shtml?cmpid=ahc-_-ghs-sna1-_-asdacom-dsk-_-hp#/product/'+item.id+'"><img class="basket-image" src="'+item.image+'" /><div class="basket-title">'+item.title+'</div></a></div>');
		});
		updateTrolleyCounter(trolleyItems);		

	},
	getTrolleyItems = function(callback){
		chrome.storage.local.get('trolley',callback); 
	},
	splitImageName = function(data){
		if (!data.image) return;
		var imagePieces = data.image.split('/');
		var lastPiece = imagePieces[imagePieces.length-1];
		lastPiece = lastPiece.split('.')[0];
		itemIds.push(lastPiece.split('_')[0]);
	},
	getSearchString = function(trolleyData,callback){
		updateTrolleyCounter(trolleyData.trolley);
		if (trolleyData.trolley)
			trolleyData.trolley.forEach(splitImageName);
		callback(itemIds.join('-'));
	};
	that.renderTrolleyItems = renderTrolleyItems;
	that.getTrolleyItems = getTrolleyItems;
	that.getSearchString = getSearchString;
	return that;	
};

},{}]},{},[1]);
