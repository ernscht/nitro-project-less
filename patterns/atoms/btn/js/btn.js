'use strict';

// import $ from 'jquery';
// import T from 'terrific';

/**
 * Btn module implementation.
 *
 * @author Pre Name <pre.name@domain.com>
 */

T.Module.Btn = T.createModule({
	start: function(resolve) {
		const $ctx = $(this._ctx);

		console.log('Btn - start [id:' + $ctx.data('t-id') + ']');

		var globalvar = true;
		if (globalvar == true)
			var so = 'bli'

		resolve();
	}
});
