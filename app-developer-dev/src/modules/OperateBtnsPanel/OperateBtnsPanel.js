'use strict';

/**
 * 控制面板类
 * 主全局控制
 * @author   tomhou
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _Store = require('../../apps/playground/Store');

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
                mixins: [_reflux2.default.connect(_Store.Store)],
                componentDidMount: function componentDidMount() {
                    this._interval = setInterval(this.saveProject, 60000);
                },
                componentWillUnmount: function componentWillUnmount() {
                    clearInterval(this._interval);
                },
                showSnapline: function showSnapline(e) {
                    var type = e.currentTarget.getAttribute('data-type');
                    _Actions.Actions.showPanel(type);
                },
                historyBack: function historyBack() {
                    _Actions.Actions.historyBack();
                },
                historyForward: function historyForward() {
                    _Actions.Actions.historyForward();
                },
                previewProject: function previewProject() {
                    _Actions.Actions.saveProject();
                    _Actions.Actions.makeHtml(true);
                },
                publishProject: function publishProject() {
                    _Actions.Actions.saveProject();
                    this.props.publishFun();
                    // location.hash = 'publish';
                },
                saveProject: function saveProject() {
                    _Actions.Actions.saveWidgets();
                    _Actions.Actions.saveProject();
                },
                render: function render() {
                    var icon = _react2.default.createElement('i', { className: 'spriterImg' });

                    return _react2.default.createElement(
                        'div',
                        { className: 'operate-wrap' },
                        _react2.default.createElement(
                            'div',
                            { className: 'operate-list' },
                            _react2.default.createElement(
                                'div',
                                { className: 'operate-btn' },
                                _react2.default.createElement(
                                    'h2',
                                    null,
                                    this.state.title
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-save', onClick: this.saveProject },
                                        icon
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-back', onClick: this.historyBack },
                                        icon
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-go', onClick: this.historyForward },
                                        icon
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-snapline', style: { display: "none" }, 'data-type': 'snapLine', onClick: this.showSnapline },
                                        icon
                                    )
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-publish', onClick: this.publishProject },
                                        _react2.default.createElement('i', null)
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'icon-preview', onClick: this.previewProject },
                                        _react2.default.createElement('i', null)
                                    )
                                )
                            )
                        )
                    );
                }
            });
        }
    }]);

    return AssetsPanel;
}(_PanelBase2.PanelBase);

exports.default = AssetsPanel;