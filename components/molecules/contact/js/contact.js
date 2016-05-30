(function($) {
	'use strict';
	/**
	 * contact module implementation.
	 *
	 * @author Petra Weiss <petra.weiss@namics.com>
	 * @namespace T.Module
	 * @class Contact
	 * @extends T.Module
	 */
	T.Module.Contact = T.createModule({
		start: function(resolve) {
			var $ctx = $(this._ctx);

			this.$contactLink = $ctx.find('.js-m-contact__link');
			this.$openingToggle = $ctx.find('.js-m-contact__openinginfo-toggle');
			this.$openingInfo = $ctx.find('.js-m-contact__openinginfo');
			this.$icon = this.$openingToggle.find('.js-m-btn-dropdown__icon');

			// events
			this.$openingToggle.on('click', function () {
				this.toggle();
			}.bind(this));

			this.$contactLink.on('click', function (e) {
				this.openAction($(e.currentTarget));
			}.bind(this));

			resolve();
		},

		toggle: function () {
			if (this.$openingToggle.hasClass('state-closed')) {
				this.openInfo();
			}
			else {
				this.closeInfo();
			}
		},

		openInfo: function () {
			// icon animation
			if(this.$icon.length > 0) {
				this.$icon.addClass('state-end');
			}

			this.$openingToggle.removeClass('state-closed');
			this.$openingInfo.addClass('state-open');
			this.$openingInfo.velocity('slideDown', {
				duration: 300,
				easing: 'swing',
				display: null
			});
		},

		closeInfo: function () {
			// icon animation
			if(this.$icon.length > 0) {
				this.$icon.removeClass('state-end');
			}

			this.$openingToggle.addClass('state-closed');
			this.$openingInfo.velocity('slideUp', {
				duration: 300,
				easing: 'swing',
				display: null,
				complete: function(){
					this.$openingInfo.removeClass('state-open');
				}.bind(this)
			});
		},

		openAction: function ($target) {
			var url = $target.data('m-contact-action');
			this._events.emit('m-overlay.open', 'overlay', $target, url);
		}

	});
}(jQuery));
