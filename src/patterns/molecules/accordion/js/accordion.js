((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	const funcA = (type) => {
		console.log(`funcA: type=${type}`); // eslint-disable-line
	};

	const funcB = (type = 'default') => {
		console.log(`funcB: type=${type}`); // eslint-disable-line
	};

	funcA('fromFunc');
	funcB();
	funcB('fromFunc');

	// oder
	const multiply = (a, b = 1.12345) => {
		return a * b;
	};

	/* eslint-disable */
	console.log(multiply(5, 2)); // 10
	console.log(multiply(5, 1)); // 5
	console.log(multiply(5)); // 5
	/* eslint-enable */

	/**
	 * accordion module implementation.
	 *
	 * @author Denis Skeledzic-Gemperli <denis.skeledzic@namics.com>
	 */
	T.Module.Accordion = T.createModule({
		start(resolve) {
			const $ctx = $(this._ctx);
			const $sections = $ctx.find('.js-m-accordion__section');
			this.id = $ctx.data('m-accordion-id');

			$ctx.on('click', '.js-m-accordion__section', (e) => {
				e.preventDefault();
				const $target = $(e.currentTarget);
				if ($target.hasClass('state-open')) {
					this.close($target);
				} else {
					this.open($target);
				}
			});

			// event emitter
			this._events.on('m-accordion.close', (id, sectionIds) => {
				if (id === this.id) {
					let $targets = $sections;
					if (sectionIds && Array.isArray(sectionIds)) {
						$targets = this._filterSections($sections, sectionIds);
					}

					$targets.each((i, el) => {
						this.close($(el));
					});
				}
			});

			this._events.on('m-accordion.open', (id, sectionIds) => {
				if (id === this.id) {
					let $targets = $sections;
					if (sectionIds && Array.isArray(sectionIds)) {
						$targets = this._filterSections($sections, sectionIds);
					}

					$targets.each((i, el) => {
						this.open($(el));
					});
				}
			});

			resolve();
		},

		open($target) {
			$target.addClass('state-open');

			const $icon = $target.find('.js-m-accordion__icon');
			$icon.addClass('state-end');

			const $content = $target.next('.js-m-accordion__content');
			$content.velocity('slideDown', {
				duration: 400,
				easing: 'swing',
			});

			this._events.emit('m-accordion.opened', this.id, $target.attr('data-m-accordion-section-id'));
		},

		close($target) {
			$target.removeClass('state-open');

			const $icon = $target.find('.js-m-accordion__icon');
			$icon.removeClass('state-end');

			const $content = $target.next('.js-m-accordion__content');
			$content.velocity('slideUp', {
				duration: 400,
				easing: 'swing',
			});

			this._events.emit('m-accordion.closed', this.id, $target.attr('data-m-accordion-section-id'));
		},

		_filterSections($sections, sectionIds) {
			return $sections.filter((i, el) => {
				if (sectionIds.indexOf($(el).attr('data-m-accordion-section-id')) > -1) {
					return true;
				}
				return false;
			});
		},
	});
})(jQuery));
