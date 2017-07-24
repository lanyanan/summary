'use strict';
/**
 * 处理面板拖放事件
 * @author   xinglin
 * @datetime 2016-05-24
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragPanelClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('./../../core/Base.class');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragPanelClass = exports.DragPanelClass = function (_BaseClass) {
    _inherits(DragPanelClass, _BaseClass);

    function DragPanelClass() {
        _classCallCheck(this, DragPanelClass);

        var _this = _possibleConstructorReturn(this, (DragPanelClass.__proto__ || Object.getPrototypeOf(DragPanelClass)).call(this));

        _this.oldMoveY = 0;
        _this.oldMoveX = 0;
        _this.panelType = '';
        _this.tmp = '';
        _this.odom = '';
        return _this;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */


    _createClass(DragPanelClass, [{
        key: 'getMoveDom',
        value: function getMoveDom(dom) {
            this.panelType = dom.getAttribute('data-dragvalue');
            dom.className = dom.className === 'tabs-off' ? 'tabs-on' : 'tabs-off';
            this.odom = dom;
            var vdom = document.createElement('div');
            return vdom;
        }

        /**
         * 开始拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   起始横坐标
         * @param    {integer}    y   起始纵坐标
         */

    }, {
        key: 'onStart',
        value: function onStart(dom, x, y) {
            switch (this.panelType) {
                case 'size':
                    this.tmp = document.querySelector('#size-view');
                    this.tmp.style.zIndex = Math.max(document.querySelector('#exterior-view').style.zIndex, document.querySelector('#property-view').style.zIndex) + 1;
                    break;
                case 'exterior':
                    this.tmp = document.querySelector('#exterior-view');
                    this.tmp.style.zIndex = Math.max(document.querySelector('#size-view').style.zIndex, document.querySelector('#property-view').style.zIndex) + 1;
                    break;
                case 'property':
                    this.tmp = document.querySelector('#property-view');
                    this.tmp.style.zIndex = Math.max(document.querySelector('#exterior-view').style.zIndex, document.querySelector('#size-view').style.zIndex) + 1;
                    break;
                default:
                    ;
            }
        }

        /**
         * 正在拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'onMove',
        value: function onMove(dom, x, y) {
            var offsetY = y - this.oldMoveY;
            this.oldMoveY = y;
            var offsetX = x - this.oldMoveX;
            this.oldMoveX = x;
            if (this.panelType !== 'property') {
                this.tmp.style.top = parseInt(this.tmp.style.top) + offsetY + 'px';
                this.tmp.style.left = parseInt(this.tmp.style.left) + offsetX + 'px';
                // if(parseInt(this.tmp.style.top)<0) this.tmp.style.top=0+'px';
                // if(parseInt(this.tmp.style.left)<0) this.tmp.style.left=0;
            } else {
                this.tmp.style.top = parseInt(this.tmp.style.top) + offsetY + 'px';
                this.tmp.style.right = parseInt(this.tmp.style.right) - offsetX + 'px';
                // if(parseInt(this.tmp.style.top)<0) this.tmp.style.top=0+'px';
                // if(parseInt(this.tmp.style.right)<0) this.tmp.style.right=0;
            }
        }

        /**
         * 结束拖放时将触发该方法
         * ! 该方法将由Drag模块自动调用
         * @param    {document}   dom [description]
         * @param    {integer}    x   横坐标偏移量
         * @param    {integer}    y   纵坐标偏移量
         */

    }, {
        key: 'onEnd',
        value: function onEnd(dom, x, y) {
            this.oldMoveX = 0;
            this.oldMoveY = 0;
            this.odom.className = this.odom.className === 'tabs-off' ? 'tabs-on' : 'tabs-off';
        }
    }]);

    return DragPanelClass;
}(_Base.BaseClass);