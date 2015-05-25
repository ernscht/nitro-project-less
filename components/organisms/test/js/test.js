(function($) {
	'use strict';
	/**
	 * test module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module
	 * @class Test
	 * @extends T.Module
	 */
	function Test(ctx, sandbox) {
		T.Module.call(this, ctx, sandbox);
	}

	util.inherits(Test, T.Module);
	T.Module.Test = Test;

	Test.prototype.start = function(callback) {
		var $ctx = $(this._ctx);

		console.log('Test - start [id:' + $ctx.data('t-id') + ']');

		callback();
	};
}(jQuery));
