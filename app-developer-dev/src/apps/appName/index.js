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

// 生成各模块实例
// 公共函数模块
var Header = new _HeaderPanel2.default();

// 获取各模块React组件
// 头部面板
var HeaderDom = Header.getComponent();

module.exports = _react2.default.createClass({

  getInitialState: function getInitialState() {
    return {
      title: 'C-Life'
    };
  },
  componentDidMount: function componentDidMount() {},
  publish: function publish() {
    var $title = $('#title').text();
    var title = $title.length == 0 ? this.props.title : $title;
    //console.log(title,$('#remark').val().length);
    if ($('#remark').val().length < 20 || $('#remark').val().length > 200) {
      alert('请输入20-200字以内的发布说明!');
    } else {
      _Actions.Actions.publishProject($('#title').text(), $('#remark').val());
    }
  },
  goToPrev: function goToPrev() {
    // history.back();
    location.reload();
  },
  render: function render() {

    return _react2.default.createElement(
      'div',
      { className: 'publish-body' },
      _react2.default.createElement(
        'section',
        { className: 'title' },
        _react2.default.createElement('label', { className: 'left' })
      ),
      _react2.default.createElement(
        'section',
        { className: 'remark-area' },
        _react2.default.createElement(
          'div',
          { className: 'remark' },
          _react2.default.createElement(
            'p',
            { className: 'item' },
            _react2.default.createElement(
              'label',
              null,
              '\u9879\u76EE\u540D\u79F0:'
            ),
            _react2.default.createElement(
              'span',
              { id: 'title', contentEditable: 'true' },
              this.props.title
            )
          ),
          _react2.default.createElement(
            'p',
            { className: 'item' },
            _react2.default.createElement(
              'label',
              null,
              '\u8BF4\u660E:'
            ),
            _react2.default.createElement('textarea', { placeholder: '\u8BF7\u8F93\u516520-200\u5B57\u4EE5\u5185\u7684\u53D1\u5E03\u8BF4\u660E', defaultValue: this.props.remark, className: 'item', id: 'remark' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'btn-grp' },
          _react2.default.createElement(
            'button',
            { onClick: this.publish },
            '\u53D1\u5E03'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.goToPrev },
            '\u8FD4\u56DE'
          )
        )
      )
    );
  }
});