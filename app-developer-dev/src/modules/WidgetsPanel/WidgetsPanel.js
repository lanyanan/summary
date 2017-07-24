'use strict';

/**
 * 控件面板类
 * 提供各种小控件选择功能
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PanelBase2 = require('../../core/PanelBase.class');

var _Widgets = require('./Widgets.class');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 控件库

var WidgetsPanel = function (_PanelBase) {
    _inherits(WidgetsPanel, _PanelBase);

    function WidgetsPanel() {
        _classCallCheck(this, WidgetsPanel);

        return _possibleConstructorReturn(this, (WidgetsPanel.__proto__ || Object.getPrototypeOf(WidgetsPanel)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(WidgetsPanel, [{
        key: 'getComponent',
        value: function getComponent() {
            var $Me = this;
            var widgets = _Widgets.Widgets.getArrayWidgets();
            return _react2.default.createClass({
                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        { className: 'widgetsArea' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'widgetBody' },
                            widgets.map(function (W) {
                                if (W.id == 1021) return false;
                                return _react2.default.createElement(W.prev, { key: W.id, 'data-wid': W.id, 'data-dragtype': 'widget' });
                            })
                        )
                    );
                }
            });
        }
    }]);

    return WidgetsPanel;
}(_PanelBase2.PanelBase);

exports.default = WidgetsPanel;