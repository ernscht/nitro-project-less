(function($) {
	'use strict';
	/**
	 * red skin implementation for the test module.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace Tc.Module.Test
	 * @class Red
	 * @extends Tc.Module
	 */
	T.Module.Test.Red = function(module) {
		var start = module.start;

		module.start = function(callback) {
			var $ctx = $(this.ctx);

			start(callback);
		};
	};
}(Tc.$));
