'use strict';

describe('btn module', function(){
	var mod;

	beforeEach(function(){
		var application = new T.Application();
		mod = new T.Module.Btn(document.createElement('div'), application.sandbox);
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
