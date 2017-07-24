'use strict';

/**
 * 代码面板类
 * @author   vilien
 * @datetime 2016-1-16
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

var _pubsub = require('../../core/pubsub');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 发布/订阅模式库

var CodePanel = function (_PanelBase) {
    _inherits(CodePanel, _PanelBase);

    function CodePanel() {
        _classCallCheck(this, CodePanel);

        return _possibleConstructorReturn(this, (CodePanel.__proto__ || Object.getPrototypeOf(CodePanel)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(CodePanel, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                selectionIndex: 0,
                needsave: false,
                getInitialState: function getInitialState() {
                    return {
                        pages: {
                            activePage: 0,
                            activeWidget: -1,
                            pageList: [{
                                widgetList: [{}]
                            }]
                        },
                        panelSwitch: {
                            codePanelSwitch: 2
                        },
                        _height: 160
                    };
                },
                componentDidMount: function componentDidMount() {
                    var _this2 = this;

                    (0, _pubsub.subscribe)('codepanel_resize', function (offset) {
                        var height = _this2.state._height - offset;
                        height = height < 100 ? 100 : height;
                        _this2.setState({ _height: height });
                    });
                },
                componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
                    //保证任何时候失去焦点都可保存已修改的代码
                    if (this.state.pages.activeWidget !== -1) {
                        var codeNode = _react2.default.findDOMNode(this.refs.code);
                        if (this.needsave && codeNode.value) {
                            var codetype = _react2.default.findDOMNode(this.refs.tags).querySelector('li[data-codetype].active').getAttribute('data-codetype');
                            _Actions.Actions.changeWidgetCode(codetype, codeNode.value, this.state.pages.activeWidget);
                            this.needsave = false;
                        }
                    }
                },
                componentDidUpdate: function componentDidUpdate() {
                    var codeNode = _react2.default.findDOMNode(this.refs.code);
                    var activePage = this.state.pages.activePage;
                    var activeWidget = this.state.pages.activeWidget;
                    var widget = this.state.pages.pageList[activePage].widgetList[activeWidget] || {};
                    codeNode.value = widget.cssCode || '';
                    // codeNode.selectionStart = this.selectionIndex;
                    // codeNode.selectionEnd = this.selectionIndex;
                },
                closePanel: function closePanel() {
                    _Actions.Actions.showPanel('codePanel');
                },
                changeCode: function changeCode(e) {
                    if (this.state.pages.activeWidget === -1) {
                        _react2.default.findDOMNode(this.refs.code).value = '';
                        return;
                    }
                    this.needsave = true;
                    this.selectionIndex = e.currentTarget.selectionStart;
                    //React.findDOMNode(this.refs.submitBtn).style.display='';
                },
                pushHistory: function pushHistory(e) {
                    var codetype = _react2.default.findDOMNode(this.refs.tags).querySelector('li[data-codetype].active').getAttribute('data-codetype');
                    _Actions.Actions.changeWidgetCode(codetype, e.currentTarget.value);
                    _Actions.Actions.historyPush();
                    this.needsave = false;
                    //React.findDOMNode(this.refs.submitBtn).style.display='none';
                },
                render: function render() {
                    var display = this.state.panelSwitch.codePanelSwitch === 1 ? 'block' : 'none';
                    return _react2.default.createElement(
                        'section',
                        { className: 'codepanel-wrap' },
                        _react2.default.createElement('div', { className: 'resize', 'data-dragtype': 'codePanel' }),
                        _react2.default.createElement(
                            'ul',
                            { ref: 'tags', className: 'tags' },
                            _react2.default.createElement(
                                'li',
                                { 'data-codetype': 'js' },
                                'Javascript'
                            ),
                            _react2.default.createElement(
                                'li',
                                { 'data-codetype': 'css', className: 'active' },
                                'CSS'
                            ),
                            _react2.default.createElement('li', { className: "close " + (this.state.panelSwitch.codePanelSwitch === 1 ? 'code-on' : 'code-off'),
                                onClick: this.closePanel })
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { height: this.state._height, display: display }, className: 'code-wrap' },
                            _react2.default.createElement('textarea', { ref: 'code', onChange: this.changeCode, onBlur: this.pushHistory })
                        )
                    );
                }
            });
        }
    }]);

    return CodePanel;
}(_PanelBase2.PanelBase);

exports.default = CodePanel;