'use strict';
/**
 * 指令属性面板类
 * @author   xinglin
 * @datetime 2016-01-25
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.commandProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commandProperty = exports.commandProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                show: false
            };
        },
        selectType: function selectType(e) {
            //更改控件是否发送指令
            var type = e.target.value;
            var pid = this.props.index;
            _Actions.Actions.changeCommandType(pid, type);
            this.setState({ show: false });
        },
        ListCheck: function ListCheck(e) {
            //修改控件当前状态显示名
            var property = e.target.getAttribute('data-value');
            var pid = this.props.index;
            if (e.target.checked) {
                var fieldIndex = e.target.getAttribute('data-findex');
                var byteLength = Number(e.target.getAttribute('data-blength'));
                _Actions.Actions.addCheckedCommand(pid, property, fieldIndex, byteLength);
            } else {
                _Actions.Actions.delCheckedCommand(pid, property);
            }
        },
        showCheckList: function showCheckList(e) {
            //显示列表
            this.setState({ show: true });
        },
        hiddenCheckList: function hiddenCheckList(e) {
            //隐藏列表
            this.setState({ show: false });
        },
        render: function render() {
            var _this = this;

            var dataList = this.props.dataList || [];
            var checkedList = this.props.checkedList || [];
            var commandType = this.props.commandType || '0';
            return _react2.default.createElement(
                'div',
                { className: 'commandproperty' },
                _react2.default.createElement(
                    'div',
                    { className: 'checkbox' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6307\u4EE4'
                    ),
                    _react2.default.createElement(
                        'select',
                        { value: commandType, onChange: this.selectType },
                        _react2.default.createElement(
                            'option',
                            { value: '1' },
                            '\u81EA\u8EAB\u6307\u4EE4'
                        ),
                        _react2.default.createElement(
                            'option',
                            { value: '2' },
                            '\u590D\u5408\u6307\u4EE4'
                        )
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.showCheckList, style: { display: commandType == 2 ? '' : 'none' } },
                        '\u4FEE\u6539'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'checklist', style: { display: commandType == 2 && this.state.show ? '' : 'none' } },
                    _react2.default.createElement(
                        'span',
                        { className: 'listclose', onClick: this.hiddenCheckList },
                        'X'
                    ),
                    dataList.map(function (e, i) {
                        if (!e.property) {
                            return _react2.default.createElement(
                                'li',
                                { key: i },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u914D\u7F6E\u9879\u9519\u8BEF,\u8BF7\u68C0\u67E5\u534F\u8BAE'
                                )
                            );
                        }
                        if (e.property !== 'updateFlag') {
                            return _react2.default.createElement(
                                'li',
                                { key: i },
                                _react2.default.createElement('input', { type: 'checkbox', 'data-value': e.property, 'data-findex': e.index, 'data-blength': e.byteLength,
                                    onChange: _this.ListCheck, checked: checkedList.indexOf(e.property) > -1 ? 'true' : '' }),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    e.propertyName
                                )
                            );
                        }
                    })
                )
            );
        }
    })
};