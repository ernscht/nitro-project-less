'use strict';

describe('accordion module', function(){
	describe('.start() method', function() {
		beforeEach(function(){
			var application = new T.Application();
			this.mod = new T.Module.Accordion(document.createElement('div'), application._sandbox);
		});

		it('should be defined', function(){
			expect(this.mod.start).toBeDefined();
		});

		it('should execute promise.resolve callback', function(){
			var resolve = jasmine.createSpy('resolve');
			this.mod.start(resolve);
			expect(resolve).toHaveBeenCalled();
		});
	});
});
