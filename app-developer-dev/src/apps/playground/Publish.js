'use strict';
/**
 * 发布面板
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 配置信息

var Release = require('../appName/index');

var PublishClass = function (_BaseClass) {
    _inherits(PublishClass, _BaseClass);

    function PublishClass() {
        _classCallCheck(this, PublishClass);

        return _possibleConstructorReturn(this, (PublishClass.__proto__ || Object.getPrototypeOf(PublishClass)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(PublishClass, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        title: '',
                        remark: ''
                    };
                },
                componentWillMount: function componentWillMount() {
                    _Actions.Actions.refreshState(); // 刷新state
                },
                render: function render() {

                    // <div>标题：{this.state.title}</div>
                    // 提交方法： Actions.publishProject(title, remark);
                    return _react2.default.createElement(Release, { title: this.state.title, remark: this.state.remark });
                }
            });
        }
    }]);

    return PublishClass;
}(_Base.BaseClass);

exports.default = PublishClass;