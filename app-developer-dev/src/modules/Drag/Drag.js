'use strict';
/**
 * 拖放处理模块，所有拖放事件都在此分流处理
 * ! 此类为公共类，修改须谨慎
 * @author   vilien
 * @datetime 2015-12-10
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

var _common = require('../common');

var Comm = _interopRequireWildcard(_common);

var _DragWidget = require('./DragWidget');

var _DragResize = require('./DragResize');

var _DragPanel = require('./DragPanel');

var _DragUserWidget = require('./DragUserWidget');

var _DragCanvas = require('./DragCanvas');

var _DrawSelectCover = require('./DrawSelectCover');

var _DragCodePanel = require('./DragCodePanel');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 公共函数库
// 控件拖放处理类
// 调节大小拖放处理类
//import {DragRotateClass} from './DragRotate'; // 调节旋转处理类
// 面板拖放处理类
// 用户控件拖放处理类
// 用户控件拖放处理类
// 多选cover区域处理类


// 多选cover区域处理类

// 实例化处理类
var DragWidget = new _DragWidget.DragWidgetClass();
var DragResize = new _DragResize.DragResizeClass();
//let DragRotate = new DragRotateClass();
var DragPanel = new _DragPanel.DragPanelClass();
var DragUserWidget = new _DragUserWidget.DragUserWidgetClass();
var DragCanvas = new _DragCanvas.DragCanvasClass();
var DrawSelectCover = new _DrawSelectCover.DrawSelectCoverClass();
var DragCodePanel = new _DragCodePanel.DragCodePanelClass();

// 产生私有成员key
var _isDraging_ = Symbol('_isDraging_'); // 是否正在拖动
var _dom_ = Symbol('_dom_'); // 正在拖动的dom对像
var _handler_ = Symbol('_handler_'); // 拖动事件处理程序

var DragClass = exports.DragClass = function (_BaseClass) {
    _inherits(DragClass, _BaseClass);

    function DragClass() {
        _classCallCheck(this, DragClass);

        var _this = _possibleConstructorReturn(this, (DragClass.__proto__ || Object.getPrototypeOf(DragClass)).call(this));

        _this.config = {
            onUpResetMatrix: false // 拖放结束后是否重置矩阵
        };
        _this.matrix = [1, 0, 0, 1, 0, 0];
        _this.reset();
        document.onmouseup = function (e) {
            return _this.onMouseUp(e);
        };
        return _this;
    }

    // 拖放对象重置


    _createClass(DragClass, [{
        key: 'reset',
        value: function reset() {
            this[_isDraging_] = false;
            this.originX = 0;
            this.originY = 0;
            this.rotate = 0;
            this.startX = 0;
            this.startY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this[_dom_] = null;
            this[_handler_] = {};
            this.obj = {};
        }

        // 返回事件列表，以供React组件rest方式解构

    }, {
        key: 'events',
        value: function events() {
            var _this2 = this;

            return {
                onMouseDown: function onMouseDown(e) {
                    return _this2.onMouseDown(e);
                },
                onMouseUp: function onMouseUp(e) {
                    if (_this2[_isDraging_]) _this2.onMouseUp(e);
                },
                onMouseMove: function onMouseMove(e) {
                    if (_this2[_isDraging_]) _this2.onMouseMove(e);
                }
            };
        }

        // 鼠标按下事件
        /*
         *  case 'rotate':   // 旋转类
         *      this[_handler_] = DragRotate;
         *      break;
         */

    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            this.obj = this.getDragDomObject(e);
            this.startX = e.pageX;
            this.startY = e.pageY;
            if (this.obj.type) {
                e.preventDefault();
                e.stopPropagation();
                switch (this.obj.type) {
                    case 'widget':
                        // 控件类
                        this[_handler_] = DragWidget;
                        break;
                    case 'resize':
                        // 大小调整类
                        this[_handler_] = DragResize;
                        break;
                    case 'rotate':
                        // 旋转调整类
                        this[_handler_] = DragRotate;
                        break;
                    case 'panel':
                        // 面板类
                        this[_handler_] = DragPanel;
                        break;
                    case 'customer':
                        // 用户控件类
                        this[_handler_] = DragUserWidget;
                        break;
                    case 'canvas':
                        // 画布类
                        this[_handler_] = DragCanvas;
                        break;
                    case 'select':
                        // 绘制多选区域
                        this[_handler_] = DrawSelectCover;
                        break;
                    case 'codePanel':
                        // 代码编辑面板类
                        this[_handler_] = DragCodePanel;
                        break;
                }
                this[_isDraging_] = true;
                this.initMatrix(this.obj.node);
                this[_handler_].config && Object.assign(this.config, this[_handler_].config);
                this[_dom_] = this[_handler_].getMoveDom(this.obj.node);
                this[_handler_].onStart && this[_handler_].onStart(this[_dom_], this.startX, this.startY);
            }
        }

        // 鼠标释放事件

    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            this.offsetX = e.pageX - this.startX + this.originX;
            this.offsetY = e.pageY - this.startY + this.originY;
            if (this.obj.type == 'rotate') {
                this[_handler_].onEnd && this[_handler_].onEnd(this[_dom_], e.pageX, e.pageY);
            } else {
                this[_handler_].onEnd && this[_handler_].onEnd(this[_dom_], this.offsetX, this.offsetY);
            }
            this.config.onUpResetMatrix && this.resetMatrix();
            this.reset();
        }

        // 鼠标移动事件

    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            this.offsetX = e.pageX - this.startX + this.originX;
            this.offsetY = e.pageY - this.startY + this.originY;
            this.matrix[4] = this.offsetX;
            this.matrix[5] = this.offsetY;
            if (this.obj.type == 'rotate') {
                this[_handler_].onMove(this[_dom_], e.pageX, e.pageY);
            } else {
                this.transform();
                this[_handler_].onMove && this[_handler_].onMove(this[_dom_], this.offsetX, this.offsetY);
            }
        }

        // 获取可移动对象

    }, {
        key: 'getDragDomObject',
        value: function getDragDomObject(e) {
            var node = e.target,
                type = node.getAttribute('data-dragtype');
            while (!type && node.tagName.toLowerCase() !== 'body') {
                node = node.parentNode;
                type = node.getAttribute('data-dragtype');
            }
            return { node: node, type: type };
        }

        /**
         * 调整dom矩阵
         * @param    {array}   matrix 矩阵数组
         */

    }, {
        key: 'transform',
        value: function transform() {
            var matrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.matrix;

            if (Array.isArray(this[_dom_])) {
                this[_dom_].forEach(function (dom) {
                    return dom.style.transform = 'matrix(' + matrix + ')';
                });
            } else {
                this[_dom_].style.transform = 'matrix(' + matrix + ')';
            }
        }

        /**
         * 重置矩阵
         */

    }, {
        key: 'resetMatrix',
        value: function resetMatrix() {
            this.matrix[4] = this.originX;
            this.matrix[5] = this.originY;
            this.transform();
        }

        /**
         * 解析transform矩阵
         * @param    {[type]}   dom DOM对象
         */

    }, {
        key: 'initMatrix',
        value: function initMatrix(dom) {
            var transform = Comm.getStyle(dom, 'transform'),
                // matrix(1, 0, 0, 1, X, Y)
            reMatrix = transform.match(/matrix\((.+?)\)/),
                // ["matrix(1, 0, 0, 1, X, Y)", "1, 0, 0, 1, X, Y"]
            arrMatrix = reMatrix && reMatrix[1].split(','); // ["1", "0", "0", "1", "X", "Y"]
            if (!arrMatrix) {
                this.matrix = [1, 0, 0, 1, 0, 0];
            } else {
                this.matrix = arrMatrix.map(function (n) {
                    return +n;
                });
            }
            this.originX = this.matrix[4];
            this.originY = this.matrix[5];
        }
    }]);

    return DragClass;
}(_Base.BaseClass);