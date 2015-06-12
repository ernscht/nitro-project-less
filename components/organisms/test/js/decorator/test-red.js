(function ($) {
	'use strict';
	/**
	 * Red decorator implementation for the Test module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 * @namespace T.Module.Test
	 * @class Red
	 * @extends T.Module
	 * @constructor
	 */
	T.Module.Test.Red = T.createDecorator({
		start: function (resolve) {
			var $ctx = $(this._ctx);

			console.log('Test Decorator Red - start id: [' + $ctx.data('t-id') + ']');

			this._parent.start(resolve); // calling original method
		}
	});
}(jQuery));
