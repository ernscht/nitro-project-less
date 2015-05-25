(function($) {
	'use strict';
	/**
	 * mole module implementation.
	 *
	 * @author ernscht <ernscht@gmail.com>
	 * @namespace Tc.Module
	 * @class Mole
	 * @extends Tc.Module
	 */
	function Mole(ctx, sandbox) {
		T.Module.call(this, ctx, sandbox);
	}

	util.inherits(Mole, T.Module);

	Mole.prototype.start = function(callback) {
		var $ctx = $(this.ctx);

		callback();
	};

	T.Module.Mole = Mole;
}(jQuery));
