'use strict';
// 导入模块
import React            from 'react';
import Router,{Route,Redirect} from 'react-router';
import {subscribe}      from '../../core/pubsub';
import * as Comm        from '../../modules/common'; // 公共函数模块
import HeaderPanel      from '../../modules/HeaderPanel/HeaderPanel'; // 头部面板
import WidgetsPanel     from '../../modules/WidgetsPanel/WidgetsPanel'; // 组件面板
import WidgetsSizePanel from '../../modules/WidgetsSizePanel/WidgetsSizePanel'; // 组件尺寸面板
import WidgetsExterior  from '../../modules/WidgetsExterior/WidgetsExterior'; // 组件外观面板
import WidgetsProperty  from '../../modules/WidgetsProperty/WidgetsProperty'; // 组件属性面板
import WidgetsHierarchy  from '../../modules/WidgetsProperty/WidgetsHierarchy'; // 层级，显示隐藏，等比缩放组件
import PagesManage      from '../../modules/PagesManage/PagesManage'; // 资产（页面列表）面板
import PageProperty     from '../../modules/PagesManage/PageProperty'; // 页面属性面板
import OperateBtnsPanel from '../../modules/OperateBtnsPanel/OperateBtnsPanel'; // 控制按钮面板
import CodePanelClass   from '../../modules/CodePanel/CodePanel'; // 代码编辑面板
import {DragClass}      from '../../modules/Drag/Drag'; // 拖放处理模块
import {Hotkeys}        from '../../modules/Hotkeys/Hotkeys'; // 快捷键处理类
import SceneClass       from './Scene'; // 场景
import PreviewClass     from './Preview'; // 预览类
import PublishClass     from './Publish'; // 发布类
import {Actions}        from './Actions';


// 生成各模块实例
let Header      = new HeaderPanel(),
    Widgets     = new WidgetsPanel(),
    Scene       = new SceneClass(),
    SizePanel   = new WidgetsSizePanel(),
    Exterior    = new WidgetsExterior(),
    Pages       = new PagesManage(),
    PagePro     = new PageProperty(),
    Property    = new WidgetsProperty(),
    Hierarchy = new WidgetsHierarchy(),
    OperateBtns = new OperateBtnsPanel(),
    CodePanel   = new CodePanelClass(),
    Preview     = new PreviewClass(),
    PublishObj  = new PublishClass();
// 获取各模块React组件
let HeaderDom = Header.getComponent(),
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

let App = React.createClass({
    mixins: [Router.State],
    getInitialState: function() {
        return {
            title: 'C-Life',
        };
    },
    componentDidMount:function(){
        let work = this.getParams().work;
        let key = this.getParams().key;
        if (work==='new') {
            Actions.loadStoreData(0, key);
        } else if (work==='edit') {
            Actions.loadStoreData(key);
        }
    },
    handleBodyClick: function(e){
        if (e.target.className.indexOf('main-view')<0 
            && !e.target.closest('.size-view, .exterior-view,.hierarchy-view ,.property-view, .operate-wrap .select-list, .codepanel-wrap')) {
            Actions.selectUserWidget(-1); // 取消控件选中状态
        }
    },
    handlerPublishClick:function(){
        this.setState({
            publish:true
        });
    },
    render: function() {
        return (
            <div className="app-body" onClick={this.handleBodyClick} {...new DragClass().events()}>
                <OperateBtnsDom publishFun={this.handlerPublishClick} />
                <section className="main-view" >
                    <section className='left-view'>
                        <div className="pages-view">
                            <PagesDom />
                        </div>
                        <section className='header'>工具</section>
                        <div className="widgets-view" style={{height:document.body.clientHeight-332+'px'}}>
                            <WidgetsDom />
                        </div>
                    </section>
                    <SceneDom />
                    <section className='right-view'>
                        <div className='right-view-scroll'>
                            <div className="property-view" id='property-view'>
                                <PageProDom />
                            </div>
                            <div className="property-view" id='property-view'>
                                <PropertyDom />
                            </div>
                            <div className="exterior-view" id='exterior-view'>
                                <ExteriorDom />
                            </div>
                            <div className="size-view" id='size-view'>
                                <SizePanelDom />
                            </div>
                        </div>
                        <div className="hierarchy-view">
                            <HierarchyDown />
                        </div>
                    </section>
                </section>
                <CodePanelDom />
                <PreviewDom />
                {this.state.publish ? <PublishDom /> : null}
            </div>
        );
    }
});

// 定义路由
let Routes = (
    <Route name="app" path="/">
        <Route name="devlop" path="/develop/:work/:key" handler={App}/>
        <Route name="preview" path="/preview" handler={PreviewDom}/>
        <Route name="publish" path="/publish" handler={PublishDom}/>
    </Route>
);

Comm.domReady(() => {
    Router.run(Routes, Router.HashLocation, function(Root){  
        React.render(<Root />, document.body);
    });
});
document.addEventListener('keydown', (e)=>Hotkeys.capture(e));
