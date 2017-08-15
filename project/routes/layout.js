'use strict';

/**
 * change layout for own pages
 */

const utils = require('../../app/core/utils');

function layout(req, res, next) {
	const isPage = !req.path.match(/^\/assets\//);
	if (isPage) {
		if (!req.query._layout) {
			res.locals.layout = utils.getLayoutPath('page');
		}
	}

	next();
}

module.exports = (app) => {
	app.route('*')
		.get(layout);
};
