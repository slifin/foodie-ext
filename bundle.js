(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var recipeModule = _interopRequireWildcard(require("../models/recipe.min.js"));

var trolleyModule = _interopRequireWildcard(require("../models/trolley.min.js"));

var trolley = new trolleyModule.Trolley();
var recipe = new recipeModule.Recipe();

trolley.getTrolleyItems(function (data) {
	trolley.getSearchString(data, function (searchString) {
		recipe.searchRecipes(searchString, recipe.renderRecipes);
	});
});


},{"../models/recipe.min.js":2,"../models/trolley.min.js":3}],2:[function(require,module,exports){
"use strict";

exports.Recipe = Recipe;

function Recipe() {
	var that = {},
	    data = [],
	    offset = 0,
	    searchRecipes = function searchRecipes(params, callback) {
		$.getJSON("http://foodie/search/" + params + "/0", {}, callback);
	},
	    renderRecipes = function renderRecipes(json) {
		var res = $("#results");
		json.forEach(function (elem) {
			res.append("<a target=\"_blank\" href=\"http://bbcgoodfood.com" + elem[0] + "\"><label class=\"recipe-label\"><span class=\"recipe-title\">" + elem[4] + "</span>" + elem[3] + " items of " + elem[2] + "</label><img style=\"width:200px\" src=\"" + elem[1] + "\"/></a>");
		});
	};
	that.searchRecipes = searchRecipes;
	that.renderRecipes = renderRecipes;
	return that;
}

Object.defineProperty(exports, "__esModule", {
	value: true
});


},{}],3:[function(require,module,exports){
"use strict";

exports.Trolley = Trolley;

function Trolley() {
	var that = {},
	    itemIds = [],
	    getTrolleyItems = function getTrolleyItems(callback) {
		chrome.storage.local.get("trolley", callback);
	},
	    splitImageName = function splitImageName(data) {
		var imagePieces = data.image.split("/");
		var lastPiece = imagePieces[imagePieces.length - 1];
		lastPiece = lastPiece.split(".")[0];
		itemIds.push(lastPiece.split("_")[0]);
	},
	    getSearchString = function getSearchString(trolleyData, callback) {
		trolleyData.trolley.forEach(splitImageName);
		callback(itemIds.join("-"));
	};
	that.getTrolleyItems = getTrolleyItems;
	that.getSearchString = getSearchString;
	return that;
}

//$(document).ready(function(){
//	$('#find').click(function(e){
//		e.preventDefault();
//		chrome.storage.local.get('trolly',function(val){
//			console.log('trolly has ',val);
//			var query = '';
//			var images = [];
//			var imagePieces = [];
//			var lastPiece= '';
//			val.trolly.forEach(function(value){
//				imagePieces = value.image.split('/');
//
//				lastPiece = imagePieces[imagePieces.length-1];
//				lastPiece = lastPiece.split('.')[0];
//				images.push(lastPiece.split('_')[0]);
//			});
//			$.getJSON('http://foodie/search/'+images.join('-')+'/0',{},function(json){
//				console.log(json);
//
//				var res = $('#results');
//				json.forEach(function(elem){
//					res.append('<a target="_blank" href="http://bbcgoodfood.com'+elem[0]+'"><label class="recipe-label"><span class="recipe-title">'+elem[4]+'</span>'+elem[3]+' items of '+elem[2]+'</label><img style="width:200px" src="'+elem[1]+'"/></a>');
//				});
//			});
//
//		});
//	return false;
//});
//});

Object.defineProperty(exports, "__esModule", {
	value: true
});


},{}]},{},[1]);
