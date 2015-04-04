var items = [];
var scan = 0; 
$('a').removeAttr('onclick');
var scanTrolley = function(){
	items = [];
	item_id_dom = $('[item_id]');
	if (item_id_dom.length === 0) return;
	item_id_dom.each(function(){
		var $that = $(this);
		var obj = {
			id: $that.attr('item_id'),
			title:$that.find('.productTitle a').text(),
			price:$that.find('.price').text(),
			image:$that.find('.productImage').attr('data-original')
		};
		items.push(obj);
	});
	chrome.storage.local.set({'trolley': items});
};
$(document).arrive('[item_id]', {fireOnAttributesModification: true},function(){
	// if(scan) return;
	 _.debounce(scanTrolley, 500, true);
	// scan++;
});
$(document).leave('[item_id]',function(){
	_.debounce(scanTrolley,500,true);
	scanTrolley();
});
$(document).arrive('a',function(elem){
	$('a').unbind('click.foodie');
	$('a').bind('click.foodie', function(){
		scanTrolley();
	});

});
// scanTrolley();
