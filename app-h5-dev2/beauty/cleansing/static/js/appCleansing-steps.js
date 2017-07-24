/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var StateMixin = ReactRouter.State;
	var CleansingSteps = React.createClass({
		displayName: 'CleansingSteps',

		mixins: [StateMixin],
		componentDidUpdate: function componentDidUpdate() {
			try {
				myscrollersteps.refresh();
			} catch (err) {}
		},
		componentDidMount: function componentDidMount(argument) {
			setTimeout(function () {
				myscrollersteps = new iScroll("panel-scroller-steps", {
					vScroll: true,
					vScrollbar: false,
					onBeforeScrollStart: function onBeforeScrollStart(e) {
						var target = e.target;
						while (target.nodeType != 1) {
							target = target.parentNode;
						}if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') e.preventDefault();
					}
				});
			}, 200);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'app-body', id: 'panel-scroller-steps' },
				React.createElement(
					'div',
					{ style: { paddingBottom: 100 } },
					React.createElement(
						'div',
						{ className: 'c-steps-title' },
						'请按以下步骤进行洁面'
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div1' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'1'
							),
							React.createElement('div', { className: 'steps-div1-hr' })
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'额头'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears1,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime1,
								's'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div2' },
						React.createElement(
							'div',
							{ className: 'steps-div2-left' },
							React.createElement(
								'div',
								{ className: 'steps-div2-place' },
								'鼻子'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-gears' },
								'档位:',
								this.getParams().gears2,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-time' },
								'洁面时间:',
								this.getParams().runtime2,
								's'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div2-center' },
							React.createElement(
								'div',
								{ className: 'steps-div2-center-circle' },
								'2'
							),
							React.createElement('div', { className: 'steps-div2-hr' })
						),
						React.createElement('div', { className: 'steps-div2-right' })
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div3' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'3'
							),
							React.createElement('div', { className: 'steps-div1-hr' })
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'下巴'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears3,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime3,
								's'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div2' },
						React.createElement(
							'div',
							{ className: 'steps-div2-left' },
							React.createElement(
								'div',
								{ className: 'steps-div2-place' },
								'左脸'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-gears' },
								'档位:',
								this.getParams().gears4,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-time' },
								'洁面时间:',
								this.getParams().runtime4,
								's'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div2-center' },
							React.createElement(
								'div',
								{ className: 'steps-div2-center-circle' },
								'4'
							),
							React.createElement('div', { className: 'steps-div2-hr' })
						),
						React.createElement('div', { className: 'steps-div2-right' })
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div3' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'5'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'右脸'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears5,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime5,
								's'
							)
						)
					)
				)
			);
		}
	});
	module.exports = CleansingSteps;

/***/ }
/******/ ]);