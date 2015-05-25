(function($) {
	'use strict';
	/**
	 * test module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace Tc.Module
	 * @class Test
	 * @extends Tc.Module
	 */
	function Test(ctx, sandbox) {
		T.Module.call(this, ctx, sandbox);
	}

	util.inherits(Test, T.Module);

	Test.prototype.start = function(callback) {
		var $ctx = $(this.ctx);

		callback();
	};

	T.Module.Test = Test;
}(jQuery));
