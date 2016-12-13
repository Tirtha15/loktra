var express = require('express');
var _ = require('underscore');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/total', function(req, res){
    var keyword = req.query.keyword;
    if(!keyword)
    	return res.status(400).send('Bad request. Keyword should be specified as a query param.');
    
    var url = 'http://www.shopping.com/products?KW=' + keyword;

    request(url, function(error, response, html){

    	if(error){
    		 return res.status(500).send('Internal server error')
    	}

        var $ = cheerio.load(html);

    	$('.numTotalResults').filter(function(){

    		var data = $(this);

    		var totalResults = data.text().split(" ").pop();
    		return res.send({
		    		   keyword: keyword,
		    		   totalResults: totalResults
		    	    });
    	});

    });
});

app.get('/products', function(req, res){

	var keyword = req.query.keyword;
	var page = req.query.page || 1;
    if(!keyword)
    	return res.status(400).send('Bad request. Keyword should be specified as a query param.');
    
    var url = 'http://www.shopping.com/products~PG-'+ page +'?KW=' + keyword;
    request(url, function(error, response, html){

    	if(error){
    		 return res.status(500).send('Internal server error')
    	}

        var $ = cheerio.load(html);

        var allItems = [];

    	$('.gridItemBtm').each(function(i, elm){
    		//console.log("title",$(elm).children().first().children().attr('title')); //title
    		var nextSelector = $(elm).children().first().next().attr('id') || $(elm).children().first().next().attr('class');
    		if(nextSelector === 'productGrid'){
    			var nameId = $(elm).children().first().children().attr('id');
                var id = nameId.replace('name', '#priceProduct');

                var item = {
                	title: $(elm).children().first().children().attr('title'),
                	price: $(elm).children('.productGrid').children().find(id).text()
                };
                allItems.push(item);
    		} else {

    			var item = {
                	title: $(elm).children().first().children().first().text(),
                	price: $(elm).children().first().next().children().first().text()
                };
                allItems.push(item);
    		}
    	});

    	return res.send({
		    		   keyword: keyword,
		    		   page: page,
		    		   items: allItems
		    	    });

    });

});

app.listen('8081')
console.log('Listening on port 8081');
exports = module.exports = app;