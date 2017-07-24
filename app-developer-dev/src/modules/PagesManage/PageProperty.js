'use strict';

/**
 * 页面属性管理类
 * @author   xinglin
 * @datetime 2016-09-14
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _Store = require('../../apps/playground/Store');

var _PanelBase2 = require('../../core/PanelBase.class');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _pagesArea_ = Symbol('_pagesArea_'); // 页面面板

var PageProperty = function (_PanelBase) {
    _inherits(PageProperty, _PanelBase);

    function PageProperty() {
        _classCallCheck(this, PageProperty);

        return _possibleConstructorReturn(this, (PageProperty.__proto__ || Object.getPrototypeOf(PageProperty)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(PageProperty, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        mousePage: -1,
                        hidden: true,
                        activerename: -1,
                        showWidgetList: true,
                        activePictureUrl: null,
                        phone: { height: 667, minHeight: 667 },
                        pages: {
                            activePage: 0,
                            activerename: -1,
                            activeWidget: -1,
                            pageList: [{ pageName: "主页", pageId: 0, widgetList: [{}], pageBgUrl: null }]
                        },
                        picList: {
                            pager: {},
                            picList: []
                        }
                    };
                },
                deletepage: function deletepage(e) {
                    //删除页面
                    e.stopPropagation();
                    var pageName = e.target.getAttribute('data-name');
                    var pindex = Number(e.target.getAttribute('data-index'));
                    if (pindex === 0) {
                        alert('不能删除主页');
                        return;
                    }
                    if (confirm('确定要删除 ' + pageName + ' ?')) {
                        _Actions.Actions.deletePage(pindex);
                    } else {
                        return;
                    }
                },
                showFocus: function showFocus(e) {
                    var _this2 = this;

                    var defaultvalue = e.target.value;
                    this.setState({ hidden: false }, function () {
                        _react2.default.findDOMNode(_this2.refs.pageName).value = defaultvalue;
                        _react2.default.findDOMNode(_this2.refs.pageName).focus();
                    });
                },
                renameing: function renameing(e) {
                    //命名修改中 实时更改状态显示最新命名
                    e.stopPropagation();
                    var pindex = Number(e.target.getAttribute('data-index'));
                    var newname = e.target.value.substr(0, 15);
                    _Actions.Actions.renamePage(pindex, newname);
                },
                renameend: function renameend(e) {
                    //命名结束,页面名不再可操作及失去焦点
                    e.stopPropagation();
                    if (e.target.value == '') {
                        var pindex = Number(e.target.getAttribute('data-index'));
                        var newname = 'Untitled';
                        _Actions.Actions.renamePage(pindex, newname);
                    }
                    this.setState({ hidden: true });
                },
                keydown: function keydown(e) {
                    //回车快捷键 提交命名结束
                    e.stopPropagation();
                    if (e.keyCode == 13) {
                        this.renameend(e);
                    } else {
                        return;
                    }
                },
                changeHeight: function changeHeight(e) {
                    var newValue = e.target.value;
                    if (newValue < this.state.phone.minHeight) return;
                    var value = newValue - this.state.phone.height;
                    _Actions.Actions.resizeCanvas(value);
                },
                changeBgHeight: function changeBgHeight(e) {
                    var newValue = parseInt(e.target.value);
                    newValue = newValue > this.state.phone.height ? this.state.phone.height : newValue;
                    newValue = newValue ? newValue + "px" : 0;
                    var activePage = this.state.pages.activePage > 0 ? this.state.pages.activePage : 0;
                    _Actions.Actions.changePageBg(activePage, 'bgHeight', newValue);
                },
                changeBgImage: function changeBgImage(e) {
                    var newValue = e.target.getAttribute('data-path');
                    if (!newValue) return;
                    this.setState({
                        activePictureUrl: newValue
                    });
                },
                clearImage: function clearImage(e) {
                    this.setState({
                        activePictureUrl: ''
                    });
                },
                uploadBgImage: function uploadBgImage(e) {
                    var imagefile = e.target.files[0];
                    if (!imagefile) return;
                    if (imagefile.type != 'image/jpeg' && imagefile.type != 'image/png' && imagefile.type != 'image/gif') {
                        alert('请上传正确的图片格式(jpg/png/gif)!');
                        return; //验证是否为指定格式
                    }
                    if (parseInt(parseInt(imagefile.size) / 1024) > 500) {
                        alert('请上传大小不超过500KB的图片!');
                        return; //验证大小是否超过500KB
                    }
                    var formdata = new FormData();
                    formdata.append('file', imagefile);
                    _Actions.Actions.uploadPageImage(formdata);
                },

                chooseBgImage: function chooseBgImage(e) {
                    var newValue = this.state.activePictureUrl;
                    var activePage = this.state.pages.activePage > 0 ? this.state.pages.activePage : 0;
                    _Actions.Actions.changePageBg(activePage, 'pageBgUrl', newValue);
                    this.setState({
                        picListShow: false
                    });
                },
                changeHeightType: function changeHeightType(e) {
                    var newValue = e.target.value;
                    var activePage = this.state.pages.activePage > 0 ? this.state.pages.activePage : 0;
                    _Actions.Actions.changePageBg(activePage, 'bgHeightType', newValue);
                    if (newValue === '1') _Actions.Actions.changePageBg(activePage, 'bgHeight', '100%');
                    if (newValue === '2') _Actions.Actions.changePageBg(activePage, 'bgHeight', this.state.phone.height + 'px');
                },
                calibration: function calibration(e) {
                    var newValue = e.target.value;
                    if (newValue < this.state.phone.minHeight) {
                        var value = this.state.phone.minHeight - this.state.phone.height;
                        _Actions.Actions.resizeCanvas(value);
                        _react2.default.findDOMNode(this.refs.pageHeight).value = this.state.phone.minHeight;
                    }
                },
                colorPick: function colorPick(e) {
                    var newcolor = e.target.value;
                    var activePage = this.state.pages.activePage > 0 ? this.state.pages.activePage : 0;
                    _Actions.Actions.changePageBg(activePage, 'pageColor', newcolor);
                },
                toggleView: function toggleView(e) {
                    if (e.target.className == "close") {
                        e.target.parentNode.nextElementSibling.style.display = "none";
                        e.target.className = "open";
                    } else if (e.target.className == "open") {
                        e.target.parentNode.nextElementSibling.style.display = "block";
                        e.target.className = "close";
                    }
                },
                togglePicList: function togglePicList(e) {
                    var value = !this.state.picListShow;
                    this.setState({
                        picListShow: value
                    });
                },
                previousPage: function previousPage(e) {
                    if (this.state.picList.pager.hasPrevPage) {
                        _Actions.Actions.getPicList(this.state.picList.pager.pageIndex - 1);
                    }
                },
                nextPage: function nextPage(e) {
                    if (this.state.picList.pager.hasNextPage) {
                        _Actions.Actions.getPicList(Number(this.state.picList.pager.pageIndex) + 1);
                    }
                },

                render: function render() {
                    var pageProShow = this.state.pages.activePage != -1 && this.state.pages.activeWidget == -1 ? true : false;
                    var activePage = this.state.pages.activePage > 0 ? this.state.pages.activePage : 0;
                    var pages = this.state.pages.pageList || [];
                    var page = pages[activePage];
                    var pictureUrl = this.state.activePictureUrl === null ? page.pageBgUrl : this.state.activePictureUrl;
                    var hasPrevPage = this.state.picList.pager.hasPrevPage;
                    var hasNextPage = this.state.picList.pager.hasNextPage;
                    return _react2.default.createElement(
                        'div',
                        { className: 'pageProperty', style: { display: pageProShow ? 'block' : 'none' } },
                        _react2.default.createElement(
                            'header',
                            null,
                            '\u9875\u9762'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'propertybody' },
                            _react2.default.createElement(
                                'div',
                                { className: 'page-property-content' },
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u540D\u79F0'
                                    ),
                                    _react2.default.createElement('input', { className: 'pageName', value: page.pageName, onChange: this.showFocus,
                                        onFocus: this.showFocus }),
                                    _react2.default.createElement('input', { className: 'pageNamehidden', 'data-index': activePage, type: 'text', onChange: this.renameing,
                                        onBlur: this.renameend, style: { display: this.state.hidden ? "none" : "" },
                                        onKeyDown: this.keydown, defaultValue: page.pageName, ref: 'pageName' })
                                ),
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u5BBD\u5EA6'
                                    ),
                                    _react2.default.createElement('input', { className: 'pageName', type: 'number', readOnly: 'true', value: 375 })
                                ),
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u9AD8\u5EA6'
                                    ),
                                    _react2.default.createElement('input', { id: 'pageHeight', className: 'pageName', ref: 'pageHeight', min: this.state.phone.minHeight, type: 'number', defaultValue: this.state.phone.height, onChange: this.changeHeight, onBlur: this.calibration })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'page-bgimg-list', onClick: this.toggleView },
                                _react2.default.createElement(
                                    'header',
                                    null,
                                    '\u80CC\u666F',
                                    _react2.default.createElement('span', { className: 'close' })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'page-bgimg-content' },
                                    _react2.default.createElement(
                                        'section',
                                        { className: 'pageColor' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u989C\u8272'
                                        ),
                                        _react2.default.createElement('input', { value: page.pageColor, onChange: this.colorPick }),
                                        _react2.default.createElement('input', { type: 'color', value: '#efefef', style: { backgroundColor: page.pageColor }, className: 'extendblock', onChange: this.colorPick })
                                    ),
                                    _react2.default.createElement(
                                        'section',
                                        { className: 'img-choce' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u56FE\u7247'
                                        ),
                                        _react2.default.createElement('input', { type: 'text', readOnly: 'true', style: { backgroundColor: "#3b96ff" }, value: '\u4E0A\u4F20\u56FE\u7247', onClick: this.togglePicList }),
                                        this.state.picListShow ? _react2.default.createElement(
                                            'div',
                                            { className: 'picList' },
                                            _react2.default.createElement(
                                                'main',
                                                null,
                                                _react2.default.createElement(
                                                    'header',
                                                    null,
                                                    '\u9009\u62E9\u56FE\u7247',
                                                    _react2.default.createElement(
                                                        'span',
                                                        { className: 'closeList', onClick: this.clearImage },
                                                        'X'
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'ul',
                                                    { className: 'chooseImage', onClick: this.changeBgImage },
                                                    _react2.default.createElement(
                                                        'li',
                                                        { className: 'uploadImage' },
                                                        _react2.default.createElement('img', { src: '../static/img/upload.png' }),
                                                        _react2.default.createElement('input', { className: 'hidden', onChange: this.uploadBgImage, type: 'file', accept: 'image/png,image/jpeg,image/gif' })
                                                    ),
                                                    this.state.picList.picList.map(function (item, index) {
                                                        return _react2.default.createElement(
                                                            'li',
                                                            { key: index },
                                                            _react2.default.createElement('img', { 'data-path': item.url, 'data-name': item.name, 'data-spec': item.spec, src: item.url })
                                                        );
                                                    })
                                                ),
                                                pictureUrl ? _react2.default.createElement(
                                                    'div',
                                                    { className: 'previewImage' },
                                                    _react2.default.createElement('img', { className: 'previewImage', src: pictureUrl })
                                                ) : _react2.default.createElement('div', { className: 'previewImage' }),
                                                _react2.default.createElement(
                                                    'footer',
                                                    null,
                                                    _react2.default.createElement(
                                                        'i',
                                                        { className: 'btn', onClick: this.chooseBgImage },
                                                        '\u786E\u5B9A'
                                                    ),
                                                    _react2.default.createElement(
                                                        'i',
                                                        { className: 'btn', onClick: this.togglePicList },
                                                        '\u53D6\u6D88'
                                                    )
                                                )
                                            )
                                        ) : null
                                    ),
                                    _react2.default.createElement(
                                        'section',
                                        { className: 'img-height' },
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            '\u9AD8\u5EA6'
                                        ),
                                        _react2.default.createElement(
                                            'select',
                                            { className: 'pageHeight', value: page.bgHeightType, onChange: this.changeHeightType },
                                            _react2.default.createElement(
                                                'option',
                                                { value: '1' },
                                                '\u6EE1\u5C4F'
                                            ),
                                            _react2.default.createElement(
                                                'option',
                                                { value: '2' },
                                                '\u81EA\u5B9A\u4E49'
                                            )
                                        ),
                                        _react2.default.createElement('input', { className: 'heightValue', type: page.bgHeightType == 2 ? "number" : 'hidden', onChange: this.changeBgHeight, value: parseInt(page.bgHeight) || 0 })
                                    )
                                ),
                                _react2.default.createElement('header', { style: { marginTop: '20px' } })
                            ),
                            _react2.default.createElement(
                                'section',
                                { className: 'deleteButton', 'data-name': page.pageName, 'data-index': activePage, onClick: this.deletepage },
                                '\u5220\u9664\u9875\u9762'
                            )
                        )
                    );
                }
            });
        }
    }]);

    return PageProperty;
}(_PanelBase2.PanelBase);

exports.default = PageProperty;