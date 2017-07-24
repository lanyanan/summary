'use strict';
/**
 * 快捷键操作类
 * 场景中的快捷键
 * @author   vilien
 * @datetime 2016-01-04
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Hotkeys = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Base = require('../../core/Base.class');

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotkeysClass = function (_BaseClass) {
    _inherits(HotkeysClass, _BaseClass);

    function HotkeysClass() {
        _classCallCheck(this, HotkeysClass);

        var _this = _possibleConstructorReturn(this, (HotkeysClass.__proto__ || Object.getPrototypeOf(HotkeysClass)).call(this));

        _this.ctrlKey = false; // ctrl键是否被按下
        _this.shiftKey = false; // ctrl键是否被按下
        _this.keyCode = 0; // 键值
        return _this;
    }

    // 捕获event


    _createClass(HotkeysClass, [{
        key: 'capture',
        value: function capture(e) {
            if ((e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || e.target.tagName == 'SELECT') && e.target.type != 'range' && e.target.type != 'date' && e.target.type != 'button') return;
            if (e.currentTarget.toString() !== '[object HTMLDocument]') return; // 仅捕获document元素绑定的event
            this.ctrlKey = e.ctrlKey;
            this.shiftKey = e.shiftKey;
            this.keyCode = e.keyCode || e.which;
            if (e.target.tagName != 'SELECT' && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA') {
                e.stopPropagation();
            } else {
                e.preventDefault();
            }
            switch (this.keyCode) {
                case 8:
                case 46: // delete键
                case 110:
                    // del键
                    this.delWidget();
                    break;
                case 37:
                    // 向左键
                    this.leftWidget();
                    break;
                case 38:
                    // 向上键
                    this.upWidget();
                    break;
                case 39:
                    // 向右键
                    this.rightWidget();
                    break;
                case 40:
                    // 向下键
                    this.downWidget();
                    break;
                case 67:
                    // C键
                    this.copyWidget();
                    break;
                case 85:
                    // U键
                    this.undo();
                    break;
                case 86:
                    // V键
                    this.pasteWidget();
                    break;
                case 89:
                    // Y键
                    this.ctrlKey && this.redo();
                    break;
                case 90:
                    // Z键
                    this.ctrlKey && this.undo();
                    break;
            }
        }

        // 删除控件

    }, {
        key: 'delWidget',
        value: function delWidget() {
            _Actions.Actions.delUserWidget();
        }

        // 复制控件

    }, {
        key: 'copyWidget',
        value: function copyWidget() {
            if (this.ctrlKey) {
                _Actions.Actions.markCopyingUserWidget();
            }
        }

        // 粘贴控件

    }, {
        key: 'pasteWidget',
        value: function pasteWidget() {
            if (this.ctrlKey) {
                _Actions.Actions.pasteUserWidget();
            }
        }

        // 向左调节控件

    }, {
        key: 'leftWidget',
        value: function leftWidget() {
            if (this.shiftKey) {
                // 组合shift，向左调节宽度
                _Actions.Actions.resizeUserWidget(0, -1, 1, 0);
            } else {
                _Actions.Actions.moveUserWidget(-1, 0);
            }
        }

        // 向右调节控件

    }, {
        key: 'rightWidget',
        value: function rightWidget() {
            if (this.shiftKey) {
                // 组合shift，向右调节宽度
                _Actions.Actions.resizeUserWidget(0, 0, 1, 0);
            } else {
                _Actions.Actions.moveUserWidget(1, 0);
            }
        }

        // 向上调节控件

    }, {
        key: 'upWidget',
        value: function upWidget() {
            if (this.ctrlKey) {
                // 组合ctrl，调节z轴
                _Actions.Actions.upZIndexUserWidget();
            } else if (this.shiftKey) {
                // 组合shift，向上调节高度
                _Actions.Actions.resizeUserWidget(-1, 0, 0, 1);
            } else {
                _Actions.Actions.moveUserWidget(0, -1);
            }
        }

        // 向下调节控件

    }, {
        key: 'downWidget',
        value: function downWidget() {
            if (this.ctrlKey) {
                // 组合ctrl，调节z轴
                _Actions.Actions.downZIndexUserWidget();
            } else if (this.shiftKey) {
                // 组合shift，向下调节高度
                _Actions.Actions.resizeUserWidget(0, 0, 0, 1);
            } else {
                _Actions.Actions.moveUserWidget(0, 1);
            }
        }

        // 撤销一步

    }, {
        key: 'undo',
        value: function undo() {
            _Actions.Actions.historyBack();
        }

        // 往前一步

    }, {
        key: 'redo',
        value: function redo() {
            _Actions.Actions.historyForward();
        }
    }]);

    return HotkeysClass;
}(_Base.BaseClass);

;

var Hotkeys = exports.Hotkeys = new HotkeysClass();