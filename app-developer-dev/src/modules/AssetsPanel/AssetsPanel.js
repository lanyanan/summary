'use strict';

/**
 * 资产面板类
 * 主要负责页面列表导航
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AssetsPanel = function (_PanelBase) {
    _inherits(AssetsPanel, _PanelBase);

    function AssetsPanel() {
        _classCallCheck(this, AssetsPanel);

        return _possibleConstructorReturn(this, (AssetsPanel.__proto__ || Object.getPrototypeOf(AssetsPanel)).call(this));
        // if (new.target !== AssetsPanel) {
        //     throw new Error('必须使用new生成实例');
        // }
        // this.loadCssFile('playground/AssetsPanel.css');
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(AssetsPanel, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                render: function render() {
                    return _react2.default.createElement(
                        'div',
                        null,
                        'assets'
                    );
                }
            });
        }
    }]);

    return AssetsPanel;
}(_PanelBase2.PanelBase);

exports.default = AssetsPanel;