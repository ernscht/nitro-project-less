(function ($) {
	'use strict';
	/**
	 * Test module implementation.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 * @namespace T.Module
	 * @class Test
	 * @extends T.Module
	 */
	T.Module.Test = T.createModule({
		start: function (resolve) {
			var $ctx = $(this._ctx);

			console.log('Test - start [id:' + $ctx.data('t-id') + ']');

			var globalvar = true;
			if (globalvar == true)
			var so = 'bli'


			resolve();
		}
	});
}(jQuery));
