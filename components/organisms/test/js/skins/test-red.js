(function($) {
	'use strict';
	/**
	 * Red skin implementation for the test module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module.Test
	 * @class Red
	 * @extends T.Module
	 */
	T.Module.Test.Red = function(module) {
		var start = module.start.bind(module);
		module.start = function(callback) {
			var $ctx = $(this._ctx);

			start(callback); // calling original
		};
	};
}(jQuery));
