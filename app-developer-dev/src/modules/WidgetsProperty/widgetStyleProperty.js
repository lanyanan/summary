'use strict';
/**
 * 滑块连续型样式组件
 * @author   hey
 * @datetime 2017-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetStyleProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WidgetStyleProperty = exports.WidgetStyleProperty = {
    getComponent: _react2.default.createClass({
        changeWidgetStyle: function changeWidgetStyle(styleName, e) {
            var id = Number(e.target.getAttribute('data-id')),
                pid = Number(e.target.getAttribute('data-pid'));

            if (id == 1001 || id == 1002) {
                var fontSizeInfo = ['36', '34', '32', '28', '24', '22'],
                    lineHeightInfo = ['54', '52', '48', '40', '38', '34'],
                    newsize = Number(e.target.value);
                _Actions.Actions.changeStringProperty(pid, 'fontSize', fontSizeInfo[newsize]);

                if (id == 1002) {
                    _Actions.Actions.changeStringProperty(pid, 'lineHeight', lineHeightInfo[newsize]);
                }
            } else if (id == 1007) {
                if (styleName == "rangeStyle") {
                    _Actions.Actions.changeWidgetInfo(styleName, e.target.value);
                }
                if (styleName == "rangeType") {

                    if (e.target.value == 1) {
                        _Actions.Actions.changeWidgetInfo('rangeStyle', 'none');
                        _Actions.Actions.changeStringProperty(0, "stallShow", true);
                    } else {
                        _Actions.Actions.changeWidgetInfo('rangeStyle', '0');
                        _Actions.Actions.changeStringProperty(0, "stallShow", false);
                    }
                    var rangeArrName = ["continuity", "dispersed"];
                    _Actions.Actions.changeWidgetInfo('rangeType', rangeArrName[e.target.value]);
                }
            } else {
                _Actions.Actions.changeWidgetInfo(styleName, e.target.value);
            }
        },

        render: function render() {
            var widget = this.props.widget,
                id = widget.id,
                propertySet = this.props.propertySet,
                propertyId = propertySet.propertyId;

            var options = [],
                styleLength = 0,
                styleName = void 0,
                selectName = "样式",
                fontSizeInfo = ['36', '34', '32', '28', '24', '22'],
                lineHeightInfo = ['54', '52', '48', '40', '38', '34'],
                fontSize = void 0,
                lineHeight = void 0,
                widgetStyleType = void 0;

            var rangeType = "continuity"; //滑块只有离散型有样式
            var widgetStyle = 0;

            switch (widget.id) {
                case 1001:
                    widgetStyleType = "textStyle";
                    styleLength = 6;
                    styleName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

                    fontSize = widget.propertySet[0].fontSize;

                    if (fontSizeInfo.indexOf(fontSize) == -1) {
                        widgetStyle = 0;
                    } else {
                        widgetStyle = fontSizeInfo.indexOf(fontSize);
                    }
                    break;
                case 1002:
                    widgetStyleType = "textStyle";
                    styleLength = 6;
                    styleName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
                    fontSize = widget.propertySet[0].fontSize;
                    lineHeight = widget.propertySet[0].lineHeight;

                    if (fontSizeInfo.indexOf(fontSize) == -1 || lineHeightInfo.indexOf(lineHeight) == -1) widgetStyle = 0;
                    if (fontSizeInfo.indexOf(fontSize) == lineHeightInfo.indexOf(lineHeight)) {
                        widgetStyle = fontSizeInfo.indexOf(fontSize);
                    }
                    break;
                case 10018:
                    widgetStyleType = "switchStyle";
                    widgetStyle = widget.widgetInfo.switchStyle;
                    styleLength = 2;
                    styleName = ['样式一', '样式二'];
                    break;
                case 1007:
                    if (this.props.rangeTypeWidget) {
                        widgetStyle = widget.widgetInfo.rangeType ? widget.widgetInfo.rangeType : "continuity";
                        widgetStyleType = "rangeType";
                        selectName = "类型";
                        styleLength = 2;
                        styleName = ['连续型', '离散型'];
                        var rangeTypeArr = ["continuity", "dispersed"];
                        if (rangeTypeArr.indexOf(widgetStyle) != -1) {
                            widgetStyle = rangeTypeArr.indexOf(widgetStyle);
                        }
                    } else {
                        widgetStyleType = "rangeStyle";
                        widgetStyle = widget.widgetInfo.rangeStyle;
                        styleLength = 3;
                        styleName = ['样式一', '样式二', '样式三'];
                        rangeType = widget.widgetInfo.rangeType ? widget.widgetInfo.rangeType : "continuity";
                    }

                    break;
                case 1011:
                    widgetStyleType = "timeStyle";
                    styleLength = 2;
                    styleName = ['样式一', '样式二'];
                    widgetStyle = widget.widgetInfo.timeStyle;
                    break;
                case 1020:
                    if (this.props.speedDialShape) {
                        widgetStyleType = "speeddialShape";
                        selectName = "形状";
                        styleLength = 2;
                        styleName = ['矩形', '圆形'];
                        widgetStyle = widget.widgetInfo.speeddialShape;
                    } else {
                        widgetStyleType = "speeddialStyle";
                        styleLength = 3;
                        styleName = ['图文', '图标', '文字'];
                        widgetStyle = widget.widgetInfo.speeddialStyle;
                    }
                    break;
                case 1021:
                    widgetStyleType = "gridStyle";
                    styleLength = 4;
                    styleName = ['双选项', '列表选项', '定时选项', '范围选项'];
                    widgetStyle = widget.widgetInfo.gridStyle;
                    break;
            }

            for (var i = 0; i < styleLength; i++) {
                options.push(_react2.default.createElement(
                    'option',
                    { key: i, value: i },
                    styleName[i]
                ));
            }

            return _react2.default.createElement(
                'section',
                { className: 'property-style', style: { 'display': rangeType == "continuity" ? 'block' : 'none' } },
                _react2.default.createElement(
                    'span',
                    null,
                    selectName
                ),
                _react2.default.createElement(
                    'select',
                    { value: widgetStyle, ref: 'propertyStyle', 'data-id': id, 'data-pid': propertyId, onChange: this.changeWidgetStyle.bind(this, widgetStyleType) },
                    options
                )
            );
        }
    })
};