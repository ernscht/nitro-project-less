((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * Template decorator implementation for the Ex module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 */
	T.Module.Ex.Template = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);

			$ctx.on('click', '.js-m-ex__add', () => {
				if (T.tpl && T.tpl.ex) {
					const theData = {
						decorator: 'Template',
						title: 'Client Side Rendered Ex Module',
						links: [
							{
								uri: 'index',
								text: 'Link One',
							},
							{
								uri: 'index',
								text: 'Link Two',
							},
						],
					};
					const pattern = T.tpl.ex(theData);
					const $pattern = $(pattern);

					this._sandbox.addModules($pattern.get(0));
					$ctx.after($pattern);

					/* eslint-disable no-console */
					console.log(`Client Side Template Ex rendered [id:${$pattern.data('t-id')}]`);
					/* eslint-enable no-console */
				}
			});

			$ctx.on('click', '.js-m-ex__more', () => {
				if (T.tpl && T.tpl.ex && T.tpl.ex.links) {
					const theData = {
						links: [
							{
								uri: 'index',
								text: 'One more link',
							},
							{
								uri: 'index',
								text: 'Another link',
							},
						],
					};
					const links = T.tpl.ex.links(theData);
					const $links = $(links);

					$ctx.find('.js-m-ex__list').append($links);
				}
			});

			/* eslint-disable no-console */
			console.log(`Ex Decorator Template - start id: [${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			// calling original method
			this._parent.start(resolve);
		},
	});
})(jQuery));
