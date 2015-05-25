(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.T = factory();
  }
}(this, function() {
/*!
 * TerrificJS modularizes your frontend code by solely relying on naming conventions.
 * http://terrifically.org
 *
 * @copyright   Copyright (c) 2015 Remo Brunschwiler
 * @license     Licensed under MIT license
 * @version     3.0.0-beta.2
 */

/**
 * @module T
 */

/**
 * Responsible for application-wide issues such as the creation of modules.
 *
 * @author Remo Brunschwiler
 * @namespace T
 * @class Application
 *
 * @constructor
 * @param {Node} ctx
 *      The context node
 * @param {Object} config
 *      The configuration
 */
/* global Sandbox, Module, Utils */
function Application(ctx, config) {
	// validate params
	if (!ctx && !config) {
		// both empty
		ctx = document;
		config = {};
	}
	else if (config instanceof Node) {
		// reverse order of arguments
		var tmpConfig = config;
		config = ctx;
		ctx = tmpConfig;
	}
	else if (!(ctx instanceof Node) && !config) {
		// only config is given
		config = ctx;
		ctx = document;
	}
	else if (ctx instanceof Node && !config) {
		// only ctx is given
		config = {};
	}

	/**
	 * The context node.
	 *
	 * @property _ctx
	 * @type Node
	 */
	this._ctx = ctx;

	/**
	 * The sandbox to get the resources from.
	 * The singleton is shared between all modules.
	 *
	 * @property _sandbox
	 * @type Sandbox
	 */
	this._sandbox = new Sandbox(this, config);

	/**
	 * Contains references to all modules on the page.
	 *
	 * @property _modules
	 * @type Object
	 */
	this._modules = {};

	/**
	 * The next unique module id to use.
	 *
	 * @property id
	 * @type Number
	 */
	this._id = 1;
}

/**
 * Register modules within the context
 * Automatically registers all modules within the context,
 * as long as the modules use the naming conventions.
 *
 * @method registerModules
 * @param {Node} ctx
 *      The context node
 * @return {Object}
 *      A collection containing the registered modules
 */
Application.prototype.registerModules = function (ctx) {
	var modules = {};

	ctx = ctx || this._ctx;

	this._sandbox.dispatch('t.register.start');

	// check childrens
	var nodes = [].slice.call(ctx.querySelectorAll('[data-t-name]'));

	// check context itself
	if(ctx.matches('[data-t-name]')) {
		nodes.unshift(ctx);
	}

	// check childrens
	nodes.forEach(function (ctx) {

		/*
		 * A module can have different data attributes.
		 * See below for possible values.
		 */

		/*
		 * @config data-t-name="{mod-name}"
		 *
		 * Example: data-t-name="foo"
		 * Indicates that the module Foo should be bound.
		 */

		/*
		 * @config data-t-namespace="{namespace}"
		 *
		 * Example: data-t-skin="App.Components"
		 * The namespace of the module. Optional.
		 */

		/*
		 * @config data-t-skin="{skin-name}"
		 *
		 * Example: data-t-skin="bar"
		 * Indicates that the module Foo should be decorated by the skin Bar.
		 * Multiple skins should be comma-separated. Optional.
		 */
		var module = this.registerModule(ctx, ctx.getAttribute('data-t-name'), ctx.getAttribute('data-t-skin'), ctx.getAttribute('data-t-namespace'));

		if (module) {
			modules[module.id] = module;
		}
	}.bind(this));

	this._sandbox.dispatch('t.register.end');

	return modules;
};

/**
 * Unregisters the modules given by the module instances.
 *
 * @method unregisterModules
 * @param {Object} modules
 *      A collection containing the modules to unregister
 */
Application.prototype.unregisterModules = function (modules) {
	modules = modules || this._modules;

	this._sandbox.dispatch('t.unregister.start');

	// unregister the given modules
	for (var id in modules) {
		if (modules.hasOwnProperty(id)) {
			delete this._modules[id];
		}
	}

	this._sandbox.dispatch('t.unregister.end');
};

/**
 * Starts (intializes) the registered modules.
 *
 * @method start
 * @param {Object} modules
 *      A collection of modules to start
 * @return {Promise}
 *      The synchronize Promise
 */
Application.prototype.start = function (modules) {
	modules = modules || this._modules;

	var promises = [];

	this._sandbox.dispatch('t.start');

	// start the modules
	function getPromise(id) {
		return new Promise(function (resolve) {
			modules[id].start(function() {
				resolve();
			});
		});
	}

	for (var id in modules) {
		if (modules.hasOwnProperty(id)) {
			promises.push(getPromise(id));
		}
	}

	// synchronize modules
	var all = Promise.all(promises);
	all.then(function () {
		this._sandbox.dispatch('t.sync');
	}.bind(this))
		.catch(function (error) {
			throw Error('Synchronizing the modules failed: ' + error);
		});

	return all;
};

/**
 * Stops the registered modules.
 *
 * @method stop
 * @param {Object} modules
 *      A collection of modules to stop
 */
Application.prototype.stop = function (modules) {
	modules = modules || this._modules;

	this._sandbox.dispatch('t.stop');

	// stop the modules
	for (var id in modules) {
		if (modules.hasOwnProperty(id)) {
			modules[id].stop();
		}
	}
};

/**
 * Registers a module.
 *
 * @method registerModule
 * @param {Node} ctx
 *      The context node
 * @param {String} mod
 *      The module name. It must match the class name of the module
 * @param {Array} skins
 *      A list of skin names. Each entry must match a class name of a skin
 * @param {String} namespace
 *      The module namespace
 * @return {Module}
 *      The reference to the registered module
 */
Application.prototype.registerModule = function (ctx, mod, skins, namespace) {
	var modules = this._modules;

	// validate params
	mod = Utils.capitalize(Utils.camelize(mod));

	if(Utils.isString(skins)) {
		if(window[skins]) {
			// skins param is the namespace
			namespace = window[skins];
			skins = null;
		}
		else {
			// convert string to array
			skins = skins.split(',');
		}
	}
	else if(!Array.isArray(skins) && Utils.isObject(skins)) {
		// skins is the namespace object
		namespace = skins;
		skins = null;
	}

	skins = skins || [];
	skins = skins.map(function (skin) {
		return Utils.capitalize(Utils.camelize(skin.trim()));
	});

	namespace = namespace || Module;

	if (namespace[mod]) {
		// assign the module a unique id
		var id = this._id++;
		ctx.setAttribute('data-t-id', id);

		// instantiate module
		modules[id] = new namespace[mod](ctx, this._sandbox);

		// decorate it
		for(var i = 0, len = skins.length; i < len; i++) {
			var skin = skins[i];

			if (namespace[mod][skin]) {
				namespace[mod][skin](modules[id]);
			}
		}

		return modules[id];
	}

	this._sandbox.dispatch('t.missing', ctx, mod, skins, namespace);

	return null;
};

/**
 * Gets the appropriate module for the given ID.
 *
 * @method getModuleById
 * @param {int} id
 *      The module ID
 * @return {Module}
 *      The appropriate module
 */
Application.prototype.getModuleById = function (id) {
	if (this._modules[id]) {
		return this._modules[id];
	}
	else {
		throw Error('The module with the id ' + id +
		' does not exist');
	}
};

/**
 * The sandbox is used as a central point to get resources from, add modules etc.
 * It is shared between all modules.
 *
 * @author Remo Brunschwiler
 * @namespace T
 * @class Sandbox
 *
 * @constructor
 * @param {Application} application
 *      The application reference
 * @param {Object} config
 *      The configuration
 */
function Sandbox(application, config) {
	/**
	 * The application.
	 *
	 * @property _application
	 * @type Application
	 */
	this._application = application;

	/**
	 * The configuration.
	 *
	 * @property config
	 * @type Object
	 */
	this._config = config;

	/**
	 * Contains references to all module connectors.
	 *
	 * @property _connectors
	 * @type Array
	 */
	this._connectors = [];
}

/**
 * Adds (register and start) all modules in the given context scope.
 *
 * @method addModules
 * @param {Node} ctx
 *      The context node
 * @return {Object}
 *      A collection containing the registered modules
 */
Sandbox.prototype.addModules = function (ctx) {
	var modules = [],
		application = this._application;

	if (ctx instanceof Node) {
		// register modules
		modules = application.registerModules(ctx);

		// start modules
		application.start(modules);
	}

	return modules;
};

/**
 * Removes a module by module instances.
 * This stops and unregisters a module through a module instance.
 *
 * @method removeModules
 * @param {any} modules
 *      A collection of module to remove | Node context to look for registered modules in.
 * @return {Sandbox}
 */
Sandbox.prototype.removeModules = function (modules) {
	var application = this._application;

	if (modules instanceof Node) {
		// get modules
		var tmpModules = [];

		var fragment = document.createDocumentFragment();
		fragment.appendChild(modules);

		[].forEach.call(fragment.querySelectorAll('[data-t-name]'), function (ctx) {
			// check for instance
			var id = ctx.getAttribute('data-t-id');

			if (id !== undefined) {
				var module = this.getModuleById(id);

				if (module) {
					tmpModules.push(module);
				}
			}
		}.bind(this));

		modules = tmpModules;
	}

	if (Array.isArray(modules)) {
		// stop modules – let the module clean itself
		application.stop(modules);

		// unregister modules – clean up the application
		application.unregisterModules(modules);
	}

	return this;
};

/**
 * Gets the appropriate module for the given ID.
 *
 * @method getModuleById
 * @param {int} id
 *      The module ID
 * @return {Module}
 *      The appropriate module
 */
Sandbox.prototype.getModuleById = function (id) {
	return this._application.getModuleById(id);
};

/**
 * Gets the application config.
 *
 * @method getConfig
 * @return {Object}
 *      The configuration object
 */
Sandbox.prototype.getConfig = function () {
	return this._config;
};

/**
 * Gets an application config param.
 *
 * @method getConfigParam
 * @param {String} name
 *      The param name
 * @return {any}
 *      The appropriate configuration param
 */
Sandbox.prototype.getConfigParam = function (name) {
	var config = this._config;

	if (config[name] !== undefined) {
		return config[name];
	}
	else {
		throw Error('The config param ' + name + ' does not exist');
	}
};

/**
 * Adds a connector instance.
 *
 * @method addConnector
 * @param {Connector} connector
 *      The connector
 * @return {Sandbox}
 */
Sandbox.prototype.addConnector = function (connector) {
	this._connectors.push(connector);
	return this;
};

/**
 * Removes a connector instance.
 *
 * @method addConnector
 * @param {Connector} connector
 *      The connector
 * @return {Sandbox}
 */
Sandbox.prototype.removeConnector = function (connector) {
	var connectors = this._connectors;
	for (var i = 0, len = connectors.length; i < len; i++) {
		if (connectors[i] === connector) {
			connectors.splice(i, 1);
			break;
		}
	}
	return this;
};

/**
 * Dispatches the event with the given arguments to the attached connectors.
 *
 * @method dispatch
 * @param {Mixed} ...
 * @return {Sandbox}
 */
Sandbox.prototype.dispatch = function () {
	var connectors = this._connectors;

	for(var i = 0, len = connectors.length; i < len; i++) {
		var connector = connectors[i];
		connector.handle.apply(connector, arguments);
	}

	return this;
};
/**
 * Base class for the different modules.
 *
 * @author Remo Brunschwiler
 * @namespace T
 * @class Module
 *
 * @constructor
 * @param {Node} ctx
 *      The context node
 * @param {Sandbox} sandbox
 *      The sandbox to get the resources from
 */
/* global Connector */
function Module(ctx, sandbox) {
	/**
	 * Contains the context node.
	 *
	 * @property ctx
	 * @type Node
	 */
	this._ctx = ctx;

	/**
	 * The sandbox to get the resources from.
	 *
	 * @property _sandbox
	 * @type Sandbox
	 */
	this._sandbox = sandbox;

	/**
	 * The emitter.
	 *
	 * @property _events
	 * @type Connector
	 */
	this._events = new Connector(sandbox);
}

/**
 * Template method to start the module.
 *
 * @method start
 * @param {Function} callback
 *      The synchronize callback
 */
Module.prototype.start = function (callback) {
	callback();
};

/**
 * Template method to stop the module.
 *
 * @method stop
 */
Module.prototype.stop = function () {
	this._events.disconnect();
};

/**
 * Responsible for inter-module communication.
 * Classic EventEmitter Api. Heavily inspired by https://github.com/component/emitter
 *
 * @author Remo Brunschwiler
 * @namespace T
 * @class Connector
 *
 * @constructor
 *
 * @param {Sandbox} sandbox
 *      The sandbox instance
 */
function Connector(sandbox) {
	/**
	 * The listeners.
	 *
	 * @property _listeners
	 * @type Object
	 */
	this._listeners = {};

	/**
	 * The sandbox instance.
	 *
	 * @property _sandbox
	 * @type Sandbox
	 */
	this._sandbox = sandbox;

	/**
	 * Indicates whether the instance is connected to the sandbox.
	 *
	 * @property _connected
	 * @type Boolean
	 */
	this._connected = false;
}

/**
 * Adds a listener for the given event.
 *
 * @method on
 * @param {String} event
 * @param {Function} listener
 * @return {Connector}
 */
Connector.prototype.on = Connector.prototype.addListener = function (event, listener) {
	this.connect();

	(this._listeners['$' + event] = this._listeners['$' + event] || []).push(listener);
	return this;
};

/**
 * Adds a listener that will be invoked a single
 * time and automatically removed afterwards.
 *
 * @method once
 * @param {String} event
 * @param {Function} listener
 * @return {Connector}
 */
Connector.prototype.once = function (event, listener) {
	this.connect();

	function on() {
		this.off(event, on);
		listener.apply(this, arguments);
	}

	on.listener = listener;
	this.on(event, on);
	return this;
};

/**
 * Remove the given listener for the given event or all
 * registered listeners.
 *
 * @method off
 * @param {String} event
 * @param {Function} listener
 * @return {Connector}
 */
Connector.prototype.off = Connector.prototype.removeListener = Connector.prototype.removeAllListeners = function (event, listener) {
	// all
	if (arguments.length === 0) {
		this._listeners = {};
		return this;
	}

	// specific event
	var listeners = this._listeners['$' + event];
	if (!listeners) {
		return this;
	}

	// remove all listeners
	if (arguments.length === 1) {
		delete this._listeners['$' + event];
		return this;
	}

	// remove specific listener
	var cb;
	for (var i = 0, len = listeners.length; i < len; i++) {
		cb = listeners[i];
		if (cb === listener || cb.listener === listener) {
			listeners.splice(i, 1);
			break;
		}
	}

	return this;
};

/**
 * Dispatches event to the sandbox.
 *
 * @method emit
 * @param {Mixed} ...
 * @return {Connector}
 */
Connector.prototype.emit = function () {
	this.connect();

	// dispatches event to the sandbox
	this._sandbox.dispatch.apply(this._sandbox, arguments);

	return this;
};

/**
 * Handles dispatched event from sandbox.
 *
 * @method handle
 * @param {String} event
 * @param {Mixed} ...
 * @return {Connector}
 */
Connector.prototype.handle = function (event) {
	var args = [].slice.call(arguments, 1),
		listeners = this._listeners['$' + event];

	if (listeners) {
		listeners = listeners.slice(0);
		for (var i = 0, len = listeners.length; i < len; ++i) {
			listeners[i].apply(this, args);
		}
	}

	return this;
};


/**
 * Return array of listeners for the given event.
 *
 * @method listeners
 * @param {String} event
 * @return {Array}
 */
Connector.prototype.listeners = function (event) {
	return this._listeners['$' + event] || [];
};

/**
 * Check if this connector has listeners.
 *
 * @method hasListeners
 * @param {String} event
 * @return {Boolean}
 */
Connector.prototype.hasListeners = function (event) {
	return !!this.listeners(event).length;
};

/**
 * Connect instance to the sandbox.
 *
 * @method connect
 * @return {Connector}
 */
Connector.prototype.connect = function () {
	if (!this._connected) {
		this._sandbox.addConnector(this);
		this._connected = true;
	}

	return this;
};

/**
 * Disconnect instance from the sandbox.
 *
 * @method disconnect
 * @return {Connector}
 */
Connector.prototype.disconnect = function () {
	if (this._connected) {
		this._sandbox.removeConnector(this);
		this._connected = false;
	}

	return this;
};


/**
 * Utility functions.
 *
 * @author Remo Brunschwiler
 * @namespace T
 * @class Utils
 * @static
 */
/* jshint unused: false */
var Utils = {
	/**
	 * Capitalizes the first letter of the given string.
	 *
	 * @method capitalize
	 * @param {String} str
	 *      The original string
	 * @return {String}
	 *      The capitalized string
	 */
	capitalize: function (str) {
		return str.substr(0, 1).toUpperCase().concat(str.substr(1));
	},

	/**
	 * Camelizes the given string.
	 *
	 * @method camelize
	 * @param {String} str
	 *      The original string
	 * @return {String}
	 *      The camelized string
	 */
	camelize: function (str) {
		return str.replace(/(\-[A-Za-z])/g, function ($1) {
			return $1.toUpperCase().replace('-', '');
		});
	},

	/**
	 * Check whether the given object is a string.
	 *
	 * @method isString
	 * @param {Object} obj
	 *      The object to check
	 * @return {Boolean}
	 */
	isString: function(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	},

	/**
	 * Check whether the given param is an object.
	 *
	 * @method isObject
	 * @param {Object} obj
	 *      The object to check
	 * @return {Boolean}
	 */

	isObject : function (obj) {
		return obj === Object(obj);
	}
};

/* global Application, Sandbox, Module, Connector, Utils */
/* jshint unused: false */
var T = {
	Application: Application,
	Sandbox: Sandbox,
	Module: Module,
	Connector: Connector,
	Utils: Utils,
	version: '3.0.0-beta.2'
};
return T;
}));
