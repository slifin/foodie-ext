export function Recipe(){
	var that = {},
	data = [],
	offset = 0,
	searchRecipes = function(params,callback){
		$.getJSON("http://foodie/search/"+params+'/0',{},callback);
	},
	renderRecipes = function(json){
		var res = $('#results');
				json.forEach(function(elem){
					res.append('<a target="_blank" href="http://bbcgoodfood.com'+elem[0]+'"><label class="recipe-label"><span class="recipe-title">'+elem[4]+'</span>'+elem[3]+' items of '+elem[2]+'</label><img style="width:200px" src="'+elem[1]+'"/></a>');
				});
	};
	that.searchRecipes = searchRecipes;
	that.renderRecipes = renderRecipes;
	return that;
}
