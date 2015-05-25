'use strict';

describe('test module', function(){
	var mod;

	beforeEach(function(){
		var application = new Tc.Application();
		mod = new Tc.Module.Test(document.createElement('div'), application.sandbox);
	});

	it('should have a "start" method', function(){
		expect(mod.start).toBeDefined();
	});

	it('should execute the callback in the "start" method', function(){
		var called = false;
		spyOn(mod, 'start').and.callFake(function() {
			called = true;
		});

		expect(mod.on).toHaveBeenCalled();
		expect(called).toBeTruthy();
	});
});
