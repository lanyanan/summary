'use strict';
/**
 * 图像属性面板类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _uploadVerification = require('./uploadVerification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 图片验证类

var ImageProperty = exports.ImageProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        piconload: function piconload(e) {
            //上传背景图片
            e.stopPropagation();
            var imagefile = e.target.files[0];
            var pid = Number(e.target.getAttribute('data-pid'));
            if (!(0, _uploadVerification.uploadVerification)(imagefile)) return; //验证图片是否符合格式
            var formdata = new FormData();
            formdata.append('file', imagefile);
            var reader = new FileReader();
            reader.readAsDataURL(imagefile);
            reader.onload = function (e) {
                var img = new Image(); //构造JS的Image对象
                document.querySelector('#imagepreview' + pid).src = img.src = this.result; //将本地图片赋给image对象
                img.onload = function () {
                    _Actions.Actions.uploadBgImage(pid, formdata, img.width, img.height);
                };
            };
        },
        changeStatusName: function changeStatusName(e) {
            //修改控件当前状态显示名
            var pid = Number(e.target.getAttribute('data-pid'));
            var snvalue = e.target.value;
            _Actions.Actions.changeStatusName(pid, snvalue, 'statusName');
        },
        delStatusName: function delStatusName(e) {
            //删除控件当前状态显示名
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStatusName(pid, '', 'statusName');
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.picname).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.picname).focus();
            });
        },
        hiddenBlur: function hiddenBlur(e) {
            this.setState({ hidden: true });
        },
        keydown: function keydown(e) {
            //回车快捷键 提交命名结束
            if (e.keyCode == 13) {
                this.setState({ hidden: true });
            } else {
                return;
            }
        },
        render: function render() {
            var I = this.props.item,
                i = this.props.index;
            var uploadHidden = this.props.uploadHidden || false;
            return _react2.default.createElement(
                'div',
                { className: 'imageproperty' },
                _react2.default.createElement(
                    'section',
                    { className: 'imageinfo' },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.showStall ? '档位名称' : '状态名称'
                    ),
                    _react2.default.createElement('input', { className: 'picname', value: I.statusName, onChange: this.showFocus,
                        onFocus: this.showFocus, placeholder: '\u8BF7\u586B\u5199\u72B6\u6001\u540D' }),
                    _react2.default.createElement('input', { className: 'picnamehidden', onChange: this.changeStatusName, ref: 'picname',
                        onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                        'data-pid': i, defaultValue: I.statusName, onKeyDown: this.keydown }),
                    _react2.default.createElement('span', { className: 'deleteinfo', 'data-pid': i, onClick: this.delStatusName })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'imageupload', style: { display: uploadHidden ? 'none' : 'block' } },
                    _react2.default.createElement('input', { className: 'uploadfile', onChange: this.piconload,
                        type: 'file', 'data-pid': i,
                        accept: 'image/png,image/jpeg,image/gif' }),
                    _react2.default.createElement('img', { id: 'imagepreview' + i, src: I.bgImagePath || "../static/img/noimage.png" })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'imagebutton', style: { display: uploadHidden ? 'none' : 'block' } },
                    _react2.default.createElement(
                        'label',
                        null,
                        '\u70B9\u51FB\u4E0A\u4F20\u56FE\u7247'
                    )
                )
            );
        }
    })
};