'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _common = require('../../modules/common');

var Comm = _interopRequireWildcard(_common);

var _HeaderPanel = require('../../modules/HeaderPanel/HeaderPanel');

var _HeaderPanel2 = _interopRequireDefault(_HeaderPanel);

var _Actions = require('../playground/Actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 公共函数模块
require('../../libs/jquery'); // 头部面板

require('../../libs/qrcode');

// 生成各模块实例
var Header = new _HeaderPanel2.default();

// 获取各模块React组件
var HeaderDom = Header.getComponent();

var QRCode = _react2.default.createClass({
  getInitialState: function getInitialState() {
    return {
      title: 'C-Life'
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.url) {
      this.generate2DCode(this.props.url);
    }
  },
  generate2DCode: function generate2DCode(content) {
    $('#codeWrap').qrcode({
      render: "canvas", //也可以替换为table(table生成的二维码结构比较复杂)
      width: 180, //设置二维码的宽高
      height: 180,
      text: encodeURI(content)
    });
  },
  powerHandler: function powerHandler() {
    _Actions.Actions.showPanel("preview");
    // history.back();
    // location.reload();
  },
  render: function render() {

    return _react2.default.createElement(
      'div',
      { className: 'app-body' },
      _react2.default.createElement(
        'section',
        { className: 'text' },
        _react2.default.createElement(
          'div',
          { className: 'right', onClick: this.powerHandler },
          'X'
        )
      ),
      _react2.default.createElement(
        'section',
        { className: 'picture' },
        _react2.default.createElement(
          'div',
          { id: 'qrcode' },
          _react2.default.createElement(
            'div',
            { className: 'img' },
            _react2.default.createElement('img', { className: 'power', src: '../static/img/preview.png' })
          ),
          _react2.default.createElement('div', { id: 'codeWrap' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'right' },
          _react2.default.createElement(
            'div',
            { style: { width: "100%", height: '100%', backgroundColor: '#ffffff' } },
            _react2.default.createElement('iframe', { src: this.props.url, width: '100%', height: '100%' })
          )
        )
      )
    );
  }
});

// <div className="resize-canvas" data-dragtype="canvas"></div>
// Comm.domReady(() => React.render(<QRCode /> , document.body));

module.exports = QRCode;