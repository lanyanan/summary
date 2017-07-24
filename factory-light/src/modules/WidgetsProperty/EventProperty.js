'use strict';
/**
 * 事件属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _commandProperty = require('./commandProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 发送指令组件

var EventProperty = exports.EventProperty = {
    getComponent: _react2.default.createClass({
        changeField: function changeField(e) {
            //更改选中的字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength);
        },
        changeValue: function changeValue(e) {
            //更改选中字段相应选中或输入值
            e.stopPropagation();
            var svalue = e.target.value;
            var min = Number(e.target.getAttribute('data-min'));
            var max = Number(e.target.getAttribute('data-max'));
            if (svalue !== '' && (min || max)) {
                svalue = svalue >= max ? max : svalue;
                svalue = svalue <= min ? min : svalue;
                if (svalue > 0) svalue = Number(svalue);
            }
            var pid = Number(e.currentTarget.getAttribute('data-pid')) || Number(e.target.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type')) || Number(e.target.getAttribute('data-type'));
            _Actions.Actions.changeValue(pid, type, svalue);
        },
        changeEvent: function changeEvent(e) {
            //更改事件类型
            var eventtype = e.target.getAttribute('data-value');
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            _Actions.Actions.changeEventType(pid, eventtype);
        },
        changeCheckedPage: function changeCheckedPage(e) {
            //更改点击跳转的页面
            e.stopPropagation();
            var pageId = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            _Actions.Actions.changeCheckedPage(pid, pageId);
        },
        ListCheck: function ListCheck(e) {
            //修改控件当前状态显示名
            var widgetid = parseInt(e.target.getAttribute('data-value'));
            var type = e.target.getAttribute('data-type');
            var pid = Number(e.target.getAttribute('data-pid')) || 0;
            var wid = Number(e.target.getAttribute('data-wid'));
            if (e.target.checked) {
                _Actions.Actions.addCheckedWidget(widgetid, type, pid, wid);
            } else {
                _Actions.Actions.delCheckedWidget(widgetid, type, pid, wid);
            }
        },
        addEvent: function addEvent(e) {
            //添加一个点击事件
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.addEvent(index);
            this.props.toggleDiv(this.props.widget.propertySet[0].eventSet.length, 'event');
        },
        delEvent: function delEvent(e) {
            //删除指定的点击事件
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.delEvent(index);
        },
        toggleDiv: function toggleDiv(e) {
            //切换事件div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'event');
        },
        checkStatus: function checkStatus(e) {
            //设置点击显示事件二级状态
            var index = Number(e.target.getAttribute('data-index'));
            var wid = Number(e.target.getAttribute('data-wid'));
            var statusField = e.target.getAttribute('data-field');
            var statusValue = e.target.getAttribute('data-value');
            _Actions.Actions.changeStatusValue(this.props.Iindex, index, wid, statusField, statusValue);
        },
        render: function render() {
            var _this = this;

            var I = this.props.item,
                F = this.props.Pitem,
                activeeventfield = this.props.activefield,
                i = this.props.Iindex,
                valueType = F.propertyConfigs[activeeventfield[i]].valueType,
                pageList = this.props.pageList instanceof Array ? this.props.pageList : [],
                widgetList = this.props.widgetList instanceof Array ? this.props.widgetList : [],
                j = this.props.Jindex;
            var commandType = I.commandType || 1;
            var checkedList = I.checkedCommandList || [];
            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return _react2.default.createElement(
                'section',
                { className: 'event' },
                _react2.default.createElement(
                    'span',
                    { className: 'eventtitle' },
                    '\u70B9\u51FB\u4E8B\u4EF6'
                ),
                _react2.default.createElement('span', { className: 'toggle ' + (this.props.showEvent == i ? 'on' : 'off'), 'data-index': i, onClick: this.toggleDiv }),
                _react2.default.createElement('span', { className: 'del', 'data-index': i, onClick: this.delEvent }),
                _react2.default.createElement(
                    'div',
                    { style: { display: this.props.showEvent == i ? '' : 'none' } },
                    _react2.default.createElement(
                        'section',
                        { 'data-pid': i, 'data-type': j, onClick: this.changeEvent },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u70B9\u51FB'
                        ),
                        _react2.default.createElement(
                            'label',
                            { 'data-value': '1', className: I.eventType == 1 ? 'active' : '' },
                            '\u6307\u4EE4'
                        ),
                        _react2.default.createElement(
                            'label',
                            { 'data-value': '2', className: I.eventType == 2 ? 'active' : '' },
                            '\u8DF3\u8F6C'
                        ),
                        _react2.default.createElement(
                            'label',
                            { 'data-value': '3', className: I.eventType == 3 ? 'active' : '' },
                            '\u663E\u793A'
                        ),
                        _react2.default.createElement(
                            'label',
                            { 'data-value': '4', className: I.eventType == 4 ? 'active' : '' },
                            '\u9690\u85CF'
                        )
                    ),
                    I.eventType == '1' ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_commandProperty.commandProperty.getComponent, { dataList: this.props.dataList, index: i,
                            commandType: commandType, checkedList: checkedList }),
                        _react2.default.createElement(
                            'section',
                            { style: { display: commandType == 2 ? 'none' : 'block' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: I.eventField,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { 'data-findex': O.index, 'data-blength': O.byteLength, key: O.propertyName, value: O.property },
                                            O.propertyName
                                        );
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'section',
                            { style: { display: commandType == 2 || this.props.scheme.indexOf('eValue') !== -1 ? 'none' : 'block' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u503C'
                            ),
                            valueType == 'enum' ? _react2.default.createElement(
                                'select',
                                { value: I.eventValue,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeValue },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u503C'
                                ),
                                I.eventField ? F.propertyConfigs[activeeventfield[i]].options.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: O.value, value: O.value },
                                            O.meaning
                                        );
                                    }
                                }) : null
                            ) : _react2.default.createElement('input', { type: valueType == 'number' || valueType == 'range' ? 'number' : 'text',
                                'data-pid': i, 'data-type': j,
                                'data-min': F.propertyConfigs[activeeventfield[i]].minValue,
                                'data-max': F.propertyConfigs[activeeventfield[i]].maxValue,
                                value: I.eventValue, onChange: this.changeValue,
                                placeholder: I.eventValue == '' ? '请输入值' : '' })
                        )
                    ) : I.eventType == '2' ? _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u9875\u9762'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: I.checkedPageId, 'data-pid': i,
                                'data-type': j, onChange: this.changeCheckedPage },
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                '\u8BF7\u9009\u62E9\u9875\u9762'
                            ),
                            pageList.map(function (O, k) {
                                if (k != _this.props.activePage) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: O.pageId, value: O.pageId },
                                        O.pageName
                                    );
                                }
                            })
                        )
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'checklistsection' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u63A7\u4EF6'
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'checklist' },
                            widgetList.map(function (O, k) {
                                var checkedList = I.eventType == '3' ? I.showWidgetList : I.hiddenWidgetList;
                                return _react2.default.createElement(
                                    'li',
                                    { key: k },
                                    _react2.default.createElement('input', { type: 'checkbox', 'data-pid': i, 'data-type': I.eventType == '3' ? 'show' : 'hidden', 'data-value': O.userWidgetID, onChange: _this.ListCheck,
                                        checked: checkedList.indexOf(O.userWidgetID) > -1 ? 'true' : '', 'data-wid': O.userWidgetID }),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        O.caption + '(' + (O.propertySet[0].statusVisibility == 2 ? '隐藏' : '显示') + ')'
                                    ),
                                    I.eventType == '3' && O.propertySet[0].statusSet.length > 1 ? _react2.default.createElement(
                                        'ul',
                                        { className: 'statusList' },
                                        O.propertySet[0].statusSet.map(function (item, index) {
                                            var set = I['activeStatusField'][O.userWidgetID] || {};
                                            return _react2.default.createElement(
                                                'li',
                                                { key: index },
                                                _react2.default.createElement('input', { type: 'checkbox', checked: set['index'] == index ? 'true' : '', onChange: _this.checkStatus,
                                                    'data-index': index, 'data-wid': O.userWidgetID, 'data-field': item.statusField, 'data-value': item.statusValue }),
                                                _react2.default.createElement(
                                                    'span',
                                                    null,
                                                    item.statusName || '状态' + index
                                                )
                                            );
                                        })
                                    ) : null
                                );
                            })
                        )
                    )
                ),
                this.props.widget.propertySet[0].eventSet.length - 1 == i ? _react2.default.createElement(
                    'section',
                    { className: 'addevent', 'data-index': i, onClick: this.addEvent },
                    '\u6DFB\u52A0\u70B9\u51FB'
                ) : null
            );
        }
    })
};