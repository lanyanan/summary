'use strict';

/**
 * 主场景类
 * 整个app开发控制场景
 * @author   
 * @datetime 
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Base = require('../../core/Base.class');

var _MagicView = require('../../modules/MagicView/MagicView');

var _MagicView2 = _interopRequireDefault(_MagicView);

var _common = require('../../modules/common');

var Comm = _interopRequireWildcard(_common);

var _Store = require('./Store');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 公共函数库


var MagicView = new _MagicView2.default();

var MagicViewDom = MagicView.getComponent();

var Scene = function (_BaseClass) {
    _inherits(Scene, _BaseClass);

    function Scene() {
        _classCallCheck(this, Scene);

        return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(Scene, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState(e) {
                    return {
                        selectCover: {
                            display: 'none',
                            top: 0,
                            left: 0,
                            width: 0,
                            height: 0
                        }
                    };
                },
                sceneRect: {},
                handleWheel: function handleWheel(e) {
                    var scene = _react2.default.findDOMNode(this.refs.scene);
                    scene.scrollTop += e.deltaY;
                },
                componentDidMount: function componentDidMount() {
                    this.sceneRect = Comm.getElementRect(_react2.default.findDOMNode(this.refs.scene));
                },
                render: function render() {
                    var coverStyle = {
                        display: this.state.selectCover.display ? 'block' : 'none',
                        top: this.state.selectCover.top - this.sceneRect.top,
                        left: this.state.selectCover.left - this.sceneRect.left,
                        width: this.state.selectCover.width,
                        height: this.state.selectCover.height
                    };
                    return _react2.default.createElement(
                        'div',
                        { ref: 'scene', className: 'scene-screen', onWheel: this.handleWheel, 'data-dragtype': 'select' },
                        _react2.default.createElement(MagicViewDom, { width: '375', height: '667' }),
                        _react2.default.createElement('div', { className: 'select-cover', style: coverStyle })
                    );
                }
            });
        }
    }]);

    return Scene;
}(_Base.BaseClass);

exports.default = Scene;