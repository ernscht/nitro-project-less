var path = require('path');
var cfg = require('./config');
var utils = require('./utils');

function isHandlebarsLayout(layoutName) {
	var layoutPath = path.join(
		cfg.nitro.base_path,
		cfg.nitro.view_layouts_directory,
		'/' + layoutName + '.' + cfg.nitro.view_file_extension
	);
	return utils.fileExistsSync(layoutPath);
}

function getHandlebarsLayoutPath(layoutName) {
	var layoutPath = cfg.nitro.view_layouts_directory.replace(cfg.nitro.view_directory + '/', '') + '/' + layoutName;
	return layoutPath;
}

module.exports = {
	isHandlebarsLayout: isHandlebarsLayout,
	getHandlebarsLayoutPath: getHandlebarsLayoutPath
};
