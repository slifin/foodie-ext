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
			console.log(row);
			$('#results').append('<a target="_blank" class="ingredient-container" href="'+getAsdaURL(row.product_id)+'"><img src="'+row.image+'" />'+row.title+'</a>');	
		});
	}
	;
	that.renderIngredientsPage = renderIngredientsPage;
	that.getIngredientsPage = getIngredientsPage;
	return that;
};