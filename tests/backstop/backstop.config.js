'use strict';

/**
 * backstop configuration
 * requires compiled assets
 * currently doesn't work with phantomjs
 */

const os = require('os');
const platform = os.platform();
const viewports = [
	{
		label: 'phone',
		width: 320,
		height: 568,
	},
	{
		label: 'tablet',
		width: 768,
		height: 1024,
	},
	{
		label: 'desktop',
		width: 1280,
		height: 1024,
	}
];

module.exports = (options) => {
	const scenarios = [
		{
			label: 'Homepage',
			url: `http://localhost:${options.port}/page`,
			onBeforeScript: 'onBefore.js',
			readyEvent: null,
			delay: 1000,
			hideSelectors: [],
			removeSelectors: [],
			onReadyScript: 'onReady.js',
			selectors: [
				'.o-test',
			],
			selectorExpansion: true,
			misMatchThreshold: 0.1,
			requireSameDimensions: true,
		},
	];

	return {
		id: 'nitro_test',
		viewports,
		scenarios,
		paths: {
			bitmaps_reference: `tests/backstop/bitmaps_reference/${platform}`,
			bitmaps_test: 'project/tmp/reports/backstop/bitmaps_test',
			engine_scripts: 'tests/backstop/engine_scripts',
			html_report: 'public/reports/backstop/html_report',
			ci_report: 'project/tmp/reports/backstop/ci_report',
		},
		engineFlags: [],
		engine: 'chrome',
		report: ['browser'],
		asyncCaptureLimit: 5,
		debug: false,
		debugWindow: false,
	}
};
