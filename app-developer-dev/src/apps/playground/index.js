'use strict';
// 导入模块

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // 公共函数模块
// 头部面板
// 组件面板
// 组件尺寸面板
// 组件外观面板
// 组件属性面板
// 层级，显示隐藏，等比缩放组件
// 资产（页面列表）面板
// 页面属性面板
// 控制按钮面板
// 代码编辑面板
// 拖放处理模块
// 快捷键处理类
// 场景
// 预览类
// 发布类


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _pubsub = require('../../core/pubsub');

var _common = require('../../modules/common');

var Comm = _interopRequireWildcard(_common);

var _HeaderPanel = require('../../modules/HeaderPanel/HeaderPanel');

var _HeaderPanel2 = _interopRequireDefault(_HeaderPanel);

var _WidgetsPanel = require('../../modules/WidgetsPanel/WidgetsPanel');

var _WidgetsPanel2 = _interopRequireDefault(_WidgetsPanel);

var _WidgetsSizePanel = require('../../modules/WidgetsSizePanel/WidgetsSizePanel');

var _WidgetsSizePanel2 = _interopRequireDefault(_WidgetsSizePanel);

var _WidgetsExterior = require('../../modules/WidgetsExterior/WidgetsExterior');

var _WidgetsExterior2 = _interopRequireDefault(_WidgetsExterior);

var _WidgetsProperty = require('../../modules/WidgetsProperty/WidgetsProperty');

var _WidgetsProperty2 = _interopRequireDefault(_WidgetsProperty);

var _WidgetsHierarchy = require('../../modules/WidgetsProperty/WidgetsHierarchy');

var _WidgetsHierarchy2 = _interopRequireDefault(_WidgetsHierarchy);

var _PagesManage = require('../../modules/PagesManage/PagesManage');

var _PagesManage2 = _interopRequireDefault(_PagesManage);

var _PageProperty = require('../../modules/PagesManage/PageProperty');

var _PageProperty2 = _interopRequireDefault(_PageProperty);

var _OperateBtnsPanel = require('../../modules/OperateBtnsPanel/OperateBtnsPanel');

var _OperateBtnsPanel2 = _interopRequireDefault(_OperateBtnsPanel);

var _CodePanel = require('../../modules/CodePanel/CodePanel');

var _CodePanel2 = _interopRequireDefault(_CodePanel);

var _Drag = require('../../modules/Drag/Drag');

var _Hotkeys = require('../../modules/Hotkeys/Hotkeys');

var _Scene = require('./Scene');

var _Scene2 = _interopRequireDefault(_Scene);

var _Preview = require('./Preview');

var _Preview2 = _interopRequireDefault(_Preview);

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _Actions = require('./Actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 生成各模块实例
var Header = new _HeaderPanel2.default(),
    Widgets = new _WidgetsPanel2.default(),
    Scene = new _Scene2.default(),
    SizePanel = new _WidgetsSizePanel2.default(),
    Exterior = new _WidgetsExterior2.default(),
    Pages = new _PagesManage2.default(),
    PagePro = new _PageProperty2.default(),
    Property = new _WidgetsProperty2.default(),
    Hierarchy = new _WidgetsHierarchy2.default(),
    OperateBtns = new _OperateBtnsPanel2.default(),
    CodePanel = new _CodePanel2.default(),
    Preview = new _Preview2.default(),
    PublishObj = new _Publish2.default();
// 获取各模块React组件
var HeaderDom = Header.getComponent(),
    WidgetsDom = Widgets.getComponent(),
    SceneDom = Scene.getComponent(),
    SizePanelDom = SizePanel.getComponent(),
    ExteriorDom = Exterior.getComponent(),
    PagesDom = Pages.getComponent(),
    PageProDom = PagePro.getComponent(),
    PropertyDom = Property.getComponent(),
    HierarchyDown = Hierarchy.getComponent(),
    OperateBtnsDom = OperateBtns.getComponent(),
    CodePanelDom = CodePanel.getComponent(),
    PreviewDom = Preview.getComponent(),
    PublishDom = PublishObj.getComponent();

var App = _react2.default.createClass({
    mixins: [_reactRouter2.default.State],
    getInitialState: function getInitialState() {
        return {
            title: 'C-Life'
        };
    },
    componentDidMount: function componentDidMount() {
        var work = this.getParams().work;
        var key = this.getParams().key;
        if (work === 'new') {
            _Actions.Actions.loadStoreData(0, key);
        } else if (work === 'edit') {
            _Actions.Actions.loadStoreData(key);
        }
    },
    handleBodyClick: function handleBodyClick(e) {
        if (e.target.className.indexOf('main-view') < 0 && !e.target.closest('.size-view, .exterior-view,.hierarchy-view ,.property-view, .operate-wrap .select-list, .codepanel-wrap')) {
            _Actions.Actions.selectUserWidget(-1); // 取消控件选中状态
        }
    },
    handlerPublishClick: function handlerPublishClick() {
        this.setState({
            publish: true
        });
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            _extends({ className: 'app-body', onClick: this.handleBodyClick }, new _Drag.DragClass().events()),
            _react2.default.createElement(OperateBtnsDom, { publishFun: this.handlerPublishClick }),
            _react2.default.createElement(
                'section',
                { className: 'main-view' },
                _react2.default.createElement(
                    'section',
                    { className: 'left-view' },
                    _react2.default.createElement(
                        'div',
                        { className: 'pages-view' },
                        _react2.default.createElement(PagesDom, null)
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'header' },
                        '\u5DE5\u5177'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'widgets-view', style: { height: document.body.clientHeight - 332 + 'px' } },
                        _react2.default.createElement(WidgetsDom, null)
                    )
                ),
                _react2.default.createElement(SceneDom, null),
                _react2.default.createElement(
                    'section',
                    { className: 'right-view' },
                    _react2.default.createElement(
                        'div',
                        { className: 'right-view-scroll' },
                        _react2.default.createElement(
                            'div',
                            { className: 'property-view', id: 'property-view' },
                            _react2.default.createElement(PageProDom, null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'property-view', id: 'property-view' },
                            _react2.default.createElement(PropertyDom, null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'exterior-view', id: 'exterior-view' },
                            _react2.default.createElement(ExteriorDom, null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'size-view', id: 'size-view' },
                            _react2.default.createElement(SizePanelDom, null)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'hierarchy-view' },
                        _react2.default.createElement(HierarchyDown, null)
                    )
                )
            ),
            _react2.default.createElement(CodePanelDom, null),
            _react2.default.createElement(PreviewDom, null),
            this.state.publish ? _react2.default.createElement(PublishDom, null) : null
        );
    }
});

// 定义路由
var Routes = _react2.default.createElement(
    _reactRouter.Route,
    { name: 'app', path: '/' },
    _react2.default.createElement(_reactRouter.Route, { name: 'devlop', path: '/develop/:work/:key', handler: App }),
    _react2.default.createElement(_reactRouter.Route, { name: 'preview', path: '/preview', handler: PreviewDom }),
    _react2.default.createElement(_reactRouter.Route, { name: 'publish', path: '/publish', handler: PublishDom })
);

Comm.domReady(function () {
    _reactRouter2.default.run(Routes, _reactRouter2.default.HashLocation, function (Root) {
        _react2.default.render(_react2.default.createElement(Root, null), document.body);
    });
});
document.addEventListener('keydown', function (e) {
    return _Hotkeys.Hotkeys.capture(e);
});