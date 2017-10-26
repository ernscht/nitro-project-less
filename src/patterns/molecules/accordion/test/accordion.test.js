'use strict';

describe('accordion module', () => {
	let mod;
	describe('.start() method', () => {
		beforeEach(() => {
			const application = new T.Application();
			mod = new T.Module.Accordion(document.createElement('div'), application._sandbox);
		});

		it('should be defined', () => {
			expect(mod.start).toBeDefined();
		});

		it('should execute promise.resolve callback', () => {
			const resolve = jasmine.createSpy('resolve');
			mod.start(resolve);
			expect(resolve).toHaveBeenCalled();
		});
	});
});
