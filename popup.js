$(document).ready(function(){
	$('#find').click(function(e){
		e.preventDefault();
		chrome.storage.local.get('trolly',function(val){
			console.log('trolly has ',val);
			var query = '';
			var images = [];
			var imagePieces = [];
			var lastPiece= '';
			val.trolly.forEach(function(value){
				imagePieces = value.image.split('/'); 

				lastPiece = imagePieces[imagePieces.length-1];
				lastPiece = lastPiece.split('.')[0];
				images.push(lastPiece.split('_')[0]);
			});
			$.getJSON('http://foodie/search/'+images.join('-')+'/0',{},function(json){
				console.log(json);

				var res = $('#results');
				json.forEach(function(elem){
					res.append('<a target="_blank" href="http://bbcgoodfood.com'+elem[0]+'"><label class="recipe-label"><span class="recipe-title">'+elem[4]+'</span>'+elem[3]+' items of '+elem[2]+'</label><img style="width:200px" src="'+elem[1]+'"/></a>');
				});
			}); 

		});
	return false;
});
});
