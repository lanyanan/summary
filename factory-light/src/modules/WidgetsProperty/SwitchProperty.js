'use strict';
/**
 * 开关按钮属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwitchProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _commandProperty = require('./commandProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 发送指令组件

var SwitchProperty = exports.SwitchProperty = {
    getComponent: _react2.default.createClass({
        componentDidMount: function componentDidMount() {
            //开关控件开关两种状态及事件初始化处理
            if (this.props.statusSet.length === 1) _Actions.Actions.addStatus(0, 'false');
            if (this.props.eventSet.length === 1) _Actions.Actions.addEvent(0, 'false');
            _Actions.Actions.changeStatusName(0, '开状态', 'false');
            _Actions.Actions.changeStatusName(1, '关状态', 'false');
        },
        changeSwitch: function changeSwitch(e) {
            //更改选中的开/关状态
            var propertySet = this.props.propertySet || {};
            var switchValue = propertySet.switchValue || 1;
            if (e == switchValue) return;
            _Actions.Actions.changeBooleanProperty(0, 'switchValue');
            var show = switchValue === 2 ? 0 : 1;
            this.props.toggleDiv(show, 'status');
            this.props.toggleDiv(show, 'event');
        },
        changeField: function changeField(e) {
            //更改选中的字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var options = null;
            if (e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum') {
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            if (fieldIndex) options = fieldIndex;
            _Actions.Actions.changeField(property, pid, type, options, byteLength);
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
        changeCheck: function changeCheck(e) {
            //更改控件当前状态是否可见
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStringProperty(pid, 'activeStatus', pid);
        },
        toggleStatusDiv: function toggleStatusDiv(e) {
            //切换状态div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'status');
        },
        toggleEventDiv: function toggleEventDiv(e) {
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
            var propertySet = this.props.propertySet || {};
            var switchValue = propertySet.switchValue || 1;
            _Actions.Actions.changeStatusValue(switchValue - 1, index, wid, statusField, statusValue);
        },
        render: function render() {
            var _this = this;

            var statusSet = this.props.statusSet,
                statusList = this.props.statusList,
                activestatusfield = this.props.activefield,
                i = this.props.Iindex,
                propertySet = this.props.propertySet || {},
                j = this.props.Jindex;
            var switchValue = propertySet.switchValue || 1;
            statusSet = statusSet[switchValue - 1];
            i = switchValue - 1;
            var valueType = statusList.propertyConfigs[activestatusfield[i]].valueType;
            //statusSet为状态,F(statusList)为协议内容,activeeventfield为选中类型
            //i(Iindex)为状态在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            var eventSet = this.props.eventSet,
                eventList = this.props.eventList,
                activeeventfield = this.props.activeeventfield,
                eventvalueType = eventList.propertyConfigs[activeeventfield[i]].valueType,
                pageList = this.props.pageList instanceof Array ? this.props.pageList : [],
                widgetList = this.props.widgetList instanceof Array ? this.props.widgetList : [],
                q = this.props.eventIndex;
            eventSet = eventSet[switchValue - 1];
            var commandType = eventSet.commandType || 1;
            var checkedList = eventSet.checkedCommandList || [];
            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'div',
                        { className: 'switchproperty' },
                        _react2.default.createElement(
                            'label',
                            { onClick: this.changeSwitch.bind(this, 1), className: switchValue == 1 ? 'active' : '' },
                            '\u5F00'
                        ),
                        _react2.default.createElement(
                            'label',
                            { onClick: this.changeSwitch.bind(this, 2), className: switchValue == 2 ? 'active' : '' },
                            '\u5173'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'statustitle' },
                            '\u72B6\u6001'
                        ),
                        _react2.default.createElement('span', { className: 'toggle ' + (this.props.showStatus == i ? 'on' : 'off'), style: { top: this.props.showStatus == i ? 54 + 'px' : 55 + 'px' }, 'data-index': i, onClick: this.toggleStatusDiv }),
                        _react2.default.createElement(
                            'div',
                            { style: { display: this.props.showStatus == i ? '' : 'none' }, className: 'showproperty' },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u72B6\u6001\u4F18\u5148\u663E\u793A'
                            ),
                            _react2.default.createElement('input', { className: "checkstatus " + (i == propertySet.activeStatus ? 'on' : 'off'), type: 'checkbox',
                                onChange: this.changeCheck, 'data-pid': i,
                                checked: i == propertySet.activeStatus ? 'true' : '' })
                        ),
                        _react2.default.createElement(
                            'section',
                            { style: { display: this.props.showStatus == i ? '' : 'none' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: statusSet.statusField,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                statusList.propertyConfigs.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: O.propertyName, value: O.property },
                                        O.propertyName
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'section',
                            { style: { display: this.props.showStatus == i ? '' : 'none' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u503C'
                            ),
                            valueType == 'enum' ? _react2.default.createElement(
                                'select',
                                { value: statusSet.statusValue,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeValue },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u503C'
                                ),
                                statusSet.statusField ? statusList.propertyConfigs[activestatusfield[i]].options.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: O.value, value: O.value },
                                        O.meaning
                                    );
                                }) : null
                            ) : _react2.default.createElement('input', { type: valueType == 'number' || valueType == 'range' ? 'number' : 'text',
                                'data-pid': i, 'data-type': j,
                                'data-min': statusList.propertyConfigs[activestatusfield[i]].minValue,
                                'data-max': statusList.propertyConfigs[activestatusfield[i]].maxValue,
                                value: statusSet.statusValue, onChange: this.changeValue,
                                placeholder: statusSet.statusValue == '' ? '请输入值' : '' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'event' },
                    _react2.default.createElement(
                        'span',
                        { className: 'eventtitle' },
                        '\u70B9\u51FB\u4E8B\u4EF6'
                    ),
                    _react2.default.createElement('span', { className: 'toggle ' + (this.props.showEvent == i ? 'on' : 'off'), 'data-index': i, onClick: this.toggleEventDiv }),
                    _react2.default.createElement('span', { className: 'del', 'data-index': i, onClick: this.delEvent }),
                    _react2.default.createElement(
                        'div',
                        { style: { display: this.props.showEvent == i ? '' : 'none' } },
                        _react2.default.createElement(
                            'section',
                            { 'data-pid': i, 'data-type': q, onClick: this.changeEvent },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u70B9\u51FB'
                            ),
                            _react2.default.createElement(
                                'label',
                                { 'data-value': '1', className: eventSet.eventType == 1 ? 'active' : '' },
                                '\u6307\u4EE4'
                            ),
                            _react2.default.createElement(
                                'label',
                                { 'data-value': '2', className: eventSet.eventType == 2 ? 'active' : '' },
                                '\u8DF3\u8F6C'
                            ),
                            _react2.default.createElement(
                                'label',
                                { 'data-value': '3', className: eventSet.eventType == 3 ? 'active' : '' },
                                '\u663E\u793A'
                            ),
                            _react2.default.createElement(
                                'label',
                                { 'data-value': '4', className: eventSet.eventType == 4 ? 'active' : '' },
                                '\u9690\u85CF'
                            )
                        ),
                        eventSet.eventType == '1' ? _react2.default.createElement(
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
                                    { value: eventSet.eventField,
                                        'data-pid': i, 'data-type': q,
                                        onChange: this.changeField },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                    ),
                                    eventList.propertyConfigs.map(function (O, k) {
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
                                { style: { display: commandType == 2 ? 'none' : 'block' } },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u503C'
                                ),
                                eventvalueType == 'enum' ? _react2.default.createElement(
                                    'select',
                                    { value: eventSet.eventValue,
                                        'data-pid': i, 'data-type': q,
                                        onChange: this.changeValue },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9\u503C'
                                    ),
                                    eventSet.eventField ? eventList.propertyConfigs[activeeventfield[i]].options.map(function (O, k) {
                                        if (O.property !== 'updateFlag') {
                                            return _react2.default.createElement(
                                                'option',
                                                { key: O.value, value: O.value },
                                                O.meaning
                                            );
                                        }
                                    }) : null
                                ) : _react2.default.createElement('input', { type: eventvalueType == 'number' || eventvalueType == 'range' ? 'number' : 'text',
                                    'data-pid': i, 'data-type': q,
                                    'data-min': eventList.propertyConfigs[activeeventfield[i]].minValue,
                                    'data-max': eventList.propertyConfigs[activeeventfield[i]].maxValue,
                                    value: eventSet.eventValue, onChange: this.changeValue,
                                    placeholder: eventSet.eventValue == '' ? '请输入值' : '' })
                            )
                        ) : eventSet.eventType == '2' ? _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u9875\u9762'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: eventSet.checkedPageId, 'data-pid': i,
                                    'data-type': q, onChange: this.changeCheckedPage },
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
                                    var checkedList = eventSet.eventType == '3' ? eventSet.showWidgetList : eventSet.hiddenWidgetList;
                                    return _react2.default.createElement(
                                        'li',
                                        { key: k },
                                        _react2.default.createElement('input', { type: 'checkbox', 'data-pid': i, 'data-type': eventSet.eventType == '3' ? 'show' : 'hidden', 'data-value': O.userWidgetID, onChange: _this.ListCheck,
                                            checked: checkedList.indexOf(O.userWidgetID) > -1 ? 'true' : '', 'data-wid': O.userWidgetID }),
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            O.caption + '(' + (O.propertySet[0].statusVisibility == 2 ? '隐藏' : '显示') + ')'
                                        ),
                                        eventSet.eventType == '3' && O.propertySet[0].statusSet.length > 1 ? _react2.default.createElement(
                                            'ul',
                                            { className: 'statusList' },
                                            O.propertySet[0].statusSet.map(function (item, index) {
                                                var set = eventSet['activeStatusField'][O.userWidgetID] || {};
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
                    )
                )
            );
        }
    })
};