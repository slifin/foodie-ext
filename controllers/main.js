var items = [];
var scan = 0; 
var scanTrolley = function(callback){

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
	// if (oldItems.length != items.length){
		chrome.storage.local.set({'trolley': items});
	// }
	callback();
};
chrome.runtime.onMessage.addListener(
	function onPopupOpen(request,sender,sendResponse){
		if (request.request=='trolley'){
			scanTrolley(sendResponse);
		}
	});
// var gogo = _.debounce(scanTrolley, 500);
// $('a').removeAttr('onclick');
// $(document).arrive('[item_id]', {fireOnAttributesModification: true},gogo);
// $(document).leave('[item_id]',gogo);
// $(document).arrive('a',function(elem){
	// $('a').unbind('click.foodie');
	// $('a').bind('click.foodie', gogo);
// });
// scanTrolley();
