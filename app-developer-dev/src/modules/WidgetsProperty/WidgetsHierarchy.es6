'use strict';

/**
 * 组件属性面板类
 * 提供控件各种属性设定
 * @author   xinglin
 * @datetime 2015-12-24
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';
import {uploadVerification} from './uploadVerification'; // 图片验证类
import {ShowProperty} from './ShowProperty'; // 显隐组件
import {commandProperty} from './commandProperty'; // 发送指令组件
import {CaptionProperty} from './CaptionProperty'; // 标题组件
import {ImageProperty} from './ImageProperty'; // 图像组件
import {TextProperty} from './TextProperty'; // 文本组件
import {SwitchProperty} from './SwitchProperty'; // 开关按钮组件
import {StatusProperty} from './StatusProperty'; // 状态组件
import {EventProperty} from './EventProperty'; // 事件组件
import {ColorProperty} from './ColorProperty'; // 颜色组件
import {fontStyleProperty} from './fontStyleProperty'; // 字体风格组件
import {TimeProperty} from './TimeProperty'; // 定时组件
import {RangeProperty} from './RangeProperty'; // 滑块组件
import {ColorPickerProperty} from './ColorPickerProperty'; // 颜色盘组件
import {TitleProperty} from './TitleProperty'; // 控件头部内容title组件
import {BottonDetailProperty} from './BottonDetailProperty'; // 控件弹窗按钮内容组件
import {ModeProperty} from './ModeProperty'; // 控件模式选择--状态事件组合
import {ProcessProperty} from './ProcessProperty'; // 过程组件
import {OpacityProperty} from './OpacityProperty'; // 透明度组件
import {TabProperty} from './TabProperty'; // 选项卡组件

export default class WidgetsProperty extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return React.createClass({
            mixins: [Reflux.connect(Store)],
            getInitialState: function(){
                    return {
                        panelSwitch:{propertyPanelSwitch:1},
                        protocolConfigs:[
                        ],
                        pages: {
                            activePage:0,
                            activeWidget:-1,
                            activeWidgetChild:-1,//选项卡里的选项index（儿子）
                            activeWidgetGrandchild:-1,//对应选项里的控件index（孙子）
                            pageList:[
                                {
                                    pageName:'主页',
                                    pageId:0,
                                    widgetList:[{
                                        top:0,
                                        left:0,
                                        width:0,
                                        height:0
                                    }]
                                }
                            ]
                        },
                        showStatus:0,
                        showEvent:0,
                        showMode:0 ,//模式
                        showTab:0 //选项卡
                    };
            },
            close:function(e){//关闭面板
                e.preventDefault();
                Actions.showPanel('propertyPanel');
            },
            baseData:{
                commandType:'1',
                checkedCommandList:[],
                propertySet:[{
                        propertyId:1,
                        bgImagePath:'',
                        imageInfo:'',
                        statusVisibility:1,
                        widgetStatusName:'',
                        switchValue:1,
                        multipleText:'',
                        eventSet:[{
                            eventType:1,
                            eventField:'',
                            eventValue:''
                        }],
                        statusSet:[{
                            statusField:'',
                            statusValue:''
                        }],
                        fontSize:'',
                        textColor:'',
                        updateFlag:undefined,
                        checkedPageId:''
                    }],
                    tone: [],
            },
            baseProtocolConfigs:[
                {
                    typeName: "控制数据",
                    type: 2,
                    propertyConfigs: null,
                },
                {
                    typeName: "运行数据",
                    type: 3,
                    propertyConfigs: null,
                }
            ],
            resetPanel:function(e){
                e.preventDefault();
                e.stopPropagation();
                let dom = document.querySelector('#property-view');
                dom.style.top='40px';
                dom.style.right='210px';
            },
            toggleDiv:function(index,type){
                if(type==='status'){
                    let show = this.state.showStatus === index ? -1 : index;
                    this.setState({
                        showStatus: show
                    });
                }else if(type==='event'){
                    let show = this.state.showEvent === index ? -1 : index;
                    this.setState({
                        showEvent: show
                    });
                }else if(type==='mode'){
                    let show = this.state.showMode === index ? -1 : index;
                    this.setState({
                        showMode: show
                    });
                }else if(type==='tabBar'){
                    let show = this.state.showTab === index ? -1 : index;
                    this.setState({
                        showTab: show
                    });
                }
            },
            colorPick: function(e) {
                let colorstyle = e.target.getAttribute('data-value') || e.target.getAttribute('data-symbol');
                let newcolor = e.target.getAttribute('data-bgcolor');
                //console.log(/^#[0-9a-fA-F]{3,6}$/.test(newcolor));
                switch(colorstyle){
                    case 'foreground':
                        // this.setState({foreground:newcolor});
                        Actions.changeFgColor(newcolor);
                        break;
                    case 'bordercolor':
                        // this.setState({bordercolor:newcolor});
                        Actions.changeBorderColor(newcolor);
                        break;
                    case 'bgcolor':
                        // this.setState({bgcolor:newcolor});
                        Actions.changeBgColor(newcolor);
                        break;
                }
            },
            getMaxZindex:function(type){
                let activePage = this.state.pages.activePage || 0;
                let widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                if(type==='max'){
                    widgetList.sort(function(x,y){return (y.zIndex||0)-(x.zIndex||0);});
                    return widgetList[0].zIndex || 0;
                }else if(type==='min'){
                    widgetList.sort(function(x,y){return (x.zIndex||0)-(y.zIndex||0);});
                    return widgetList[0].zIndex || 0;
                }
            },
            changeZIndex:function(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-type');
                let activePage = this.state.pages.activePage || 0;
                let widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                switch(type){
                    case 'top':
                        let max = this.getMaxZindex('max');
                        Actions.changeSize('zIndex',max+1);
                        break;
                    case 'up':
                        Actions.upZIndexUserWidget();
                        break;
                    case 'down':
                        Actions.downZIndexUserWidget();
                        break;
                    case 'bottom':
                        let min = this.getMaxZindex('min');
                        Actions.changeSize('zIndex',min-1);
                        break;
                    default:;
                }
            },
            changeSize: function(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-typename');
                let value = Number(e.target.value);
                if(type=='width'||type=='height') value = value || 1;
                Actions.changeSize(type,value);
            },
            changeAlign(){},
            ZIndexShow(e){
                e.preventDefault();
                this.refs.zIndexContent.getDOMNode().style.display = "block";
            },
            ZIndexHide(e){
                this.refs.zIndexContent.getDOMNode().style.display = "none";
            },
            render: function(){
                let pageProShow = this.state.pages.activePage!=-1&&this.state.pages.activeWidget==-1 ? true : false;
                let protocolConfigs = this.state.protocolConfigs.length != 0 ? this.state.protocolConfigs : this.baseProtocolConfigs,
                    pages = this.state.pages,
                    activePage = this.state.pages.activePage,
                    activeWidget = this.state.pages.activeWidget,
                    pageList = this.state.pages.pageList,
                    widget = typeof pageList[activePage].widgetList[activeWidget] !== 'undefined' ?
                             pageList[activePage].widgetList[activeWidget] : this.baseData;
                    if(widget.id === 1019 && pages.activeWidgetGrandchild >-1){//选项卡 指定选项的控件集合
                        widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                    }

                    let scheme = typeof widget.scheme !=='undefined' ? widget.scheme : ['status','event'],         
                    propertySet = widget.propertySet.length != 0 ? widget.propertySet : this.baseData.propertySet,
                    panelstyle = {
                        display : this.state.panelSwitch.propertyPanelSwitch == 1 && !pageProShow ? 'block':'none'
                    };
                    widget = typeof widget !== 'undefined' ? widget : {top:0,left:0,width:1,height:1,deg:0,zIndex:0};
                    let grid = typeof widget.grid !=='undefined' ? widget.grid : [];
                    let xValue = widget.left,
                    yValue = widget.top,
                    widgetWidth = widget.width,
                    widgetHeight = widget.height,
                    deg = widget.deg || 0;
                    
                    let zIndex = widget.zIndex || 0;
                    let hierarchyContent = "";
                    if(grid.indexOf('hierarchy') != -1){
                        hierarchyContent =  <div className="property-show-list" style={panelstyle}>
                                                <ShowProperty.getComponent item={propertySet[0]} index={0} />
                                                <section className='zIndex' ref="zIndex" onClick={this.changeZIndex} onMouseOver={this.ZIndexShow} onMouseOut ={this.ZIndexHide}>
                                                    <span className="open"></span>
                                                    <div className="zIndex-content" ref="zIndexContent" data-type="zIndex-content">
                                                        <label className="zIndex-top" data-type={'top'}></label>
                                                        <label className="zIndex-up" data-type={'up'}></label>
                                                        <label className="zIndex-down" data-type={'down'}></label>
                                                        <label className="zIndex-bottom" data-type={'bottom'}></label>
                                                    </div>
                                                </section>
                                                <span data-typename='ratio' className={widget.isRatio==1?'geometric on':'geometric off'} onClick={this.changeSize}></span>
                                            </div>
                    }
                return (
                    <div>
                        {hierarchyContent}
                    </div>
                );
            }
        });
    }
}


                            