'use strict';
/**
 * 预览面板
 * @author
 * @datetime
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Base = require('../../core/Base.class');

var _Actions = require('./Actions');

var _Store = require('./Store');

var _app = require('../../config/app.config');

var _common = require('../../modules/common');

var Comm = _interopRequireWildcard(_common);

var _HeaderPanel = require('../../modules/HeaderPanel/HeaderPanel');

var _HeaderPanel2 = _interopRequireDefault(_HeaderPanel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Router from 'react-router';
// 配置信息

// 公共函数模块


// 头部面板


var QRCode = require('../2DCode/index');

// 生成各模块实例
var Header = new _HeaderPanel2.default();

// 获取各模块React组件
var HeaderDom = Header.getComponent();

var PreviewClass = function (_BaseClass) {
    _inherits(PreviewClass, _BaseClass);

    function PreviewClass() {
        _classCallCheck(this, PreviewClass);

        return _possibleConstructorReturn(this, (PreviewClass.__proto__ || Object.getPrototypeOf(PreviewClass)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(PreviewClass, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        title: 'C-Life'
                    };
                },
                componentWillMount: function componentWillMount() {
                    _Actions.Actions.refreshState(); // 刷新state
                },
                render: function render() {
                    if (this.state.previewUrl) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'preview-body' },
                            _react2.default.createElement(QRCode, { title: this.state.title, url: this.state.previewUrl })
                        );
                    } else {
                        return null;
                    }
                }
            });
        }
    }]);

    return PreviewClass;
}(_Base.BaseClass);

exports.default = PreviewClass;