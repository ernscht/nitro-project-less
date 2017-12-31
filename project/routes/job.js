var path = require('path');
var fs = require('fs');
var utils = require('./helpers/utils.js');

function search(req, res, next) {

	var data = JSON.parse(fs.readFileSync(path.join(__dirname, './data/jobs.json')));
	var jobs = data.jobs;
	var filters = data.filter;
	var activeFilters = {};
	var messages = data.messages;

	/* set filters */
	var setFilter = function (name, value) {
		if(name === 'query') {
			activeFilters[name] = value;
			filters[name] = value;
		}
		else if(filters[name].enabled) {
			var items = filters[name].items;
			for (var id in items) {
				if (items.hasOwnProperty(id)) {
					var item = items[id];
					if (item.id === value) {
						item.active = true;
						if(value !== 'all') {
							activeFilters[name] = value;
						}
					}
					else {
						item.active = false;
					}
				}
			}
		}
	};

	// query search
	if (req.query.query) {
		setFilter('query', req.query.query);
	}

	if (req.query.expert) {
		setFilter('expert', req.query.expert);
	}

	if (req.query.location) {
		setFilter('location', req.query.location);
	}

	if (req.query.sort) {
		setFilter('sort', req.query.sort);
	}

	/* calculate results */
	var applyFilter = function (filter) {
		// calculate results
		if (activeFilters[filter]) {
			jobs = jobs.filter(function (job) {
				if(filter === 'query') {
					if(job.profile && job.profile.title && job.profile.title.indexOf(activeFilters[filter]) > -1) {
						// mark matched substring in title
						job.profile.title = job.profile.title.replace(activeFilters[filter], '<mark>' + activeFilters[filter] + '</mark>');
						return true;
					}
				}
				else if (Array.isArray(job[filter])) {
					if (job[filter] && job[filter].indexOf(activeFilters[filter]) > -1) {
						return true;
					}
				}

				return false;
			});
		}
	};

	for (var name in filters) {
		if (filters.hasOwnProperty(name)) {
			applyFilter(name);

			if (filters[name].items) {
				filters[name].items.forEach(function(item) {
					//item.count = utils.getRandomInt(3,55);
					item.count = 55;
				});
			}
		}
	}

	var response = {
		success: true,
		messages: {
			noResults: jobs.length > 0 ? '' : messages.noResults
		},
		jobs: jobs,
		filter: filters
	};

	setTimeout(function(){
		return res.json(response);
	},utils.getRandomInt(250,2000));
}

module.exports = function (app) {
	app.route('/api/jobs/search')
		.get(search);
};

