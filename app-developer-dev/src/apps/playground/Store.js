'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * @type {store}
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = undefined;

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('./Actions');

var _Widgets = require('../../modules/WidgetsPanel/Widgets.class');

var _OperationHistory = require('../../modules/OperationHistory/OperationHistory');

var _MakeHtml = require('../../modules/MakeHtml/MakeHtml');

var _app = require('../../config/app.config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 配置信息


// 仓储数据模型
// 操作历史记录类
var STORE_DATA = {
    title: '',
    operateBtns: {},
    previewUrl: '',
    widgets: {},
    protocolConfigs: [{
        typeName: '控制数据',
        type: 2,
        propertyConfigs: null
    }, {
        typeName: '运行数据',
        type: 3,
        propertyConfigs: null
    }],
    ghost: {},
    assets: {},
    phone: { height: 667, minHeight: 667 },
    panelSwitch: { sizePanelSwitch: 1, exteriorPanelSwitch: 1, propertyPanelSwitch: 1, codePanelSwitch: 2, snapLineSwitch: 1 },
    pages: {
        activePage: 0,
        activeWidget: -1,
        activeWidgetGridChild: -1, //九宫格当前宫格
        activeWidgetChild: -1, //选项卡里的选项index（儿子）
        activeWidgetGrandchild: -1, //对应选项里的控件index（孙子）
        pageList: [{ pageName: '主页', pageId: 0, widgetList: [] }]
    }
};

/**
 * 
 * @return   {object}   返回当前选中控件
 * tab=1 链接到当前选项卡 空
 */
/**
 * 链接到当前页面的当前选中控件（可读可写）
 * @param  {[type]} tab [不为空链接到当前选项卡，为空时链接到当前选中的控件]
 * @return {[type]}     [description]
 * 
 */
// 控件面板的控件处理类
var linkActiveWidget = function linkActiveWidget(tab, grid) {

    var widget = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList[STORE_DATA.pages.activeWidget];
    var activeWidgetChild = STORE_DATA.pages.activeWidgetChild,
        activeWidgetGridChild = STORE_DATA.pages.activeWidgetGridChild,
        activeWidgetGrandchild = STORE_DATA.pages.activeWidgetGrandchild;
    if (activeWidgetChild > -1 && activeWidgetGrandchild > -1 && widget.widgetListItem && !tab) {
        widget = widget.widgetListItem[activeWidgetChild][activeWidgetGrandchild];
    }
    if (grid || grid == 0) {
        //宫格
        widget.gridChildList = widget.gridChildList ? widget.gridChildList : [];
        widget = widget.gridChildList[grid];
    }

    if (typeof widget !== 'undefined') widget.unsaved = true; // 设置保存状态
    return widget;
};

/**
 * 计算传入的字符真实长度
 * @return {Number} 返回传入的字符的真实长度
 */
var calcRealLength = function calcRealLength(caption) {
    var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

    var span = document.getElementById("__getwidth");
    if (span == null) {
        span = document.createElement("span");
        span.id = "__getwidth";
        document.body.appendChild(span);
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
    }
    span.innerText = caption;
    span.style.fontSize = fontSize + "px";
    return span.offsetWidth;
};

/**
 * 计算传入的字符真实长度
 * @return {Number} 返回传入的字符的真实长度
 */
var calcRealHeight = function calcRealHeight(caption) {
    var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;

    var textarea = document.getElementById("__getheight");
    if (textarea == null) {
        textarea = document.createElement("textarea");
        textarea.id = "__getheight";
        document.body.appendChild(textarea);
        textarea.style.resize = 'none';
        textarea.style.visibility = "hidden";
        textarea.style.boxSizing = 'border-box';
    }
    textarea.value = caption;
    textarea.style.fontSize = fontSize + "px";
    return textarea.scrollHeight;
};

/**
 * 深拷贝
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */

var deepcopy = function deepcopy(o) {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepcopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        var n = new Function("return " + o.toString())();
        return n;
    } else if (o instanceof Object) {
        var n = {};
        for (var i in o) {
            n[i] = deepcopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
};

var Store = exports.Store = _reflux2.default.createStore({
    listenables: [_Actions.Actions],
    onLoadStoreData: function onLoadStoreData(projectId) {
        var _this2 = this;

        var productId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (projectId) {
            // 编辑模式
            fetch(_app.URI.getProject + '?projectId=' + projectId, { credentials: 'include' }).then(function (response) {
                return response.json();
            }).then(function (_ref) {
                var data = _ref.data;

                productId = productId ? productId : data.productId;
                STORE_DATA.projectId = projectId;
                STORE_DATA.title = data.projectName;
                STORE_DATA.remark = data.remark;
                STORE_DATA.productId = data.productId;
                STORE_DATA.pages.pageList = JSON.parse(data.pageConfigs) || [{ pageName: '主页', pageId: 0, widgetList: [] }];
                (data.widgetConfigs || []).forEach(function (widget) {
                    try {
                        STORE_DATA.pages.pageList[widget.pageNo || 0].widgetList.push(_Widgets.Widgets.parseUserWidget(widget));
                    } catch (e) {}
                });
                return fetch(_app.URI.getProtoConfig + '?productId=' + productId, { credentials: 'include' });
            }).then(function (response) {
                return response.json();
            }).then(function (_ref2) {
                var data = _ref2.data;

                STORE_DATA.protocolConfigs = data.protocolConfigs;
                document.querySelector('#systemTitle').innerText = data.productName;
                _OperationHistory.OH.push(STORE_DATA);
                _this2.trigger(STORE_DATA);
                return fetch(_app.URI.getWidgetStyleList, { credentials: 'include' }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    STORE_DATA.widgetStyleList = {};
                    var obj = STORE_DATA.widgetStyleList;
                    if (data.code == 0 && data.data instanceof Array) {
                        data.data.map(function (item, index) {
                            obj[item.code] = item.styleList;
                            // let styleList = item.styleList;
                            // styleList instanceof Array && styleList.map((style,i)=>{
                            //   style.url = style.url.replace(/https/,"http");
                            //   if(location.host == 'open.clife.net' || location.host == 'open.clife.cn'){
                            //     style.url = style.url.replace(/\/group/,":8080/group");
                            //   }else if(location.host == 'test.cms.clife.cn'){
                            //     style.url = style.url.replace(/\/group/,":8080/group");
                            //   }else{
                            //     style.url = style.url.replace(/\/group/,":8981/group");
                            //   }
                            // });
                            // obj[item.code] = styleList;
                        });
                        _this2.trigger(STORE_DATA);
                        sessionStorage.setItem('styleList', JSON.stringify(obj));
                    } else {
                        console.log('请求控件样式列表数据错误');
                    }
                    return fetch(_app.URI.getPicList + '?type=1', { credentials: 'include' }).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        STORE_DATA.picList = data.data;
                        _this2.trigger(STORE_DATA);
                    });
                });
            });
        } else {
            // 新建模式
            fetch(_app.URI.getProtoConfig + '?productId=' + productId, { credentials: 'include' }).then(function (response) {
                return response.json();
            }).then(function (_ref3) {
                var data = _ref3.data;

                STORE_DATA.title = data.productName;
                STORE_DATA.productId = data.productId;
                STORE_DATA.protocolConfigs = data.protocolConfigs;
                _OperationHistory.OH.push(STORE_DATA);
                _this2.trigger(STORE_DATA);
                _this2.onSaveProject();
            });
        }
    },
    onSaveProject: function onSaveProject() {
        var formData = new FormData();
        var pageConfigs = STORE_DATA.pages.pageList.map(function (page) {
            return { pageName: page.pageName, pageId: page.pageId, widgetList: [], pageColor: page.pageColor,
                pageBgUrl: page.pageBgUrl, bgHeight: page.bgHeight, bgHeightType: page.bgHeightType };
        });
        if (STORE_DATA.projectId) {
            // 编辑模式需提交projectId
            formData.append('projectId', STORE_DATA.projectId);
        }
        formData.append('projectName', STORE_DATA.title);
        formData.append('productId', STORE_DATA.productId);
        formData.append('pageConfigs', JSON.stringify(pageConfigs));
        formData.append('remark', STORE_DATA.remark || '');

        fetch(_app.URI.saveProject, { method: 'post', body: formData, credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (_ref4) {
            var data = _ref4.data;
            return STORE_DATA.projectId = data.projectId;
        });
        this.onSaveWidgets();
    },
    onMakeHtml: function onMakeHtml() {
        var _this3 = this;

        var preview = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var html = new _MakeHtml.MakeHtml(STORE_DATA);
        var formData = new FormData();
        var api = preview ? _app.URI.previewProject : _app.URI.publishProject;
        formData.append('projectId', STORE_DATA.projectId);
        formData.append('productId', STORE_DATA.productId);
        formData.append('projectName', STORE_DATA.title);
        formData.append('remark', STORE_DATA.remark || '');
        formData.append('htmlText', html.getHtml());

        fetch(api, { method: 'post', body: formData, credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (_ref5) {
            var data = _ref5.data;

            if (preview) {
                var Arr = data.previewUrl.split(":");
                var previewUrl = Arr.length > 2 ? "https:" + Arr[1] + Arr[2].substring(4) : data.previewUrl;
                STORE_DATA.previewUrl = previewUrl;
                _this3.trigger(STORE_DATA);
            } else {
                alert('发布成功！');
                if (location.host == 'open.clife.net' || location.host == 'open.clife.cn') {
                    location.href = "http://" + location.host + '/#/mainpage/deviceinfo/productdesign?productId=' + STORE_DATA.productId;
                } else if (location.host == 'test.cms.clife.cn') {
                    location.href = "http://" + location.host + '/pre-wCloud-v2/#/mainpage/deviceinfo/productdesign?productId=' + STORE_DATA.productId;
                } else {
                    location.href = "http://" + location.host + '/wCloud_v2/#/mainpage/deviceinfo/productdesign?productId=' + STORE_DATA.productId;
                }
            }
        });
    },
    onPublishProject: function onPublishProject(title, remark) {
        STORE_DATA.title = title;
        STORE_DATA.remark = remark;
        this.onSaveProject();
        this.onMakeHtml();
    },
    onSaveWidgets: function onSaveWidgets() {
        var _this4 = this;

        var widgetIndex = 1;
        STORE_DATA.pages.pageList.forEach(function (page, index) {
            return page.widgetList.forEach(function (w) {
                if (w.unsaved) {
                    _this4.onSaveWidget(w, index, widgetIndex);
                    widgetIndex += 1;
                }
            });
        });
    },
    onSaveWidget: function onSaveWidget(widget) {
        var pageIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var widgetIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        var formData = new FormData();
        widget.unsaved = false;
        formData.append('projectId', STORE_DATA.projectId);
        widget.widgetId && formData.append('widgetId', widget.widgetId);
        formData.append('widgetName', widget.caption);
        formData.append('widgetProperties', _Widgets.Widgets.stringifyUserWidget(widget));
        formData.append('html', widget.htmlCode || '');
        formData.append('js', widget.jsCode || '');
        formData.append('css', widget.cssCode || '');
        formData.append('widgetIndex', widgetIndex);
        formData.append('pageNo', pageIndex);
        formData.append('widgetInfo', widget.widgetInfo || {});
        fetch(_app.URI.saveWidget, { method: 'post', body: formData, credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (_ref6) {
            var data = _ref6.data;
            return widget.widgetId = data.widgetId;
        });
    },
    onChangePage: function onChangePage(index) {
        if (index == 0) STORE_DATA.pages.pageList[index].pageId = 0;
        STORE_DATA.pages.activePage = index;
        STORE_DATA.pages.activeWidget = -1;
        STORE_DATA.ghost.display = false;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onDeletePage: function onDeletePage(index) {
        if (STORE_DATA.pages.pageList.length <= 1) return;
        if (STORE_DATA.pages.pageList[index].widgetList instanceof Array) {
            var widgetDelId = '';
            var arrLength = STORE_DATA.pages.pageList[index].widgetList.length;
            STORE_DATA.pages.pageList[index].widgetList.map(function (item, i) {
                if (i == arrLength - 1) {
                    widgetDelId = widgetDelId + item.widgetId;
                } else {
                    widgetDelId = widgetDelId + item.widgetId + ',';
                }
            });
            if (widgetDelId) {
                fetch(_app.URI.delWidgetList + '?widgetId=' + widgetDelId, { credentials: 'include' }).then(function (response) {
                    return response.json();
                }).then(function (data) {});
            }
        }
        STORE_DATA.pages.pageList.splice(index, 1);
        STORE_DATA.pages.activePage = 0;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onCreatePage: function onCreatePage(index, page, type) {
        if (STORE_DATA.pages.pageList[index + 1] !== page && type !== 'copy') {
            STORE_DATA.pages.pageList.splice(index + 1, 0, page);
        } else if (type === 'copy') {
            STORE_DATA.pages.pageList.push(page);
        }
        STORE_DATA.pages.activePage = index + 1;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onRenamePage: function onRenamePage(index, name) {
        STORE_DATA.pages.pageList[index].pageName = name;
        STORE_DATA.pages.activePage = index;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangePageBg: function onChangePageBg(index, type, value) {
        STORE_DATA.pages.pageList[index][type] = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onAddUserWidget: function onAddUserWidget(item, gridArr) {
        var list = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList;
        var activeWidgetChild = STORE_DATA.pages.activeWidgetChild;
        var activeWidgetGridChild = STORE_DATA.pages.activeWidgetGridChild;
        if (item.width == 375 || item.left < 0) item.left = 0;
        if (Number(item.left) + Number(item.width) > 375) item.left = 375 - item.width;
        if (Number(item.top) + Number(item.height) > STORE_DATA.phone.height) STORE_DATA.phone.height = Number(item.top) + Number(item.height);
        if (item.id == 1016 || item.id == 1015) item.left = 25;

        if (activeWidgetChild > -1) {
            // activeWidgetChild > -1 即选项卡编辑状态
            var widget = linkActiveWidget(1);
            if (item.top > widget.top + widget.height || item.top < widget.top) {
                list.push(item);
                this.onSelectUserWidget(list.length - 1, { top: item.top, left: item.left, width: item.width, height: item.height });
            } else {
                var tabList = widget.widgetListItem[activeWidgetChild]; //当前选项-- 控件集合
                item.tabName = '选项';
                item.parent = STORE_DATA.pages.activeWidget.toString();
                item.tabIndex = activeWidgetChild;
                item.tabChildIndex = tabList.length;
                tabList.push(item);

                this.onSelectUserWidget(STORE_DATA.pages.activeWidget, {
                    width: item.width,
                    height: item.height,
                    top: item.top,
                    left: item.left
                }, activeWidgetChild, tabList.length - 1);
            }
        } else if (item.id == 1020) {
            list.push(item);
            for (var i = 0; i < item.gridChildList.length; i++) {
                item.gridChildList[i].parent = list.length - 1;
            }
            this.onSelectUserWidget(list.length - 1, {
                top: item.top,
                left: item.left,
                height: item.height
            });
        } else {
            list.push(item);
            this.onSelectUserWidget(list.length - 1, {
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height
            });
        }
        _OperationHistory.OH.push(STORE_DATA);
    },
    onSelectUserWidget: function onSelectUserWidget(index) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var childIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        var grandchildIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
        var gridChildIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;

        var widget = void 0;
        STORE_DATA.pages.activeWidget = index;
        STORE_DATA.pages.activeWidgetChild = childIndex > -1 ? childIndex : -1;
        STORE_DATA.pages.activeWidgetGrandchild = grandchildIndex > -1 ? grandchildIndex : -1;
        STORE_DATA.pages.activeWidgetGridChild = gridChildIndex > -1 ? gridChildIndex : -1;

        if (grandchildIndex > -1 && childIndex > -1) {
            widget = linkActiveWidget(1);
            widget = widget.widgetListItem[childIndex][grandchildIndex];
        } else if (gridChildIndex > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }

        sessionStorage.setItem('activeWidget', widget ? widget.userWidgetID : '');

        if (data) {
            STORE_DATA.ghost = Object.assign({ display: true, width: widget.width, height: widget.height }, data);
            STORE_DATA.ghost.dragable = widget.id === 1008 || widget.id === 1014 || widget.id === 1020 ? false : true;

            if (widget.id === 1020 && gridChildIndex < 0) {
                if (data.height) data.height = data.height + 20;
                STORE_DATA.ghost = Object.assign({ display: true, width: widget.width, height: widget.height + 20 }, data);
            }

            if (widget.id === 1009) {
                if (data.top) data.top = data.top - 10;
                if (data.height) data.height = data.height + 20;
                STORE_DATA.ghost = Object.assign({ display: true, width: widget.width, height: widget.height + 20 }, data);
            }

            if (widget.id === 1010) {
                if (data.left) data.left = data.left - 10;
                if (data.width) data.width = data.width + 20;
                STORE_DATA.ghost = Object.assign({ display: true, width: widget.width + 20, height: widget.height }, data);
            }

            if (widget.id === 1005 && widget.width == '375') {
                STORE_DATA.ghost.dragable = false;
            }
            widget.widgetInfo = widget.widgetInfo ? widget.widgetInfo : {};
            widget.widgetInfo.dragStatus = widget.widgetInfo.dragStatus ? widget.widgetInfo.dragStatus : {
                top: true,
                bottom: true,
                left: true,
                right: true,
                changeWidth: true,
                changeHeight: true
            };
            var dragStatus = widget.widgetInfo.dragStatus;
            STORE_DATA.ghost.dragStatus = dragStatus;
        } else {
            STORE_DATA.ghost.display = false;
        }

        this.trigger(STORE_DATA);
    },
    onMoveUserWidget: function onMoveUserWidget(x, y) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;

        var top = Number(STORE_DATA.ghost.top) + Number(y),
            left = Number(STORE_DATA.ghost.left) + Number(x),
            dragStatus = STORE_DATA.ghost.dragStatus;

        if (widget.id == 1019) {
            //tab跟随移动
            var widgetListItem = widget.widgetListItem;
            for (var i = 0; i < widgetListItem.length; i++) {
                for (var j = 0; j < widgetListItem[i].length; j++) {
                    widgetListItem[i][j].top = Number(widgetListItem[i][j].top) + Number(y);
                }
            }
        }

        if (widget.id == 1020 && STORE_DATA.pages.activeWidgetGridChild < 0) {
            //九宫格子宫格跟随移动
            for (var _i = 0; _i < widget.gridChildList.length; _i++) {
                widget.gridChildList[_i].top = widget.gridChildList[_i].top + y;
            }
        }

        if (dragStatus.left) {
            widget.left = STORE_DATA.ghost.left = left;
            if (widget.id == 1010) {
                widget.left = left + 10;
            }
        }

        if (dragStatus.top) {
            widget.top = STORE_DATA.ghost.top = top;
            if (widget.id == 1009) {
                widget.top = top + 10;
            }
        }

        this.trigger(STORE_DATA);
    },
    onResizeUserWidget: function onResizeUserWidget(offsetTop, offsetLeft, offsetWidth, offsetHeight) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined' || widget.id === 1008 || widget.id === 1014) return;
        var dragStatus = widget.widgetInfo.dragStatus;

        if (widget.width + offsetWidth > 1) {
            if (dragStatus.changeWidth) {
                var left = Number(STORE_DATA.ghost.left) + Number(offsetLeft);
                var width = Number(STORE_DATA.ghost.width) + Number(offsetWidth);
                widget.left = STORE_DATA.ghost.left = left;
                widget.width = STORE_DATA.ghost.width = width;

                if (widget.id == 1010) {
                    widget.width = width - 20;
                    widget.left = left + 10;
                }
            }

            if (widget.isRatio == 1 && dragStatus.changeHeight) {
                var height = Number(widget.width + offsetWidth) * Number(widget.height) / Number(widget.width);
                widget.height = height;
                STORE_DATA.ghost.height = height;
                if (widget.id == 1009) {
                    widget.height = height - 20;
                }
            }
        }
        if (widget.height + offsetHeight > 1) {
            if (dragStatus.changeHeight) {
                var top = Number(STORE_DATA.ghost.top) + Number(offsetTop);
                var _height = Number(STORE_DATA.ghost.height) + Number(offsetHeight);

                widget.top = STORE_DATA.ghost.top = top;

                widget.height = STORE_DATA.ghost.height = _height;

                if (widget.id == 1009) {
                    widget.top = top + 10;
                    widget.height = _height - 20;
                }
            }

            if (widget.isRatio == 1 && dragStatus.changeWidth) {
                var _width = Number(widget.height + offsetHeight) * Number(widget.width) / Number(widget.height);
                widget.width = STORE_DATA.ghost.width = _width;
                if (widget.id == 1010) {
                    widget.width = _width - 20;
                }
            }
        }
        this.trigger(STORE_DATA);
    },
    onChangeFgColor: function onChangeFgColor(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.fgColor = value;
        this.trigger(STORE_DATA);
    },
    onChangeBorderColor: function onChangeBorderColor(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.borderColor = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeBgColor: function onChangeBgColor(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.bgColor = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeWidgetOpacity: function onChangeWidgetOpacity(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.widgetOpacity = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeBorderWidth: function onChangeBorderWidth(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        if (Number(value) > Number(widget.height) / 2) value = parseInt(widget.height) / 2;
        widget.borderWidth = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeExterior: function onChangeExterior(type, value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget[type] = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onShowPanel: function onShowPanel(type) {
        switch (type) {
            case 'sizePanel':
                STORE_DATA.panelSwitch.sizePanelSwitch = STORE_DATA.panelSwitch.sizePanelSwitch == 1 ? 2 : 1;
                break;
            case 'exteriorPanel':
                STORE_DATA.panelSwitch.exteriorPanelSwitch = STORE_DATA.panelSwitch.exteriorPanelSwitch == 1 ? 2 : 1;
                break;
            case 'propertyPanel':
                STORE_DATA.panelSwitch.propertyPanelSwitch = STORE_DATA.panelSwitch.propertyPanelSwitch == 1 ? 2 : 1;
                break;
            case 'codePanel':
                STORE_DATA.panelSwitch.codePanelSwitch = STORE_DATA.panelSwitch.codePanelSwitch == 1 ? 2 : 1;
                break;
            case 'snapLine':
                STORE_DATA.panelSwitch.snapLineSwitch = STORE_DATA.panelSwitch.snapLineSwitch == 1 ? 2 : 1;
                break;
            case 'rightPanel':
                STORE_DATA.panelSwitch.sizePanelSwitch = STORE_DATA.panelSwitch.sizePanelSwitch == 1 ? 2 : 1;
                STORE_DATA.panelSwitch.exteriorPanelSwitch = STORE_DATA.panelSwitch.exteriorPanelSwitch == 1 ? 2 : 1;
                STORE_DATA.panelSwitch.propertyPanelSwitch = STORE_DATA.panelSwitch.propertyPanelSwitch == 1 ? 2 : 1;
                break;
            case "preview":
                STORE_DATA.previewUrl = null;
                this.trigger(STORE_DATA);
                break;
            default:
                ;
        }
        this.trigger(STORE_DATA);
    },
    onResizeCanvas: function onResizeCanvas(value) {
        STORE_DATA.phone.height = STORE_DATA.phone.height + value > STORE_DATA.phone.minHeight ? STORE_DATA.phone.height + value : STORE_DATA.phone.minHeight;
        this.trigger(STORE_DATA);
    },
    drawSelectCover: function drawSelectCover(display, top, left, width, height) {
        STORE_DATA.selectCover = { display: display, top: top, left: left, width: width, height: height };
        this.trigger(STORE_DATA);
    },
    onDelUserWidget: function onDelUserWidget() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

        var widget = void 0;
        index = index === -1 ? STORE_DATA.pages.activeWidget : index;
        var childIndex = STORE_DATA.pages.activeWidgetChild;
        var grandchildIndex = STORE_DATA.pages.activeWidgetGrandchild;
        if (index < 0) return; // 当前无控件被选中
        /*选项卡 控件删除本地维护*/
        if (childIndex != -1) {
            widget = linkActiveWidget(1);
            var widgetListItem = widget.widgetListItem;
            if (grandchildIndex != -1) {
                //删除 指定选项的指定控件
                widgetListItem[childIndex].splice(grandchildIndex, 1);
            } else if (grandchildIndex == -1) {
                //删除指定选项
                if (widgetListItem.length == 1) {
                    //选项剩1个时 置空
                    widgetListItem.splice(childIndex, 1, []);
                } else {
                    widgetListItem.splice(childIndex, 1);
                }
            }
            STORE_DATA.pages.activeWidgetChild = -1;
            STORE_DATA.pages.activeWidgetGrandchild = -1;
        } else {
            widget = linkActiveWidget();
            widget.widgetId && fetch(_app.URI.delWidget + '?widgetId=' + widget.widgetId, { credentials: 'include' }); // 从服务器删除
            STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList.splice(index, 1);
        }
        /*删除操作后 选项卡 控件索引值重置维护*/
        STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList.map(function (widget, i) {
            if (widget.id === 1019) {
                widget.widgetListItem.map(function (tab, j) {
                    tab.map(function (tabChild, k) {
                        tabChild.parent = i;
                        tabChild.tabIndex = j;
                        tabChild.tabChildIndex = k;
                    });
                });
            }
        });

        STORE_DATA.pages.activeWidget = -1;
        STORE_DATA.ghost.display = false;
        _OperationHistory.OH.push(STORE_DATA);
        this.trigger(STORE_DATA);
    },
    onAddProperty: function onAddProperty() {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        var multi = typeof widget.scheme !== 'undefined' ? widget.scheme.find(function (s) {
            return (/^multi/.test(s)
            );
        }) : '';
        var len = multi.indexOf('multi') > -1 ? multi.match(/\[(\d+)\]/)[1] : 0;
        if (len == 0 || widget.propertySet.length < len) {
            var newId = widget.propertySet.length + 1;
            var newproperty = JSON.parse(JSON.stringify(widget.propertySet[0]));
            newproperty.propertyId = newId;
            newproperty.statusVisibility = 2;
            widget.propertySet.push(newproperty);
        } else {
            return;
        }
        this.trigger(STORE_DATA);
    },
    onUploadBgImage: function onUploadBgImage(pid, formData, imgWidth, imgHeight) {
        var _this5 = this;

        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        fetch(_app.URI.uploadFile, { method: 'post', body: formData, credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (_ref7) {
            var data = _ref7.data;

            var Arr = data.fileUrl.split(":");
            var fileUrl = Arr.length > 2 ? "https:" + Arr[1] + Arr[2].substring(4) : data.fileUrl;
            widget.bgImagePath = fileUrl;
            widget.propertySet[0].statusSet[pid].bgImagePath = fileUrl;
            if (widget.propertySet[0].activeStatus === pid) {
                widget.height = STORE_DATA.ghost.height = Number(imgHeight);
                widget.width = STORE_DATA.ghost.width = Number(imgWidth);
            }
            _this5.trigger(STORE_DATA);
        });
    },
    onChangeBooleanProperty: function onChangeBooleanProperty(pid, typefield) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        widget.propertySet[0][typefield] = widget.propertySet[0][typefield] == 1 ? 2 : 1;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeStringProperty: function onChangeStringProperty(pid, typefield, newvalue) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        if (typefield == 'multipleText') {
            if (widget.id == 1001 || widget.id == 1005) {
                var fontSize = widget.id == 1001 ? 36 : 20;
                fontSize = widget.propertySet[0].fontSize || fontSize;
                var nowLength = calcRealLength(newvalue, fontSize);
                nowLength = nowLength + 2 * fontSize < widget.width ? widget.width : nowLength + 2 * fontSize;
                widget.width = STORE_DATA.ghost.width = nowLength;
                widget.propertySet[0].multipleText = newvalue;
            }
            if (widget.id == 1002) {
                var _fontSize = widget.propertySet[0].fontSize || 16;
                var _nowLength = calcRealHeight(newvalue, _fontSize);
                _nowLength = Number(_nowLength) < 42 ? 58 : Number(_nowLength) + Number(_fontSize);
                _nowLength = _nowLength < widget.height ? widget.height : _nowLength;
                widget.height = STORE_DATA.ghost.height = _nowLength;
                widget.propertySet[0].multipleText = newvalue;
            }
            if (widget.id == 1020) {
                widget.gridChildList[STORE_DATA.pages.activeWidgetGridChild].editText = newvalue;
            }
            widget.editText = newvalue;
        }
        widget.propertySet[0][typefield] = newvalue;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeEventType: function onChangeEventType(pid, eventType) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }

        if (typeof widget === 'undefined') return;
        widget.propertySet[0].eventSet[pid].eventType = eventType;
        widget.propertySet[0].eventSet[pid].updateFlag = undefined;
        widget.propertySet[0].eventSet[pid].eventField = '';
        widget.propertySet[0].eventSet[pid].eventValue = '';

        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeField: function onChangeField(property, pid, typeid, options, byteLength, timetype) {
        //property为被选中的字段属性 pid为属性id(用于多个属性时区分) typeid为相应type(控制/运行/故障/设备数据)
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }

        var type = STORE_DATA.protocolConfigs.sort(function (a, b) {
            return b.type - a.type;
        })[typeid].type;
        if (typeof widget === 'undefined') return;
        switch (type) {
            case 2:
                if (widget.id == 1014 && timetype == 'colortype') {
                    widget.propertySet[0].eventSet[pid].colorType = property;
                    this.trigger(STORE_DATA);
                    _OperationHistory.OH.push(STORE_DATA);
                    return;
                }
                if ((widget.id == 1011 || widget.id == 1014) && timetype) {
                    widget.propertySet[0].eventSet[pid][timetype + 'Set'] = {
                        field: property,
                        updateFlag: options === null ? undefined : options,
                        byteLength: byteLength || 0,
                        eventValue: ''
                    };
                } else {
                    widget.propertySet[0].eventSet[pid].eventField = property;
                    widget.propertySet[0].eventSet[pid].updateFlag = options === null ? undefined : options;
                    widget.propertySet[0].eventSet[pid].byteLength = byteLength || 0;
                    widget.propertySet[0].eventSet[pid].eventValue = '';
                }
                break;
            case 3:
                if (timetype === 'hour') widget.propertySet[0].statusSet[pid].hourField = property;
                if (timetype === 'minute') widget.propertySet[0].statusSet[pid].minuteField = property;
                widget.propertySet[0].statusSet[pid].statusField = property;
                widget.propertySet[0].statusSet[pid].statusValue = options || '';
                break;
            default:
                ;
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeValue: function onChangeValue(pid, typeid, svalue) {
        //pid,typeid同上 svalue为用户选中/输入值
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        var type = STORE_DATA.protocolConfigs.sort(function (a, b) {
            return b.type - a.type;
        })[typeid].type;
        if (typeof widget === 'undefined') return;
        switch (type) {
            case 2:
                if (!widget.propertySet[0].eventSet[pid].eventField) return;
                widget.propertySet[0].eventSet[pid].eventValue = svalue;
                break;
            case 3:
                if (!widget.propertySet[0].statusSet[pid].statusField) return;
                widget.propertySet[0].statusSet[pid].statusValue = svalue;
                break;
            default:
                ;
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeCheckedPage: function onChangeCheckedPage(pid, pageId) {
        //pid为属性id(用于多个属性时区分),pageId为被选中的页面的Id
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }

        if (typeof widget === 'undefined') return;
        widget.propertySet[0].eventSet[pid].checkedPageId = pageId;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeSize: function onChangeSize(type, value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        if (widget.id == 1005) {
            widget.widgetInfo.dragStatus = {
                top: true,
                bottom: true,
                left: true,
                right: true,
                changeWidth: true,
                changeHeight: true
            };
        }
        var dragStatus = widget.widgetInfo.dragStatus;

        switch (type) {
            case 'x':
                if (dragStatus.left) {
                    widget.left = STORE_DATA.ghost.left = value;
                }
                break;
            case 'y':
                if (dragStatus.top) {
                    widget.top = value;
                    STORE_DATA.ghost.top = value;
                }

                break;
            case 'width':
                if (widget.id === 1008 || widget.id === 1014) return;
                if (widget.id === 1005 && parseInt(value) > 375) value = 375;

                if (widget.isRatio == 1) {
                    var height = Number(value) * Number(widget.height) / Number(widget.width);
                    if (dragStatus.changeHeight) {
                        widget.height = height;
                        STORE_DATA.ghost.height = height;
                    }
                }
                if (dragStatus.changeWidth) {
                    widget.width = STORE_DATA.ghost.width = value;
                    if (widget.id === 1010) {
                        STORE_DATA.ghost.width = value + 20;
                        STORE_DATA.ghost.left = STORE_DATA.ghost.left - 10;
                    };
                }

                if (widget.id === 1005 && parseInt(value) == 375) {
                    widget.widgetInfo.dragStatus = {
                        top: true,
                        bottom: true,
                        left: false,
                        right: true,
                        changeWidth: false,
                        changeHeight: false
                    };
                }

                break;
            case 'height':
                if (widget.id === 1008 || widget.id === 1014) return;
                if (widget.id === 1005 && widget.width == 375) return;
                if (widget.isRatio == 1) {
                    var width = Number(value) * Number(widget.width) / Number(widget.height);
                    if (dragStatus.changeWidth) {
                        widget.width = STORE_DATA.ghost.width = width;
                    }
                }
                if (dragStatus.changeHeight) {
                    widget.height = Number(value);
                    STORE_DATA.ghost.height = Number(value);
                    if (widget.id === 1009) {
                        STORE_DATA.ghost.height = value + 20;
                        STORE_DATA.ghost.top = STORE_DATA.ghost.top - 10;
                    };
                }
                if (widget.id === 1020) {
                    widget.height = Number(value);
                    STORE_DATA.ghost.height = value + 20;
                };

                break;
            case 'ratio':
                if (widget.id === 1008 || widget.id === 1014) return;
                widget.isRatio = widget.isRatio == 1 ? 2 : 1;
                break;
            case 'zIndex':
                widget.zIndex = value;
                break;
            default:
                ;
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onMarkCopyingUserWidget: function onMarkCopyingUserWidget() {
        // copy标记
        var widget = linkActiveWidget();
        widget._copying = true; // 准备复制
    },
    onPasteUserWidget: function onPasteUserWidget() {
        // 粘贴操作
        var list = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList,
            widget = linkActiveWidget(),
            newWidget = {};
        if (typeof widget === 'undefined' || !widget._copying) return; // 没有复制
        newWidget = JSON.parse(JSON.stringify(widget));
        newWidget.userWidgetID = _Widgets.Widgets.newUserWidgetID();
        newWidget.widgetId = null;
        newWidget.top = Number(newWidget.top) + 10;
        newWidget.left = Number(newWidget.left) + 10;
        this.onAddUserWidget(newWidget);
    },
    onUpZIndexUserWidget: function onUpZIndexUserWidget() {
        var widget = linkActiveWidget();
        widget.zIndex = widget.zIndex ? widget.zIndex + 1 : 1;
        _OperationHistory.OH.push(STORE_DATA);
        this.trigger(STORE_DATA);
    },
    onDownZIndexUserWidget: function onDownZIndexUserWidget() {
        var widget = linkActiveWidget();
        widget.zIndex = widget.zIndex !== undefined ? widget.zIndex - 1 : 0;
        _OperationHistory.OH.push(STORE_DATA);
        this.trigger(STORE_DATA);
    },
    onHistoryGo: function onHistoryGo(index) {
        var _this6 = this;

        _OperationHistory.OH.go(index).then(function (data) {
            Object.assign(STORE_DATA, data);
            _this6.trigger(STORE_DATA);
        });
    },
    onHistoryBack: function onHistoryBack() {
        var _this7 = this;

        _OperationHistory.OH.back().then(function (data) {
            Object.assign(STORE_DATA, data);
            _this7.trigger(STORE_DATA);
        });
    },
    onHistoryForward: function onHistoryForward() {
        var _this8 = this;

        _OperationHistory.OH.forward().then(function (data) {
            Object.assign(STORE_DATA, data);
            _this8.trigger(STORE_DATA);
        });
    },
    onHistoryPush: function onHistoryPush() {
        // 存储一条历史记录 非特殊情况不建议使用，建议写OH.push(STORE_DATA)
        _OperationHistory.OH.push(STORE_DATA);
    },
    onRefreshState: function onRefreshState() {
        this.trigger(STORE_DATA);
    },
    onChangeWidgetCode: function onChangeWidgetCode(type, code) {
        var activeWidget = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') {
            widget = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList[activeWidget];
            if (typeof widget === 'undefined') return;
        }
        switch (type) {
            case 'css':
                var copycode = code;
                if (code.indexOf(widget.userWidgetID) === -1) {
                    copycode = code.replace(/\.(.*)\{/, function (match, match2) {
                        //给css代码加上唯一的userWidgetID标识
                        widget.className = match2.replace(/\s/g, '') + widget.userWidgetID;
                        return '.' + widget.className + '{';
                    });
                }
                widget.cssCode = copycode;
                break;
        }
        // OH.push(STORE_DATA);
        this.trigger(STORE_DATA);
    },
    onChangeCommandType: function onChangeCommandType(pid, type) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.propertySet[0].eventSet[pid].commandType = type;
        widget.propertySet[0].eventSet[pid].checkedCommandList = [];
        widget.propertySet[0].eventSet[pid].commandConfigList = [];
        this.trigger(STORE_DATA);
    },
    onAddCheckedCommand: function onAddCheckedCommand(pid, property, updateFlag, byteLength) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        var event = widget.propertySet[0].eventSet[pid];
        widget.propertySet[0].eventSet[pid].checkedCommandList = typeof event.checkedCommandList === 'undefined' ? [] : event.checkedCommandList;
        widget.propertySet[0].eventSet[pid].commandConfigList = typeof event.commandConfigList === 'undefined' ? [] : event.commandConfigList;
        var obj = {};
        obj.field = property;
        obj.byteLength = byteLength;
        obj.updateFlag = updateFlag;
        widget.propertySet[0].eventSet[pid].checkedCommandList.push(property);
        widget.propertySet[0].eventSet[pid].commandConfigList.push(obj);
        this.trigger(STORE_DATA);
    },
    onDelCheckedCommand: function onDelCheckedCommand(pid, property) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        var index = Number(widget.propertySet[0].eventSet[pid].checkedCommandList.indexOf(property));
        widget.propertySet[0].eventSet[pid].checkedCommandList.splice(index, 1);
        widget.propertySet[0].eventSet[pid].commandConfigList.splice(index, 1);
        this.trigger(STORE_DATA);
    },
    onChangeWidgetCaption: function onChangeWidgetCaption(caption) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.caption = caption;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeWidgetTitle: function onChangeWidgetTitle(title) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.title = title;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onAddCheckedWidget: function onAddCheckedWidget(property, type, pid, wid) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined' || !property) return;
        if (type == 'show') {
            widget.propertySet[0].eventSet[pid].showWidgetList = typeof widget.propertySet[0].eventSet[pid].showWidgetList === 'undefined' ? [] : widget.propertySet[0].eventSet[pid].showWidgetList;
            widget.propertySet[0].eventSet[pid].showWidgetList.push(property);
            var set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
            set['index'] = 0;
            widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        } else if (type == 'hidden') {
            widget.propertySet[0].eventSet[pid].hiddenWidgetList = typeof widget.propertySet[0].eventSet[pid].hiddenWidgetList === 'undefined' ? [] : widget.propertySet[0].eventSet[pid].hiddenWidgetList;
            widget.propertySet[0].eventSet[pid].hiddenWidgetList.push(property);
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onDelCheckedWidget: function onDelCheckedWidget(property, type, pid, wid) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        if (type == 'show') {
            var index = Number(widget.propertySet[0].eventSet[pid].showWidgetList.indexOf(property));
            widget.propertySet[0].eventSet[pid].showWidgetList.splice(index, 1);
            var set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
            set['index'] = -1;
            widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        } else if (type == 'hidden') {
            var _index = Number(widget.propertySet[0].eventSet[pid].hiddenWidgetList.indexOf(property));
            widget.propertySet[0].eventSet[pid].hiddenWidgetList.splice(_index, 1);
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeWidgetText: function onChangeWidgetText(editText) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        if (widget.id == 1001 || widget.id == 1005) {
            var fontSize = widget.id == 1001 ? 36 : 20;
            fontSize = widget.propertySet[0].fontSize || fontSize;
            var nowLength = calcRealLength(editText, fontSize);
            nowLength = nowLength + 1 * fontSize < widget.width ? widget.width : nowLength + 1 * fontSize;
            widget.width = STORE_DATA.ghost.width = nowLength;
            widget.propertySet[0].multipleText = editText;
        }
        if (widget.id == 1002) {
            var _fontSize2 = widget.propertySet[0].fontSize || 16;
            var _nowLength2 = calcRealHeight(editText, _fontSize2);
            _nowLength2 = _nowLength2 < 42 ? 58 : _nowLength2 + _fontSize2;
            _nowLength2 = _nowLength2 < widget.height ? widget.height : _nowLength2;
            widget.height = STORE_DATA.ghost.height = _nowLength2;
            widget.propertySet[0].multipleText = editText;
        }
        widget.editText = editText;
        widget.propertySet[0].multipleText = editText;

        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onAddEvent: function onAddEvent(index, status) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        var newEvent = {
            eventType: 1,
            eventValue: '',
            activeStatusField: {},
            eventField: '',
            checkedPageId: '',
            hiddenWidgetList: [],
            showWidgetList: []
        };
        widget.propertySet[0].eventSet.push(newEvent);
        this.trigger(STORE_DATA);
        if (status === "false") {} else {
            _OperationHistory.OH.push(STORE_DATA);
        }
    },
    onDelEvent: function onDelEvent(index) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        if (widget.propertySet[0].eventSet.length <= 1) return;
        widget.propertySet[0].eventSet.splice(index, 1);
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onAddStatus: function onAddStatus(index, status) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }

        if (typeof widget === 'undefined') return;
        if (widget.id == 1008 && widget.propertySet[0].statusSet.length >= 2) return;
        var newStatus = { statusValue: '', statusField: '', bgImagePath: '', statusName: '' };
        widget.propertySet[0].statusSet.splice(index + 1, 0, newStatus);

        this.trigger(STORE_DATA);
        if (status === "false") {} else {
            _OperationHistory.OH.push(STORE_DATA);
        }
    },
    onDelStatus: function onDelStatus(index) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        if (widget.propertySet[0].statusSet.length <= 1) return;
        if (index === widget.propertySet[0].activeStatus) widget.propertySet[0].activeStatus = 0;

        widget.propertySet[0].statusSet.splice(index, 1);

        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeStatusName: function onChangeStatusName(pid, value, status) {
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'statusName';

        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        widget.propertySet[0].statusSet[pid][type] = value;
        this.trigger(STORE_DATA);
        if (status === "false") {} else {
            _OperationHistory.OH.push(STORE_DATA);
        }
    },
    onChangeStatusValue: function onChangeStatusValue(pid, value, wid, statusField, statusValue) {
        var widget = void 0;
        if (STORE_DATA.pages.activeWidgetGridChild > -1) {
            widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
        } else {
            widget = linkActiveWidget();
        }
        if (typeof widget === 'undefined') return;
        var set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
        set['index'] = value;
        set['statusField'] = statusField;
        set['statusValue'] = statusValue;
        widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        if (widget.propertySet[0].eventSet[pid].showWidgetList.indexOf(wid) < 0) {
            widget.propertySet[0].eventSet[pid].showWidgetList.push(wid);
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onAddTab: function onAddTab(index) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.widgetListItem.push([]);
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onDelTab: function onDelTab(index) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        if (widget.widgetListItem.length <= 1) return;
        // if(index === widget.propertySet[0].activeStatus) widget.propertySet[0].activeStatus=0;
        widget.widgetListItem.splice(index, 1);
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeTabName: function onChangeTabName(index, value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.widgetListItem[index].map(function (w, i) {
            w.tabName = value;
        });
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onSerializeTab: function onSerializeTab(index) {
        var widget = linkActiveWidget(1);
        if (typeof widget === 'undefined') return;
        var priorityTab = widget.widgetListItem[index];
        widget.widgetListItem.splice(index, 1);
        widget.widgetListItem.unshift(priorityTab);
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeWidgetInfo: function onChangeWidgetInfo(property, value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return false;

        if (widget.id == 1020) {
            //针对九宫格
            //九宫格 格子个数
            if (property == "row" || property == "column") {
                var oldNum = widget.widgetInfo.row * widget.widgetInfo.column;
                widget.widgetInfo[property] = value;
                var row = widget.widgetInfo.row,
                    column = widget.widgetInfo.column,
                    num = row * column;

                if (num > oldNum) {
                    for (var i = 0; i < Math.abs(num - oldNum); i++) {
                        var gridWidget = deepcopy(widget.gridTemplate);
                        gridWidget.userWidgetID = Date.parse(new Date()) + row + column + i;
                        gridWidget.parent = STORE_DATA.pages.activeWidget;
                        widget.gridChildList.push(gridWidget);
                    }
                } else {
                    widget.gridChildList.splice(-Math.abs(num - oldNum), Math.abs(num - oldNum));
                }

                for (var _i2 = 0; _i2 < num; _i2++) {
                    widget.gridChildList[_i2].height = widget.height / row;
                    widget.gridChildList[_i2].width = 375 / column;
                    if (row == 1) {
                        widget.gridChildList[_i2].left = 375 / column * _i2;
                        widget.gridChildList[_i2].top = widget.top + 10;
                    } else {
                        if (_i2 < column) {
                            widget.gridChildList[_i2].left = 375 / column * _i2;
                            widget.gridChildList[_i2].top = widget.top + 10;
                        } else {
                            widget.gridChildList[_i2].left = 375 / column * Math.abs(_i2 - column);
                            widget.gridChildList[_i2].top = widget.top + widget.gridChildList[_i2].height + 10;
                        }
                    }
                }
            }

            if (property == "speeddialStyle" || property == "speeddialShape" || property == "speeddialColor") {
                var _num = widget.gridChildList.length;
                for (var _i3 = 0; _i3 < _num; _i3++) {
                    widget.gridChildList[_i3].widgetInfo[property] = value;
                }
            }

            if (property == "gridStyle") {
                widget.gridChildList[STORE_DATA.pages.activeWidgetGridChild].widgetInfo[property] = value;
            }
            if (property == "gridIcon") {
                widget.gridChildList[STORE_DATA.pages.activeWidgetGridChild].widgetInfo[property] = value;
            }
        }
        widget.widgetInfo[property] = value;
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onChangeColorPickerType: function onChangeColorPickerType(value) {
        var widget = linkActiveWidget();
        if (typeof widget === 'undefined') return;
        widget.activeType = value;
        if (value == 0) {
            widget.width = STORE_DATA.ghost.width = 225;
            widget.height = STORE_DATA.ghost.height = 225;
        } else {
            widget.width = STORE_DATA.ghost.width = 375;
            widget.height = STORE_DATA.ghost.height = 30;
        }
        this.trigger(STORE_DATA);
        _OperationHistory.OH.push(STORE_DATA);
    },
    onSelectGrid: function onSelectGrid(num, row, column) {},
    onUploadPageImage: function onUploadPageImage(formData) {
        var _this9 = this;

        fetch(_app.URI.uploadFile, { method: 'post', body: formData, credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (_ref8) {
            var data = _ref8.data;

            STORE_DATA.activePictureUrl = data.fileUrl;
            _this9.trigger(STORE_DATA);
        });
    },
    onGetPicList: function onGetPicList() {
        var pageIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var pageRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

        var _this = this;
        fetch(_app.URI.getPicList + '?type=' + type + '&pageIndex=' + pageIndex + '&pageRows=' + pageRows, { credentials: 'include' }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (STORE_DATA.pages.activeWidgetGridChild > -1) {
                var widget = linkActiveWidget(-1, STORE_DATA.pages.activeWidgetGridChild);
                widget.picList = data.data;
                _this.trigger(STORE_DATA);
            } else {
                //其他
            }
        });
    }
});