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

	describe('should emit("m-accordion.opened")', function() {
		beforeEach(function () {
			var application = new T.Application();
			this.mod = new T.Module.Accordion($(Handlebars.templates['accordion'](window.__json__['accordion'])).get(0), application._sandbox);
			this.emitter = new T.EventEmitter(application._sandbox);
			this.mod.start(function() {});
		});

		it('if a closed section is clicked', function (done) {
			this.emitter.on('m-accordion.opened', function(id, sectionId) {
				expect(id).toEqual('accordion');
				expect(sectionId).toEqual('section-3');
				done();
			});

			$(this.mod._ctx).find('[data-m-accordion-section-id="section-3"]').trigger('click');
		});

		it('if a section is opened', function (done) {
			this.emitter.on('m-accordion.opened', function(id, sectionId) {
				expect(id).toEqual('accordion');
				expect(sectionId).toEqual('section-2');
				done();
			});

			this.emitter.emit('m-accordion.open', 'accordion', ['section-2']);
		});
	});

	describe('should emit("m-accordion.closed")', function() {
		beforeEach(function () {
			var application = new T.Application();
			this.mod = new T.Module.Accordion($(Handlebars.templates['accordion'](window.__json__['accordion'])).get(0), application._sandbox);
			this.emitter = new T.EventEmitter(application._sandbox);
			this.mod.start(function() {});
		});

		it('if an opened section is clicked', function (done) {
			this.emitter.on('m-accordion.closed', function(id, sectionId) {
				expect(id).toEqual('accordion');
				expect(sectionId).toEqual('section-3');
				done();
			});

			$(this.mod._ctx).find('[data-m-accordion-section-id="section-3"]').trigger('click').trigger('click');
		});

		it('if a section is closed', function (done) {
			this.emitter.on('m-accordion.closed', function(id, sectionId) {
				expect(id).toEqual('accordion');
				expect(sectionId).toEqual('section-2');
				done();
			});

			this.emitter.emit('m-accordion.close', 'accordion', ['section-2']);
		});
	});
});
