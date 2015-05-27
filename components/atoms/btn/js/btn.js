(function($) {
	'use strict';
	/**
	 * btn module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace T.Module
	 * @class Btn
	 * @extends T.Module
	 */
	function Btn(ctx, sandbox) {
		T.Module.call(this, ctx, sandbox);
	}

	util.inherits(Btn, T.Module);
	T.Module.Btn = Btn;

	Btn.prototype.start = function(callback) {
		var $ctx = $(this._ctx);

		callback();
	};
}(jQuery));
