'use strict';
/**
 * 解析控件配置信息
 * @author   vilien
 * @datetime 2016-01-18
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetPropsParser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../../core/Base.class');

var _reactTools = require('react-tools');

var _StyleParse = require('../MagicView/StyleParse');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 导入transform方法用于转换jsx


// 导入控件CSS解析类

var WidgetPropsParser = exports.WidgetPropsParser = function (_BaseClass) {
    _inherits(WidgetPropsParser, _BaseClass);

    function WidgetPropsParser(widget, childWidget) {
        _classCallCheck(this, WidgetPropsParser);

        var _this = _possibleConstructorReturn(this, (WidgetPropsParser.__proto__ || Object.getPrototypeOf(WidgetPropsParser)).call(this));

        _this.widget = widget;
        _this.childWidget = childWidget;
        return _this;
    }

    // 获取控件ReactDom


    _createClass(WidgetPropsParser, [{
        key: 'getReactDom',
        value: function getReactDom() {
            var _this2 = this;

            var styleList = JSON.parse(sessionStorage.getItem('styleList'));
            var style = { style: (0, _StyleParse.getWidgetStyle)(this.widget) };
            var domsString = this.widget.propertySet.map(function (prop) {
                var props = Object.assign({
                    caption: _this2.widget.caption,
                    visibility: _this2.widget.statusVisibility,
                    text: _this2.widget.editText,
                    ref: _this2.widget.userWidgetID,
                    userWidgetID: _this2.widget.userWidgetID,
                    className: _this2.widget.className,
                    styleList: styleList,
                    widgetInfo: _this2.widget.widgetInfo
                }, prop, style);
                if (_this2.widget.id == 1004) {
                    props.imagePath = props.statusSet[props.activeStatus].bgImagePath;
                }
                if (_this2.widget.id == 1011 && _this2.widget.parent > -1) {
                    props.inTab = true;
                }
                if (_this2.widget.id == 1014) {
                    props.activeType = _this2.widget.activeType;
                }
                return 'React.createElement(' + (0, _reactTools.transform)(_this2.widget.dom) + ',' + JSON.stringify(props) + ')';
            }).join(',');
            return domsString;
        }

        // 获取控件行内样式

    }, {
        key: 'getStyleString',
        value: function getStyleString() {
            return JSON.stringify((0, _StyleParse.getWidgetStyle)(this.widget));
        }

        // 获取控件props

    }, {
        key: 'getPropString',
        value: function getPropString() {
            var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var props = { style: (0, _StyleParse.getWidgetStyle)(this.widget) };
            Object.assign(props, this.widget.propertySet[index]);
            return JSON.stringify(props);
        }
    }]);

    return WidgetPropsParser;
}(_Base.BaseClass);

;