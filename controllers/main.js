var items = [];
var scan = 0; 
$('a').removeAttr('onclick');
var scanTrolley = function(){
	items = [];
	if ($('[item_id]').length === 0) return;
	$('[item_id]').each(function(){
		var $that = $(this);
		var obj = {
			id: $that.attr('item_id'),
			title:$that.find('.productTitle a').text(),
			price:$that.find('.price').text(),
			image:$that.find('.productImage').attr('data-original')
		};
		items.push(obj);
	});
	console.log('scanning trolley');
	console.log(items);
	
	chrome.storage.local.set({'trolley': items});
};
$(document).arrive('[item_id]', {fireOnAttributesModification: true},function(){
	// if(scan) return;
	scanTrolley();
	// scan++;
});
$(document).leave('[item_id]',function(){
	scanTrolley();
});
$(document).arrive('a',function(elem){
	$('a').unbind('click.foodie');
	$('a').bind('click.foodie', function(){
		scanTrolley();
	});

});
// scanTrolley();
