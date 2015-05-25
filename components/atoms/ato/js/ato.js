(function($) {
	'use strict';
	/**
	 * ato module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace Tc.Module
	 * @class Ato
	 * @extends Tc.Module
	 */
	function Ato(ctx, sandbox) {
		T.Module.call(this, ctx, sandbox);
	}

	util.inherits(Ato, T.Module);

	Ato.prototype.start = function(callback) {
		var $ctx = $(this.ctx);

		callback();
	};

	T.Module.Ato = Ato;
}(jQuery));
