'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProcessVariableProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessVariableProperty = exports.ProcessVariableProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {};
        },
        statusChange: function statusChange(e) {
            var num = e.target.value;
            _Actions.Actions.changeWidgetInfo('processNowd', num);
        },

        changeStatusName: function changeStatusName(e) {
            //修改过程名称
            var pid = Number(e.target.getAttribute('data-pid'));
            var snvalue = e.target.value;
            _Actions.Actions.changeStatusName(pid, snvalue, 'statusName');
        },
        addStatus: function addStatus(e) {
            //添加一个过程
            e.stopPropagation();
            var index = Number(e.target.getAttribute('data-index'));
            if (index == 5) return false;
            _Actions.Actions.addStatus(index - 1);
            _Actions.Actions.changeWidgetInfo('processNowd', index);
        },
        delStatus: function delStatus(e) {
            //删除指定的过程
            e.stopPropagation();
            var index = Number(e.target.getAttribute('data-index'));
            if (index <= 3) {
                return false;
            }
            _Actions.Actions.delStatus(index - 1);
            _Actions.Actions.changeWidgetInfo('processNowd', index - 2);
            var processColorArr = this.props.processColorArr ? this.props.processColorArr : [];
            var processNowd = this.props.processNowd ? this.props.processNowd : 0;
            processColorArr.splice(index - 1, 1);
            _Actions.Actions.changeWidgetInfo('processColorArr', processColorArr);
        },
        render: function render() {
            var propertySet = this.props.propertySet;
            var statusSet = this.props.statusSet;
            var processNowd = this.props.processNowd ? this.props.processNowd : 0;
            if (!statusSet[processNowd]) {
                return false;
            }
            var I = statusSet[processNowd],
                i = processNowd;

            return _react2.default.createElement(
                'div',
                { className: 'rangeproperty rangeVariable' },
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6570\u91CF'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'rangeVariable-num' },
                        _react2.default.createElement(
                            'em',
                            { className: 'rangeVariable-sub', 'data-index': statusSet.length, onClick: this.delStatus },
                            '-'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            statusSet.length
                        ),
                        _react2.default.createElement(
                            'em',
                            { className: 'rangeVariable-add', 'data-index': statusSet.length, onClick: this.addStatus },
                            '+'
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5F53\u524D\u8FC7\u7A0B'
                    ),
                    _react2.default.createElement(
                        'select',
                        { onChange: this.statusChange, value: processNowd },
                        statusSet.map(function (item, index) {
                            return _react2.default.createElement(
                                'option',
                                { value: index, key: index },
                                index + 1
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'section',
                            { className: 'imageinfo' },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u540D\u79F0'
                            ),
                            _react2.default.createElement('input', { className: 'picname', 'data-pid': i, defaultValue: I.statusName, onChange: this.changeStatusName })
                        )
                    )
                )
            );
        }
    })
};