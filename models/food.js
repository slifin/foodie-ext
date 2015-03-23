exports.Food = function(){
	var that = {},
	getIngredientsPage = function(callback,limit){
		limit = limit || 100;
		$.getJSON(url+"foodie/ingredients",{limit:limit},callback);
	},
	renderIngredientsPage = function(json){
		if (!json) return;
		$('#results').html('');
		json.forEach(function(row){
			$('#results').append('<div>'+row.title+'</div>');	
		});
	}
	;
	that.renderIngredientsPage = renderIngredientsPage;
	that.getIngredientsPage = getIngredientsPage;
	return that;
};