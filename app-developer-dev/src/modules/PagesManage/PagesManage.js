'use strict';

/**
 * 页面管理类
 * 提供页面管理设定
 * @author   xinglin
 * @datetime 2015-12-22
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

var PagesManage = function (_PanelBase) {
    _inherits(PagesManage, _PanelBase);

    function PagesManage() {
        _classCallCheck(this, PagesManage);

        return _possibleConstructorReturn(this, (PagesManage.__proto__ || Object.getPrototypeOf(PagesManage)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(PagesManage, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        mousePage: -1,
                        activerename: -1,
                        showWidgetList: true,
                        showTab: null,
                        showTabChild: null,
                        pages: {
                            activePage: 0,
                            activerename: -1,
                            activeWidget: -1,
                            activeWidgetChild: -1,
                            activeWidgetGrandchild: -1,
                            pageList: [{ pageName: "主页", pageId: 0, widgetList: [{}] }]
                        }
                    };
                },
                mouseover: function mouseover(e) {
                    //鼠标移出隐藏复制删除操作
                    e.preventDefault();
                    var pageId = e.currentTarget.getAttribute('data-pageid');
                    this.setState({ mousePage: pageId });
                },
                mouseleave: function mouseleave(e) {
                    //鼠标移入显示复制删除操作
                    e.preventDefault();
                    this.setState({ mousePage: -1 });
                },
                createpage: function createpage(e) {
                    //新建页面
                    e.stopPropagation();
                    var pagelength = this.state.pages.pageList.length;
                    var pageId = Math.floor((this.state.pages.pageList.length + Math.random()) * 100);
                    var newpage = { pageName: "新建页面" + (pagelength + 1), pageId: pageId, widgetList: [] };
                    var newpages = this.state.pages;
                    newpages.pageList.push(newpage);
                    this.setState({ pages: newpages });
                    _Actions.Actions.createPage(pagelength - 1, newpage);
                },
                copypage: function copypage(e) {
                    //复制页面
                    e.stopPropagation();
                    var pindex = Number(e.target.getAttribute('data-index'));
                    var pageId = Math.floor((this.state.pages.pageList.length + Math.random()) * 100);
                    var newpages = JSON.parse(JSON.stringify(this.state.pages));
                    var newpage = JSON.parse(JSON.stringify(newpages.pageList[pindex]));
                    newpage.widgetList.map(function (widget) {
                        widget.unsaved = true;
                        widget.widgetId = null;
                        widget.userWidgetID = widget.userWidgetID + 1;
                    });
                    newpage.pageName += ' Copy';
                    newpage.pageId = pageId;
                    var newIndex = newpages.pageList.push(newpage);
                    // newpages.pageList.splice(pindex+1,0,newpage);
                    this.setState({ pages: newpages });
                    _Actions.Actions.createPage(newIndex - 2, newpage, 'copy');
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
                togglePage: function togglePage(e) {
                    //伸缩页面
                    e.stopPropagation();
                    var index = Number(e.target.getAttribute('data-index'));
                    var pages = this.state.pages;

                    _Actions.Actions.changePage(index);
                    pages.activeWidgetGrandchild = -1;
                    pages.activeWidgetChild = -1;
                    pages.activeWidget = -1;
                    this.setState({
                        pages: pages
                    });
                },
                toggleWidget: function toggleWidget(e) {
                    e.stopPropagation();
                    var index = e.target.getAttribute('data-index');
                    var top = e.target.getAttribute('data-top');
                    var left = e.target.getAttribute('data-left');
                    var childIndex = e.target.getAttribute('data-child');
                    var grandchild = e.target.getAttribute('data-grandchild');
                    var pages = this.state.pages;

                    if (grandchild) {
                        //孙子索引存在时即表示选中当前子控件（孙子）
                        pages.activeWidgetGrandchild = Number(grandchild);
                        this.setState({
                            pages: pages
                        });
                        _Actions.Actions.selectUserWidget(index, { left: left, top: top }, childIndex, grandchild);
                    } else if (childIndex) {
                        //儿子索引存在时即表示选中指定选项（儿子）
                        pages.activeWidgetChild = Number(childIndex);
                        this.setState({
                            pages: pages
                        });
                        _Actions.Actions.selectUserWidget(index, null, childIndex);
                    } else if (left && top) {
                        pages.activeWidget = Number(index);
                        this.setState({
                            pages: pages
                        });
                        _Actions.Actions.selectUserWidget(Number(index), { left: left, top: top });
                    }
                },

                render: function render() {
                    var _this2 = this;

                    //let pages = this.props.pages.pageList || this.pages;
                    var pages = this.state.pages.pageList;
                    var page = this.state.pages;
                    var activeWidgetChild = page.activeWidgetChild > -1 ? page.activeWidgetChild : -1;
                    var mousePage = this.state.mousePage || this.state.mousePage == 0 ? this.state.mousePage : -1;
                    var activerename = this.state.activerename || this.state.activerename == 0 ? this.state.activerename : -1;
                    var showTab = this.state.showTab;
                    var showTabChild = this.state.showTabChild;
                    return _react2.default.createElement(
                        'div',
                        { ref: 'pagesArea', className: 'pagesArea' },
                        _react2.default.createElement(
                            'div',
                            { className: 'pagesbody' },
                            _react2.default.createElement(
                                'section',
                                { className: 'mainpage' },
                                '\u9875\u9762',
                                _react2.default.createElement(
                                    'section',
                                    { className: 'addstatus', onClick: this.createpage },
                                    '\u6DFB\u52A0\u9875\u9762'
                                )
                            ),
                            _react2.default.createElement(
                                'ul',
                                { className: 'pages-menu' },
                                pages.map(function (pageItem, i) {
                                    return _react2.default.createElement(
                                        'li',
                                        { key: i },
                                        _react2.default.createElement(
                                            'div',
                                            { className: page.activePage == i && page.activeWidget < 0 ? "widget-list-title active" : "widget-list-title", onMouseOver: _this2.mouseover, onMouseLeave: _this2.mouseleave, 'data-pageid': pageItem.pageId },
                                            _react2.default.createElement('label', null),
                                            _react2.default.createElement(
                                                'span',
                                                { 'data-index': i, onClick: _this2.togglePage },
                                                pageItem.pageName
                                            ),
                                            _react2.default.createElement('em', { className: 'page-icon' }),
                                            _react2.default.createElement(
                                                'section',
                                                { className: mousePage == pageItem.pageId ? "controls-on" : "controls-off" },
                                                _react2.default.createElement('img', { src: '../static/img/newpage.png', 'data-index': i, onClick: _this2.copypage, className: 'aimg' }),
                                                _react2.default.createElement('img', { src: '../static/img/delpage.png', 'data-index': i, 'data-name': pageItem.pageName, onClick: _this2.deletepage, className: 'aimg' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'ul',
                                            { style: { display: page.activePage == i ? "block" : "none" } },
                                            pageItem.widgetList && pageItem.widgetList.map(function (widgetItem, j) {
                                                return _react2.default.createElement(
                                                    'li',
                                                    { key: j },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: page.activeWidget == j && page.activeWidgetChild < 0 ? "widget-list-title active" : "widget-list-title" },
                                                        _react2.default.createElement('label', { className: widgetItem.widgetListItem ? "haschild" : "" }),
                                                        _react2.default.createElement(
                                                            'span',
                                                            { className: widgetItem.widgetListItem ? "haschild" : "", 'data-index': j, 'data-top': widgetItem.top, 'data-left': widgetItem.left, onClick: _this2.toggleWidget },
                                                            widgetItem.caption
                                                        ),
                                                        _react2.default.createElement('img', { src: widgetItem.icon, alt: '', className: widgetItem.widgetListItem ? "icon haschild" : "icon" }),
                                                        _react2.default.createElement('img', { src: widgetItem.iconActive, alt: '', className: widgetItem.widgetListItem ? "icon-active haschild" : "icon-active" })
                                                    ),
                                                    _react2.default.createElement(
                                                        'ul',
                                                        { style: { display: page.activeWidget == j ? "block" : "none" } },
                                                        widgetItem.widgetListItem && widgetItem.widgetListItem.map(function (childWidgetItem, k) {
                                                            return _react2.default.createElement(
                                                                'li',
                                                                { key: k },
                                                                _react2.default.createElement(
                                                                    'div',
                                                                    { className: page.activeWidgetChild == k && page.activeWidgetGrandchild < 0 ? "widget-list-title active" : "widget-list-title" },
                                                                    _react2.default.createElement(
                                                                        'span',
                                                                        { 'data-index': j, 'data-child': k, onClick: _this2.toggleWidget },
                                                                        widgetItem.widgetListItem[k][0] ? widgetItem.widgetListItem[k][0].tabName : '选项'
                                                                    ),
                                                                    _react2.default.createElement('label', { className: childWidgetItem ? "haschild" : "" })
                                                                ),
                                                                _react2.default.createElement(
                                                                    'ul',
                                                                    { style: { display: page.activeWidgetChild == k ? "block" : "none" } },
                                                                    childWidgetItem.map(function (wgrandchild, g) {
                                                                        return _react2.default.createElement(
                                                                            'li',
                                                                            { key: g },
                                                                            _react2.default.createElement(
                                                                                'div',
                                                                                { className: page.activeWidgetGrandchild == g ? "widget-list-title active" : "widget-list-title" },
                                                                                _react2.default.createElement(
                                                                                    'span',
                                                                                    { 'data-index': j, 'data-child': k, 'data-grandchild': g, 'data-top': wgrandchild.top, 'data-left': wgrandchild.left, onClick: _this2.toggleWidget },
                                                                                    wgrandchild.caption
                                                                                ),
                                                                                _react2.default.createElement('img', { src: widgetItem.icon, alt: '', className: 'icon' }),
                                                                                _react2.default.createElement('img', { src: widgetItem.iconActive, alt: '', className: 'icon-active' })
                                                                            ),
                                                                            _react2.default.createElement(
                                                                                'ul',
                                                                                null,
                                                                                _react2.default.createElement('li', null)
                                                                            )
                                                                        );
                                                                    })
                                                                )
                                                            );
                                                        })
                                                    )
                                                );
                                            })
                                        )
                                    );
                                })
                            )
                        )
                    );
                }
            });
        }
    }]);

    return PagesManage;
}(_PanelBase2.PanelBase);

exports.default = PagesManage;