'use strict';
/**
 * 按钮颜色选择器
 * @author   hey
 * @datetime 2017-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToneProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToneProperty = exports.ToneProperty = {
    getComponent: _react2.default.createClass({
        colorPick: function colorPick(e) {
            var type = e.target.getAttribute('data-type');
            var newcolor = e.target.getAttribute('data-color');
            var pid = Number(e.target.getAttribute('data-pid'));
            switch (type) {
                case 'foreground':
                    _Actions.Actions.changeFgColor(newcolor);
                    break;
                case 'bordercolor':
                    _Actions.Actions.changeBorderColor(newcolor);
                    break;
                case 'solid':
                    //实心
                    _Actions.Actions.changeBorderColor(newcolor);
                    _Actions.Actions.changeBgColor(newcolor);
                    break;
                case 'hollow':
                    //空心
                    _Actions.Actions.changeBorderColor(newcolor);
                    _Actions.Actions.changeStringProperty(pid, 'textColor', newcolor);
                    break;
                case 'fontcolor':
                    _Actions.Actions.changeStringProperty(pid, 'textColor', newcolor);
                    break;
                case 'timeTone':
                    _Actions.Actions.changeStringProperty(pid, 'textColor', newcolor);
                    break;
                case 'rangeTone':
                    _Actions.Actions.changeBgColor(newcolor);
                    break;
                case 'switchTone':
                    _Actions.Actions.changeBgColor(newcolor);
                    break;
                case 'popupButtonTone':
                    _Actions.Actions.changeWidgetInfo('popupButtonBgColor', newcolor);
                    break;
                case 'processTone':
                    _Actions.Actions.changeWidgetInfo('processColor', newcolor);;
                    break;
                case 'addsubTone':
                    _Actions.Actions.changeWidgetInfo('color', newcolor);
                    break;
                case 'speeddialTone':
                    _Actions.Actions.changeWidgetInfo('speeddialColor', newcolor);
                    break;
                default:
                    ;
            }
        },
        render: function render() {
            var widget = this.props.widget,
                propertySet = this.props.propertySet,
                tone = [],
                toneArr = ["#fe5c45", "#fc8109", "#fcb409", "#8dcb37", "#1be2d2", "#2accfa", "#3b96ff", "#715af5", "#000000", "#333333", "#666666", "#999999", "#b2b2b2", "#c6c6c6", "#e5e5e5", "#ffffff"],
                toneType = void 0,
                toneName = "色调";

            switch (widget.id) {
                case 1005:
                    toneType = widget.bgColor == "transparent" ? 'hollow' : 'solid';
                    break;
                case 1013:
                    toneType = "addsubTone";
                    break;
                case 1001:
                    toneType = "fontcolor";
                    break;
                case 1002:
                    toneType = "fontcolor";
                    break;
                case 1007:
                    toneType = "rangeTone";
                    break;
                case 10018:
                    toneType = "switchTone";
                    break;
                case 1018:
                    toneType = "processTone";
                    break;
                case 1011:
                    toneType = "timeTone";
                    break;
                case 1020:
                    toneType = "speeddialTone";
                    break;
            }

            tone = toneArr.map(function (item, index) {
                return _react2.default.createElement('li', { key: index, 'data-pid': propertySet.propertyId, 'data-type': toneType, title: item, 'data-color': item, style: { backgroundColor: item } });
            });

            switch (toneType) {
                case "popupButtonTone":
                    toneName = "按钮颜色";
                    break;
            }

            return _react2.default.createElement(
                'section',
                { className: 'property-tone' },
                _react2.default.createElement(
                    'span',
                    null,
                    toneName
                ),
                _react2.default.createElement(
                    'ul',
                    { onClick: this.colorPick },
                    tone
                )
            );
        }
    })
};