(function ($) {
	'use strict';
	/**
	 * Red skin implementation for the Test module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 * @namespace T.Module.Test
	 * @class Red
	 * @extends T.Module
	 * @constructor
	 */
	T.Module.Test.Red = function (module) {
		/**
		 * Override the appropriate methods from the decorated module (ie. module.get = function()).
		 */
		var start = module.start.bind(module);
		module.start = function (callback) {
			var $ctx = $(this._ctx);

			console.log('Test Skin Red - start id: [' + $ctx.data('t-id') + ']');

			start(callback); // calling original method
		};
	};
}(jQuery));
