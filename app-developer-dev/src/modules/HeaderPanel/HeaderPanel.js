'use strict';

/**
 * 头部面板
 * 提供页面顶部工具栏功能
 * @author   
 * @datetime 
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Base = require('../../core/Base.class');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_BaseClass) {
    _inherits(Header, _BaseClass);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(Header, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                getInitialState: function getInitialState() {
                    return { toolsUnfolded: true };
                },
                handleClick: function handleClick(e) {
                    var toolsUnfolded = this.state.toolsUnfolded,
                        toolsPanel = document.querySelector('.operate-wrap');
                    e.preventDefault();
                    if (toolsUnfolded) {
                        toolsPanel.className += ' unfold';
                    } else {
                        toolsPanel.className = toolsPanel.className.replace(/ unfold/g, '');
                    }
                    this.setState({ toolsUnfolded: !toolsUnfolded });
                },
                render: function render() {
                    return _react2.default.createElement(
                        'header',
                        { className: 'header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'h-pannel' },
                            '\u667A\u80FD\u8BBE\u5907\u81EA\u52A9\u63A5\u5165\u7CFB\u7EDF'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'h-btns' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'tools-slide', title: '\u6536\u8D77\u5DE5\u5177\u680F', onClick: this.handleClick },
                                this.state.toolsUnfolded ? '-' : '+'
                            )
                        )
                    );
                }
            });
        }
    }]);

    return Header;
}(_Base.BaseClass);

exports.default = Header;