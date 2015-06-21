var items = [];
var scan = 0; 
$('a').removeAttr('onclick');
var scanTrolley = function(){
	console.log('test');
	var oldItems = [];
	if (items.length){
		oldItems = items;
	}
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
	console.log(items);
	if (oldItems.length != items.length){
		chrome.storage.local.set({'trolley': items});
	}
};
var gogo = _.debounce(scanTrolley, 500);
$(document).arrive('[item_id]', {fireOnAttributesModification: true},gogo);
$(document).leave('[item_id]',gogo);
$(document).arrive('a',function(elem){
	$('a').unbind('click.foodie');
	$('a').bind('click.foodie', gogo);
});
// scanTrolley();
