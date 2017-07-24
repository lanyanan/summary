'use strict';
/**
 * 控件样式解析类
 * @author   vilien
 * @datetime 2016-01-06
 */

// 解析用户控件样式

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getWidgetStyle = exports.getWidgetStyle = function getWidgetStyle(widget) {
    var _ref;

    return _ref = {
        position: 'absolute',
        top: (Number(widget.top) / 12).toFixed(3) + "rem",
        left: (Number(widget.left) / 12).toFixed(3) + "rem",
        width: (Number(widget.width) / 12).toFixed(3) + "rem",
        height: (Number(widget.height) / 12).toFixed(3) + "rem",
        zIndex: widget.zIndex || 0,
        backgroundColor: widget.bgColor,
        backgroundImage: widget.id != '1004' && widget.bgImagePath && 'url(' + widget.bgImagePath + ')',
        backgroundRepeat: 'no-repeat',
        color: widget.fgColor || '#333333',
        borderColor: widget.borderColor,
        opacity: typeof widget.widgetOpacity === 'undefined' ? 1 : widget.widgetOpacity / 100,
        borderWidth: widget.borderWidth,
        borderRadius: typeof widget.borderRadius === 'undefined' ? '' : widget.borderRadius + 'px',
        borderStyle: widget.borderWidth && 'solid',
        fontSize: widget.propertySet[0].fontSize
    }, _defineProperty(_ref, 'color', widget.propertySet[0].textColor), _defineProperty(_ref, 'fontWeight', widget.propertySet[0].fontWeight == 1 && 'bold'), _defineProperty(_ref, 'fontStyle', widget.propertySet[0].fontItalics == 1 && 'italic'), _defineProperty(_ref, 'textAlign', widget.textAlign || ''), _ref;
};