'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pager = exports.getElementRect = exports.getStyle = exports.domReady = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 公共类
 * 各种公共函数可写在此文件
 */

/**
 * 页面加载完成回调函数
 * @param  {function} func 页面加载完成时将调用的回调函数
 */
var domReady = exports.domReady = function domReady(func) {
    document.addEventListener('DOMContentLoaded', func);
};

/**
 * 获取计算后的样式
 * @param    {element}  element   目标元素
 * @param    {string}   propName  样式名称
 * @param    {string}   pseudoElt 伪类名称，获取伪类样式时可用该参数
 * @return   {string}             返回样式值
 */
var getStyle = exports.getStyle = function getStyle(element, propName) {
    var pseudoElt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return element && window.getComputedStyle(element, pseudoElt).getPropertyValue(propName);
};

/**
 * 获取元素矩阵
 * @author   vilien
 * @datetime 2015-12-28
 * @param    {element}   element 目标元素
 * @return   {object}            返回矩阵对象
 */
var getElementRect = exports.getElementRect = function getElementRect(element) {
    var doc = element && element.ownerDocument,
        docElem = (element && element.ownerDocument).documentElement,
        box = element.getBoundingClientRect(),
        rect = { top: box.top, left: box.left, right: box.right, bottom: box.bottom, width: box.width, height: box.height };
    rect.top += docElem.scrollTop - (docElem.clientTop || 0);
    rect.left += docElem.scrollLeft - (docElem.clientLeft || 0);
    return rect;
};

// 分页组件
function validateInput(val, totalPages, currentPage) {
    var reg = /^[1-9]\d*$/;
    if (!(val && reg.test(val))) {
        return false;
    } else {
        if (val <= totalPages && val != currentPage) {
            return true;
        } else {
            return false;
        }
    }
};

var FirstPageAbled = _react2.default.createClass({ // 首页,可以点击
    render: function render() {
        return _react2.default.createElement('input', { type: 'button', className: 'icon-first', value: '\u9996\u9875', onClick: this.props.getPager(1) });
    }
});
var FirstPageDisabled = _react2.default.createClass({ // 首页,不可以点击
    render: function render() {
        return _react2.default.createElement('input', { type: 'button', className: 'icon-first', value: '\u9996\u9875', disabled: 'disabled' });
    }
});
var LastPageAbled = _react2.default.createClass({ // 尾页,可以点击
    render: function render() {
        var totalPages = this.props.totalPages;
        return _react2.default.createElement('input', { type: 'button', className: 'icon-last', value: '\u5C3E\u9875', onClick: this.props.getPager(totalPages) });
    }
});
var LastPageDisabled = _react2.default.createClass({ // 尾页,不可以点击
    render: function render() {
        return _react2.default.createElement('input', { type: 'button', className: 'icon-last', value: '\u5C3E\u9875', disabled: 'disabled' });
    }
});
var BtnPrevAbled = _react2.default.createClass({ // 上一页,可以点击
    render: function render() {
        var pageindex = this.props.pageIndex - 1;
        return _react2.default.createElement('input', { type: 'button', className: 'icon-chevron-thin-left', value: '<', onClick: this.props.getPager(pageindex) });
    }
});
var BtnPrevDisabled = _react2.default.createClass({ // 上一页,不可以点击
    render: function render() {
        return _react2.default.createElement('input', { type: 'button', className: 'icon-chevron-thin-left', value: '<', disabled: 'disabled' });
    }
});
var BtnNextAbled = _react2.default.createClass({ // 下一页,可以点击
    render: function render() {
        var pageindex = this.props.pageIndex + 1;
        return _react2.default.createElement('input', { type: 'button', className: 'icon-chevron-thin-right', value: '>', onClick: this.props.getPager(pageindex) });
    }
});
var BtnNextDisabled = _react2.default.createClass({ // 下一页,不可以点击
    render: function render() {
        return _react2.default.createElement('input', { type: 'button', className: 'icon-chevron-thin-right', value: '>', disabled: 'disabled' });
    }
});
var PageIndex = _react2.default.createClass({
    // 页面索引
    getPager: function getPager(i) {
        this.props.getPager(i);
    },
    componentDidMount: function componentDidMount() {},

    render: function render() {
        var totalPages = this.props.pager.totalPages;
        var pageIndex = this.props.pager.pageIndex;
        var paging = {
            showSize: 6,
            startIndex: 0,
            endIndex: totalPages
        };
        var index = [];
        if (totalPages > paging.showSize) {
            paging.startIndex = pageIndex - 1;
            paging.endIndex = pageIndex + paging.showSize - 1;
            if (paging.endIndex > totalPages) {
                paging.startIndex = totalPages - paging.showSize;
                paging.endIndex = totalPages;
            }
        }

        for (var i = paging.startIndex; i < paging.endIndex; i++) {
            if (i == pageIndex - 1) {
                index.push(_react2.default.createElement(
                    'span',
                    { className: 'curPage', key: i, id: 'currentPage' },
                    pageIndex
                ));
            } else {
                index.push(_react2.default.createElement(
                    'a',
                    { href: 'javascript:void(0)', key: i, onClick: this.getPager(i + 1) },
                    i + 1
                ));
            }
        }
        return _react2.default.createElement(
            'span',
            null,
            index
        );
    }
});
var PageJump = _react2.default.createClass({ // 页面跳转
    handleClick: function handleClick() {
        var inputPageIndex = this.refs.inputPageIndex;
        var val = inputPageIndex.value && inputPageIndex.value.match(/[^\s]+/g).join("");
        if (validateInput(val, this.props.pager.totalPages, this.props.pager.pageIndex)) {
            this.props.getPager(val);
        } else {
            inputPageIndex.style.borderColor = "red";
            inputPageIndex.focus();
        }
    },
    handleChange: function handleChange(e) {
        var target = e.target;
        var val = target.value && target.value.match(/[^\s]+/g).join("");
        if (validateInput(val, this.props.pager.totalPages, this.props.pager.pageIndex)) {
            target.style.borderColor = "#d8d8d8";
        } else {
            target.style.borderColor = "red";
        }
    },
    handleBlur: function handleBlur(e) {
        var target = e.target;
        var val = target.value && target.value.match(/[^\s]+/g).join("");
        if (!val) {
            target.style.borderColor = '#d8d8d8';
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'span',
            { className: 'jump' },
            '\u5171',
            _react2.default.createElement(
                'em',
                { id: 'totalPages' },
                this.props.pager.totalPages
            ),
            '\u9875\uFF0C\u5230\u7B2C',
            _react2.default.createElement('input', { type: 'text', maxLength: '5', ref: 'inputPageIndex', id: 'input-pageIndex', onChange: this.handleChange, onBlur: this.handleBlur }),
            '\u9875',
            _react2.default.createElement('input', { type: 'button', value: '\u786E\u5B9A', className: 'btn-jump', onClick: this.handleClick })
        );
    }
});
var Pager = exports.Pager = _react2.default.createClass({
    render: function render() {
        var isBtnPrev, isBtnNext, isFirstPage, isLastPage;
        if (this.props.pager.hasPrevPage) {
            isBtnPrev = _react2.default.createElement(BtnPrevAbled, { pageIndex: this.props.pager.pageIndex, getPager: this.props.getPager });
            isFirstPage = _react2.default.createElement(FirstPageAbled, { getPager: this.props.getPager });
        } else {
            isBtnPrev = _react2.default.createElement(BtnPrevDisabled, null);
            isFirstPage = _react2.default.createElement(FirstPageDisabled, null);
        }
        if (this.props.pager.hasNextPage) {
            isBtnNext = _react2.default.createElement(BtnNextAbled, { pageIndex: this.props.pager.pageIndex, getPager: this.props.getPager });
            isLastPage = _react2.default.createElement(LastPageAbled, { totalPages: this.props.pager.totalPages, getPager: this.props.getPager });
        } else {
            isBtnNext = _react2.default.createElement(BtnNextDisabled, null);
            isLastPage = _react2.default.createElement(LastPageDisabled, null);
        }
        return _react2.default.createElement(
            'div',
            { className: 'manage-paging' },
            isFirstPage,
            isBtnPrev,
            _react2.default.createElement(PageIndex, { pager: this.props.pager, getPager: this.props.getPager }),
            isBtnNext,
            isLastPage,
            _react2.default.createElement(PageJump, { pager: this.props.pager, getPager: this.props.getPager })
        );
    }
});