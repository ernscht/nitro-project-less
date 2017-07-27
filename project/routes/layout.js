/**
 * change layout for own pages
 */

'use strict';

const utils = require('../../app/core/utils');

function layout(req, res, next) {
	if (!req.query._layout) {
		res.locals.layout = utils.getLayoutPath('page');
	}
	next();
}

module.exports = (app) => {
	app.route('*')
		.get(layout);
};
