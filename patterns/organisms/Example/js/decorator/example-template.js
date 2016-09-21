((($) => {
	'use strict';

	// import $ from 'jquery';
	// import T from 'terrific';

	/**
	 * Template decorator implementation for the Example module.
	 *
	 * @author Pre Name <pre.name@domain.com>
	 */
	T.Module.Example.Template = T.createDecorator({
		start(resolve) {
			const $ctx = $(this._ctx);

			$ctx.on('click', '.js-m-example__add', () => {
				if (T.tpl && T.tpl.example) {
					const theData = {
						decorator: 'Template',
						title: 'Client Side Rendered Example Module',
						links: [
							{
								uri: 'index',
								text: 'Link One'
							},
							{
								uri: 'index',
								text: 'Link Two'
							}
						]
					};
					const pattern = T.tpl.example(theData);
					const $pattern = $(pattern);

					this._sandbox.addModules($pattern.get(0));
					$ctx.after($pattern);

					/* eslint-disable no-console */
					console.log(`Client Side Template Example rendered [id:${$pattern.data('t-id')}]`);
					/* eslint-enable no-console */
				}
			});

			$ctx.on('click', '.js-m-example__more', () => {
				if (T.tpl && T.tpl.example && T.tpl.example.links) {
					const theData = {
						links: [
							{
								uri: 'index',
								text: 'One more link'
							},
							{
								uri: 'index',
								text: 'Another link'
							}
						]
					};
					const links = T.tpl.example.links(theData);
					const $links = $(links);

					$ctx.find('.js-m-example__list').append($links);
				}
			});

			/* eslint-disable no-console */
			console.log(`Example Decorator Template - start id: [${$ctx.data('t-id')}]`);
			/* eslint-enable no-console */

			// calling original method
			this._parent.start(resolve);
		}
	});
})(jQuery));
