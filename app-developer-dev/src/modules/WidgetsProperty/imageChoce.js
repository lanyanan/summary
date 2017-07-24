'use strict';
/**
 * 宫格图标组件
 * @author   hey
 * @datetime 2017-06-23
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageChoce = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _common = require('../common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageChoce = exports.ImageChoce = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                picList: {
                    pager: {},
                    picList: []
                },
                picListShow: false,
                iconPath: '',
                activeIcon: null
            };
        },
        componentDidMount: function componentDidMount() {
            _Actions.Actions.getPicList(1, 2, 100);
        },
        componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
            if (nextProps.widget.userWidgetID != this.props.widget.userWidgetID) {
                _Actions.Actions.getPicList(1, 2, 100);
            }
        },
        showImageBox: function showImageBox() {
            this.setState({
                picListShow: true
            });
        },
        changeImage: function changeImage(e) {
            var path = e.target.getAttribute('data-path'),
                index = e.target.getAttribute('data-index');
            console.log(path, index);
            if (!path) return;
            this.setState({
                iconPath: path,
                activeIcon: index
            });
        },
        closeImageBox: function closeImageBox() {
            this.setState({
                picListShow: false
            });
        },
        sureImage: function sureImage() {
            this.closeImageBox();
            _Actions.Actions.changeWidgetInfo('gridIcon', this.state.iconPath);
        },
        getPager: function getPager(pageIndex) {
            console.log(pageIndex);
        },
        render: function render() {
            var _this = this;

            var widget = this.props.widget,
                picList = widget.picList;

            return _react2.default.createElement(
                'section',
                { className: 'img-choce' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u56FE\u7247'
                ),
                _react2.default.createElement(
                    'em',
                    { onClick: this.showImageBox },
                    '\u9009\u62E9\u56FE\u6807'
                ),
                this.state.picListShow ? _react2.default.createElement(
                    'div',
                    { className: 'picList', style: { display: "block" } },
                    _react2.default.createElement(
                        'main',
                        null,
                        _react2.default.createElement(
                            'header',
                            null,
                            '\u9009\u62E9\u56FE\u7247',
                            _react2.default.createElement(
                                'span',
                                { className: 'closeList', onClick: this.closeImageBox },
                                'X'
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'img-choce-list', onClick: this.changeImage },
                            picList.picList.map(function (item, index) {
                                var url = '';
                                if (item.url.indexOf('https') < 0) {
                                    url = item.url.replace(/http/, 'https').replace(/:\d{4}/, '');
                                }
                                return _react2.default.createElement(
                                    'li',
                                    { key: index, className: _this.state.activeIcon == index ? "active" : "" },
                                    _react2.default.createElement('img', { 'data-index': index, src: url, 'data-path': url, alt: '' })
                                );
                            })
                        ),
                        picList.pager && _react2.default.createElement(_common.Pager, { pager: picList.pager, getPager: this.getPager }),
                        _react2.default.createElement(
                            'footer',
                            null,
                            _react2.default.createElement(
                                'i',
                                { className: 'btn', onClick: this.sureImage },
                                '\u786E\u5B9A'
                            ),
                            _react2.default.createElement(
                                'i',
                                { className: 'btn', onClick: this.closeImageBox },
                                '\u53D6\u6D88'
                            )
                        )
                    )
                ) : null
            );
        }
    })
};