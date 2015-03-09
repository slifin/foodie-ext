var items = [];
var scan = 0; 

var scanTrolly = function(){
	items = [];
	$('[item_id]').each(function(){
		var $that = $(this);
		var obj = {
			id: $that.find('.productTitle a').text(),
			title:$that.attr('item_id'),
			price:$that.find('.price').text(),
			image:$that.find('.productImage').attr('data-original')
		};
		items.push(obj);
	});
	chrome.storage.local.set({'trolly': items});
};
$(document).arrive('[item_id]',function(){
	if(scan) return;
	scanTrolly();
	scan++;
});
$(document).on('click','.addMainItemToTrolley,.addItemToTrolley,.quantityDecrease,.quantityIncrease',function(){
	scanTrolly();
	alert('rescanned');
});

scanTrolly();


//step 1 scrape bbcgoodfood for recipies 
//for each page take the recipie id and the url 
// + any other data needed for basket look up
// query foodity with this data and find all food items associated with each recipie store the associations and get the asda ids by going through the basket link

//once the above is done we should have a database of recipies 
//food items + asda ids, we can then use the extension to find all recipies that contain the items in our trolly as found in chrome extension





//foodity.com requires a url of at least this:
//https://service.foodity.com/basket/web/asda?app_id=7bzsSDBP9J&data=%5B%5B%2293901%22%2Cnull%5D%5D
//I believe those parameters can be taken from bbcgoodfood's website

//the resulting page will return a list of pictures of asda's products (we can do a link up here) OR check the links 
//the links will link to a page on foodity that redirects out to asda 