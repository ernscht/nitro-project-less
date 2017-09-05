((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * contact module implementation.
	 *
	 * @author Petra Weiss <petra.weiss@namics.com>
	 * @namespace T.Module
	 * @class Contact
	 * @extends T.Module
	 */
	T.Module.Contact = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);

			this.$contactLink = $ctx.find('.js-m-contact__link');
			this.$openingToggle = $ctx.find('.js-m-contact__openinginfo-toggle');
			this.$openingInfo = $ctx.find('.js-m-contact__openinginfo');
			this.$icon = this.$openingToggle.find('.js-m-btn-dropdown__icon');

			// events
			this.$openingToggle.on('click', () => {
				this.toggle();
			});

			this.$contactLink.on('click', (e) => {
				this.openAction($(e.currentTarget));
			});

			resolve();
		},

		toggle() {
			if (this.$openingToggle.hasClass('state-closed')) {
				this.openInfo();
			} else {
				this.closeInfo();
			}
		},

		openInfo() {
			// icon animation
			if (this.$icon.length > 0) {
				this.$icon.addClass('state-end');
			}

			this.$openingToggle.removeClass('state-closed');
			this.$openingInfo.addClass('state-open');
			this.$openingInfo.velocity('slideDown', {
				duration: 300,
				easing: 'swing',
				display: null,
			});
		},

		closeInfo() {
			// icon animation
			if (this.$icon.length > 0) {
				this.$icon.removeClass('state-end');
			}

			this.$openingToggle.addClass('state-closed');
			this.$openingInfo.velocity('slideUp', {
				duration: 300,
				easing: 'swing',
				display: null,
				complete: () => {
					this.$openingInfo.removeClass('state-open');
				},
			});
		},

		openAction($target) {
			const url = $target.data('m-contact-action');
			this._events.emit('m-overlay.open', 'overlay', $target, url);
		},

	});
})(jQuery));
