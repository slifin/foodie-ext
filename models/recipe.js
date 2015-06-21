exports.Recipe = function(){
	var that = {},
	data = [],
	offset = 0;
	(function constructor(){
		that.offset = offset;
	})();
	var searchRecipes = function(trolley,callback){
		console.log('test');
		if (that.offset<0){
			that.offset = 0;
			return;
		}
		console.log('search recipes');
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
		console.log(json);

		console.log('render recipes');
		if (parseInt(json[0].count)===0||json.length===0){
			console.log('trigger no basket');
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
		console.log('next triggered');
		that.offset++;
		that.searchRecipes(trolley,function(json){
			that.renderRecipes(json);
		});
	},
	prev = function(trolley){
		console.log('prev triggered');
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
