var path = require('path');
var fs = require('fs');
var utils = require('./helpers/utils.js');

function search(req, res, next) {
	// validation
	if (!req.query.query) {
		return res.json([]);
	}

	// load typeahead data
	var data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/countries.json')));
	var items = data;

	// title search
	if (req.query.query) {
		items = items.filter(function(item) {
			if(item.indexOf(req.query.query) > -1) {
				return true;
			}
			return false;
		});
	}

	setTimeout(function(){
		return res.json(items);
	},utils.getRandomInt(250,1000));
}

module.exports = function (app) {
	app.route('/api/countries/search')
		.get(search);
};
