(function ($) {
	'use strict';
	/**
	 * accordion module implementation.
	 *
	 * @author Denis Skeledzic-Gemperli <denis.skeledzic@namics.com>
	 * @namespace T.Module
	 * @class Accordion
	 * @extends T.Module
	 */
	T.Module.Accordion = T.createModule({
		start: function (resolve) {
			var $ctx = $(this._ctx);
			var $sections = $ctx.find('.js-m-accordion__section');
			this.id = $ctx.data('m-accordion-id');

			$ctx.on('click', '.js-m-accordion__section', function (e) {
				e.preventDefault();
				var $target = $(e.currentTarget);
				if ($target.hasClass('state-open')) {
					this.close($target);
				}
				else {
					this.open($target);
				}
			}.bind(this));

			// event emitter
			this._events.on('m-accordion.close', function (id, sectionIds) {
				if(id === this.id) {
					var $targets = $sections;
					if(sectionIds && Array.isArray(sectionIds)) {
						$targets = this._filterSections($sections, sectionIds);
					}

					$targets.each(function(i, el) {
						this.close($(el));
					}.bind(this));
				}
			}.bind(this));

			this._events.on('m-accordion.open', function (id, sectionIds) {
				if(id === this.id) {
					var $targets = $sections;
					if(sectionIds && Array.isArray(sectionIds)) {
						$targets = this._filterSections($sections, sectionIds);
					}

					$targets.each(function(i, el) {
						this.open($(el));
					}.bind(this));
				}
			}.bind(this));

			resolve();
		},

		open: function($target) {
			$target.addClass('state-open');

			var $icon = $target.find('.js-m-accordion__icon');
			$icon.addClass('state-end');

			var $content = $target.next('.js-m-accordion__content');
			$content.velocity('slideDown', {
				duration: 400,
				easing: 'swing'
			});

			this._events.emit('m-accordion.opened', this.id, $target.attr('data-m-accordion-section-id'));
		},

		close: function ($target) {
			$target.removeClass('state-open');

			var $icon = $target.find('.js-m-accordion__icon');
			$icon.removeClass('state-end');

			var $content = $target.next('.js-m-accordion__content');
			$content.velocity('slideUp', {
				duration: 400,
				easing: 'swing'
			});

			this._events.emit('m-accordion.closed', this.id, $target.attr('data-m-accordion-section-id'));
		},

		_filterSections: function($sections, sectionIds) {
			return $sections.filter(function(i, el) {
				if(sectionIds.indexOf($(el).attr('data-m-accordion-section-id')) > -1) {
					return true;
				}
				return false;
			}.bind(this));
		}
	});
})(jQuery);
