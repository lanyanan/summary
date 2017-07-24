'use strict';
/**
 * 选项卡属性类
 * @author   pan
 * @datetime 2017-04-18
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _CaptionProperty = require('./CaptionProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabProperty = exports.TabProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        componentDidMount: function componentDidMount() {
            if (this.props.widgetListItem.length == 1) {
                this.defaultEditTab(1);
                this.defaultEditTab(2);
            }
            if (this.props.activeTabIndex < 1) {
                _Actions.Actions.selectUserWidget(Number(this.props.activeWidget), null, 0);
            }
        },

        addTab: function addTab(e) {
            //添加一个选项
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.addTab(index);
            this.props.toggleDiv(index + 1, 'tabBar');
        },
        delTab: function delTab(e) {
            //删除指定的选项
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.delTab(index - 1);
        },
        editTab: function editTab(e) {
            //编辑指定的选项
            var index = Number(e.target.value - 1);
            _Actions.Actions.selectUserWidget(Number(this.props.activeWidget), null, index);
        },
        defaultEditTab: function defaultEditTab(value) {
            _Actions.Actions.addTab(value);
        },
        toggleDiv: function toggleDiv(e) {
            //切换选项的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'tabBar');
        },
        serializeTab: function serializeTab(e) {
            //tab选项优先显示，序列化
            var tid = Number(e.target.getAttribute('data-tid'));
            _Actions.Actions.serializeTab(tid);
        },
        changeTabName: function changeTabName(e) {
            //修改选项名
            var tid = Number(e.target.getAttribute('data-tid'));
            var snvalue = e.target.value;
            _Actions.Actions.changeTabName(tid, snvalue);
        },
        delTabName: function delTabName(e) {
            //删除选项名
            var tid = Number(e.target.getAttribute('data-tid'));
            _Actions.Actions.changeTabName(pid, '');
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            this.setState({
                hidden: false
            }, function () {
                _react2.default.findDOMNode(_this.refs.tabname).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.tabname).focus();
            });
        },
        hiddenBlur: function hiddenBlur(e) {
            this.setState({
                hidden: true
            });
        },
        keydown: function keydown(e) {
            //回车快捷键 提交命名结束
            if (e.keyCode == 13) {
                this.setState({ hidden: true });
            } else {
                return;
            }
        },

        render: function render() {
            var tabList = this.props.widgetListItem,
                activeWidget = this.props.activeWidget,
                activeTabIndex = this.props.activeTabIndex,
                //处于编辑状态的选项index
            i = this.props.index,
                //当前选项index
            priority = this.props.priority,
                //优先显示index
            tabName = tabList[i][0] ? tabList[i][0].tabName : '',
                allNum = tabList.length;
            if (activeTabIndex > -1) {
                tabName = tabList[activeTabIndex][0] ? tabList[activeTabIndex][0].tabName : '';
                i = activeTabIndex;
            }
            return _react2.default.createElement(
                'div',
                { className: 'property-tab' },
                _react2.default.createElement(
                    'section',
                    { className: 'property-tab-num' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6570\u91CF'
                    ),
                    _react2.default.createElement('input', { type: 'number', min: 2, value: allNum }),
                    _react2.default.createElement(
                        'lable',
                        { className: 'number-add', 'data-index': allNum, onClick: this.delTab },
                        '-'
                    ),
                    _react2.default.createElement(
                        'lable',
                        { className: 'number-reduce', 'data-index': allNum, onClick: this.addTab },
                        '+'
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'propertyt-tab-active' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5F53\u524D\u9009\u9879'
                    ),
                    _react2.default.createElement(
                        'select',
                        { ref: 'propertytTabNum', value: parseInt(activeTabIndex) + 1, onChange: this.editTab },
                        tabList.map(function (item, index) {
                            return _react2.default.createElement(
                                'option',
                                { value: index + 1, key: index },
                                index + 1
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'imageinfo', style: { display: tabList[i][0] ? '' : 'none' } },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u540D\u79F0'
                    ),
                    _react2.default.createElement('input', { className: 'picname', onChange: this.showFocus,
                        onFocus: this.showFocus, value: tabName, placeholder: '\u8BF7\u586B\u5199\u9009\u9879\u540D' }),
                    _react2.default.createElement('input', { className: 'picnamehidden', onChange: this.changeTabName, ref: 'tabname',
                        onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                        'data-tid': i, defaultValue: tabName, onKeyDown: this.keydown }),
                    _react2.default.createElement('span', { className: 'deleteinfo', 'data-tid': i, onClick: this.delTabName })
                )
            );
        }
    })
};