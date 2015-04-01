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
