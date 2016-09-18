'use strict';

describe('Btn module', function(){
	beforeEach(() => {
		const application = new T.Application();
		this.mod = new T.Module.Btn(document.createElement('div'), application._sandbox);
	});

	it('should have a .start() method', () => {
		expect(this.mod.start).toBeDefined();
	});

	it('should execute promise.resolve callback in the .start() method', () => {
		const resolve = jasmine.createSpy('resolve');
		this.mod.start(resolve);
		expect(resolve).toHaveBeenCalled();
	});
});
