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
import {TextAlignProperty} from './textAlignProperty'; //文字文字组件
import {SolidProperty} from './solidProperty'; //实心空心组件
import {WidthProperty} from './widthProperty'; //通栏组件
import {ToneProperty} from './toneProperty'; //按钮颜色选择器
import {RangeStatusProperty} from './rangeStatusProperty'; //滑块关联数据
import {RangeVariableProperty} from './rangeVariableProperty'; //滑块变量组件
import {WidgetStyleProperty} from './widgetStyleProperty'; //控件样式组件
import {ProcessVariableProperty} from './processVariableProperty'; //过程变量组件
import {ColorPickerTypeProperty} from './ColorPickerTypeProperty'; //顏色样式组件
import {RanksProperty} from './RanksProperty'; //九宫格行列样式组件
import {ImageChoce} from './imageChoce'; //宫格图标

export default class WidgetsProperty extends PanelBase {
    constructor(){
        super();
    }
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
                                {pageName:'主页',pageId:0,widgetList:[
                                ]}
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
                widgetInfo: {
                    rangeType: "continuity", //滑块类型
                    rangeStyle: 0,    //滑块样式
                    rangeNowd: 1, //滑块当前档位
                    rangePercent: false,//滑块百分比
                    switchStyle: 0, //开关样式,
                    popupButtonBgColor: null, //弹窗按钮颜色
                    processNowd: 1, //当前过程，
                    row:1,
                    column: 2,
                },
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
            toggleView(e){
                if(e.target.className == "close"){
                    e.target.parentNode.nextElementSibling.style.display = "none";
                    e.target.className = "open";
                }else if(e.target.className == "open"){
                    e.target.parentNode.nextElementSibling.style.display = "block";
                    e.target.className = "close";
                }
            },
            
            addEvent :function(length,e){//添加一个点击事件
                let index = Number(e.target.getAttribute('data-index'));
                Actions.addEvent(index);
                this.toggleDiv(length,'event');
            },
            addStatus :function(length,e){//添加一个状态
                let index = Number(e.target.getAttribute('data-index'));
                Actions.addStatus(index);
                this.toggleDiv(length,'status');
            },
            addMode :function(length1,length2,e){//添加模式  即添加一个点击事件跟一个状态
                let index = Number(e.target.getAttribute('data-index'));
                Actions.addEvent(index);
                Actions.addStatus(index);
                this.toggleDiv(length1,'event');
                this.toggleDiv(length2,'status');
            },
            render: function(){
                let pageProShow = this.state.pages.activePage != -1 && this.state.pages.activeWidget == -1 ? true : false;
                let protocolConfigs = this.state.protocolConfigs.length != 0 ? this.state.protocolConfigs : this.baseProtocolConfigs,
                    pages = this.state.pages,
                    activePage = this.state.pages.activePage,
                    activeWidget = this.state.pages.activeWidget,
                    pageList = this.state.pages.pageList,
                    widget = typeof pageList[activePage].widgetList[activeWidget] !== 'undefined' ?
                             pageList[activePage].widgetList[activeWidget] : this.baseData;
                    
                    if(widget.id === 1019 && pages.activeWidgetGrandchild >-1){ //选项卡 指定选项的控件集合
                        widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                    }
                    if(widget.id === 1020 && pages.activeWidgetGridChild >-1){ //九宫格
                        widget = widget.gridChildList[pages.activeWidgetGridChild];
                    }

                    let scheme = typeof widget.scheme !=='undefined' ? widget.scheme : ['status','event'],
                    grid = typeof widget.grid !=='undefined' ? widget.grid : [],
                    propertySet = widget.propertySet.length != 0 ? widget.propertySet : this.baseData.propertySet,
                    activestatusfield = [],
                    activeeventfield = [],
                    dataList = [],
                    statusList = [],
                    statusIndex,
                    eventList = [],
                    eventIndex,
                    showStatus = this.state.showStatus || 0,
                    showEvent = this.state.showEvent || 0,
                    showMode = this.state.showMode || 0,
                    showTab = this.state.showTab || 0,
                    panelstyle = {
                        display : this.state.panelSwitch.propertyPanelSwitch == 1 && !pageProShow ? 'block':'none'
                    };
                    let isStatusData = false;//防止协议不完整(缺少运行数据)时组件被过滤
                    let isEventData = false;//防止协议不完整(缺少控制数据)时组件被过滤
                    


                    protocolConfigs.map((P,i)=>{
                        if(P.type==3) isStatusData = true;
                        if(P.type==2) isEventData = true;
                    });
                    if(!isStatusData) protocolConfigs.push({
                        typeName: "运行数据",
                        type: 3,
                        propertyConfigs: null,
                    });
                    if(!isEventData) protocolConfigs.push({
                        typeName: "控制数据",
                        type: 2,
                        propertyConfigs: null,
                    });
                        
                    protocolConfigs.sort((a,b)=>{return b.type-a.type}).map((P,i)=>{
                        if(P.type == 2) {
                            dataList=P.propertyConfigs;//控制数据字段给到复合指令面板
                            eventList = P;
                            eventIndex = i;
                        }
                        if(P.type==3) {
                            statusList = P;
                            statusIndex = i;
                        }
                        P.propertyConfigs = P.propertyConfigs instanceof Array ? P.propertyConfigs : [{
                            propertyName: null,
                            unit: null,
                            minValue: null,
                            property: null,
                            valueType: 'text',
                            index:null,
                            defaultValue: null,
                            maxValue: null,
                            options: null
                        }];//过滤掉非法协议
                        P.propertyConfigs.map((Q,j)=>{
                            propertySet[0].statusSet.map((R,k)=>{
                                (P.type == 3 && Q.property == R.statusField) ? activestatusfield[k] = j : '';
                                (P.type == 3 && !R.statusField) ? activestatusfield[k] = 0 : '';
                            });//遍历确定以前被选中的状态字段以及值
                            propertySet[0].eventSet.map((S,h)=>{
                                (P.type == 2 && Q.property == S.eventField) ? activeeventfield[h] = j : '';
                                (P.type == 2 && !S.eventField) ? activeeventfield[h] = 0 : '';
                            });//遍历确定以前被选中的事件字段以及值
                        });//遍历来确定以前被选中的字段以及值
                    });

                    console.log(widget);
                    let widgetInfo = widget.widgetInfo ? widget.widgetInfo : {}; //组件属性，辅助
                    let styleContent = ""; //样式内容
                    if(grid.indexOf('style') != -1){
                        styleContent =  <div className="property-style-list" onClick={this.toggleView}>
                                            <header>样式 <span className="close"></span></header>
                                            <div>
                                                {
                                                    scheme.map((comp,c)=>{
                                                        switch(comp){
                                                            case 'buttonWidth':
                                                                return (<WidthProperty.getComponent key={comp} widgetWidth={widget.width} />);
                                                                break;
                                                            case 'buttonSolid':
                                                                return (<SolidProperty.getComponent key={comp} bgColor={widget.bgColor} borderColor={widget.borderColor} pid={propertySet[0].propertyId} />);
                                                                break;
                                                            case 'tone':
                                                                return (<ToneProperty.getComponent key={comp}  widget={widget} propertySet={propertySet[0]} />);
                                                                break;
                                                            case 'widgetStyle':
                                                                return (<WidgetStyleProperty.getComponent key={comp} widget={widget} propertySet={propertySet[0]} />);
                                                                break;
                                                            case 'rangeType':
                                                                return (<WidgetStyleProperty.getComponent key={comp} widget={widget} propertySet={propertySet[0]} rangeTypeWidget={true} />);
                                                                break;
                                                            case 'colorType':
                                                                return (<ColorPickerTypeProperty.getComponent key={comp} item={propertySet[0]} colorType={widget.activeType} />);
                                                                break;
                                                            case 'ranks':
                                                                return (<RanksProperty.getComponent key={comp} column={widgetInfo.column} row={widgetInfo.row} />);
                                                                break;
                                                            case 'speeddialShape':
                                                                return (<WidgetStyleProperty.getComponent key={comp}  widget={widget} propertySet={propertySet[0]} speedDialShape={true} />);
                                                                break;
                                                            default:;
                                                        }
                                                    })
                                                }   
                                            </div>
                                        </div>
                    }

                    let processVariable = ""; //过程内容
                    if(widget.id == 1018){
                        processVariable = <div className="property-scope-list" onClick={this.toggleView}>
                                            <header>过程<span className="close"></span></header>
                                            <div>
                                                <ProcessVariableProperty.getComponent statusSet={propertySet[0].statusSet}  statusList={statusList} propertySet={propertySet[0]}
                                                                        activefield={activestatusfield} Jindex={statusIndex} showStatus={showStatus}  processColorArr={widgetInfo.processColorArr} processNowd={widgetInfo.processNowd} />
                                            </div>
                                        </div>; 
                    }

                    let scopeContent = ""; //范围内容
                    if(grid.indexOf('scope') != -1){ //范围,只有滑块连续型有和数字加减有，
                        let scopeShow = true;
                        if(widget.id == 1007&&widgetInfo.rangeType) {
                            if(widgetInfo.rangeType != 'continuity'){
                                scopeShow = false;
                            }
                        };
                        scopeContent =  <div className="property-scope-list" style={{display:scopeShow ? 'block':'none'}} onClick={this.toggleView}>
                                            <header>范围 <span className="close"></span></header>
                                            <div>
                                                {
                                                    scheme.map((comp,c)=>{
                                                        switch(comp){
                                                            case 'range':
                                                                return(<RangeProperty.getComponent key={comp} id={widget.id} widget={widget} statusSet={propertySet[0].statusSet} rangePercent={widgetInfo.rangePercent} statusList={statusList} toggleDiv={this.toggleDiv} propertySet={propertySet[0]}
                                                                        activefield={activestatusfield} Jindex={statusIndex} showStatus={showStatus} scheme={scheme} />);
                                                                break;
                                                            default:;
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                    }
                    
                    
                    let rangeVariable = "";//变量内容 ，只有滑块离散型有
                    if(widget.id == 1007&&widgetInfo.rangeType&&widgetInfo.rangeType == 'dispersed'){
                        rangeVariable =  <div className="property-scope-list" onClick={this.toggleView}>
                                            <header>变量<span className="close"></span></header>
                                            <div>
                                                <RangeVariableProperty.getComponent statusSet={propertySet[0].statusSet} rangePercent={widget.rangePercent} statusList={statusList} toggleDiv={this.toggleDiv} propertySet={propertySet[0]}
                                                                        activefield={activestatusfield} Jindex={statusIndex} showStatus={showStatus} scheme={scheme} rangeNowd={widgetInfo.rangeNowd} />
                                            </div>
                                        </div>
                    }

                    let selectContent = ""; //选项内容
                    if(grid.indexOf('select') != -1){
                        selectContent =  <div className="property-scope-list" onClick={this.toggleView}>
                                            <header>选项<span className="close"></span></header>
                                            <div>
                                                {
                                                    scheme.map((comp,c)=>{
                                                        switch(comp){
                                                            case 'select':
                                                                return(
                                                                        <TabProperty.getComponent key={comp} index={0} activeTabIndex={this.state.pages.activeWidgetChild} activeWidget={activeWidget}
                                                                        priority={widget.priority?widget.priority:''} widgetListItem={widget.widgetListItem}  toggleDiv={this.toggleDiv}  showTab={showTab} Iindex={0} />
                                                                        );
                                                                break;
                                                            default:;
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                    }
                    let textContent = [];//文本内容
                    if(grid.indexOf('text') != -1){
                        textContent =   <div className="property-text-list" onClick={this.toggleView}>
                                            <header>文本 <span className="close"></span></header>
                                            <div data-show="true">
                                                {
                                                    scheme.map((comp,c)=>{
                                                        switch(comp){
                                                            case 'text':
                                                                return(<TextProperty.getComponent key={comp} item={propertySet[0]} id={widget.id} editText={widget.editText} index={0} />);
                                                                break;
                                                            case 'title':
                                                                return(<TitleProperty.getComponent key={comp} title={widget.title}  index={0} item={propertySet[0]}/>);
                                                                break;
                                                            case 'bottonDetail':
                                                                return(<BottonDetailProperty.getComponent key={comp} bottonDetail={widget.bottonDetail}  index={0} item={propertySet[0]}/>);
                                                                break;
                                                            case 'color':
                                                                return(<ColorProperty.getComponent key={comp} item={propertySet[0]} index={0} scheme={scheme}/>);
                                                                break;
                                                            case 'fontStyle':
                                                                return(<fontStyleProperty.getComponent key={comp} item={propertySet[0]} index={0} />);
                                                                break; 
                                                            case 'opacity':
                                                                return(<OpacityProperty.getComponent key={comp} item={propertySet[0]} index={0} />);
                                                                break;
                                                            case 'time':
                                                                return(<TimeProperty.getComponent key={comp} propertySet={propertySet[0]} item={propertySet[0].eventSet[0]} Pitem={eventList} scheme={scheme}
                                                                        statusList={statusList} activestatusfield={activestatusfield} showEvent={showEvent} Iindex={0} activefield={activeeventfield}
                                                                        widget={widget} isText={true}  toggleDiv={this.toggleDiv} statusIndex={statusIndex} Jindex={eventIndex}  />);
                                                                break;
                                                            case 'colorPicker':
                                                                return(<ColorPickerProperty.getComponent key={comp} propertySet={propertySet[0]} item={propertySet[0].eventSet[0]} Pitem={eventList} scheme={scheme} activefield={activeeventfield}
                                                                        widget={widget}  toggleDiv={this.toggleDiv} Jindex={eventIndex} showEvent={showEvent} Iindex={0} />);
                                                                break;
                                                            case 'textalign':
                                                                return (<TextAlignProperty.getComponent key={comp} textAlign={widget.textAlign} />);
                                                                break;
                                                            case 'popupButtonTone':
                                                                return (<ToneProperty.getComponent key={comp} item={propertySet[0]} toneType={comp} />);
                                                                break;
                                                            case 'imagechoce':
                                                                return (<ImageChoce.getComponent key={comp} widget={widget} />);
                                                                break;
                                                                
                                                            default:;
                                                        }
                                                    })
                                                }                     
                                            </div>
                                        </div>  
                    }

                    let interactiveContent = ""; //交互内容
                    if(grid.indexOf('interactive') != -1){
                        interactiveContent = <div className="property-interactive-list" onClick={this.toggleView}>
                                                <header>交互<span className="close"></span></header>
                                                <div>
                                                    {
                                                        scheme.map((comp,c)=>{
                                                            switch(comp){
                                                                case 'switch':
                                                                    return(<SwitchProperty.getComponent key={comp} statusSet={propertySet[0].statusSet} eventSet={propertySet[0].eventSet} statusList={statusList} 
                                                                             scheme={scheme} showStatus={showStatus} eventList={eventList} eventIndex={eventIndex} activeeventfield={activeeventfield}
                                                                             activefield={activestatusfield} propertySet={propertySet[0]} Jindex={statusIndex} toggleDiv={this.toggleDiv} showEvent={showEvent}
                                                                             widget={widget} widgetList={pageList[activePage].widgetList} dataList={dataList} pageList={pageList} activePage={activePage} />);
                                                                    break;
                                                                case 'time':
                                                                    return(<TimeProperty.getComponent key={comp} propertySet={propertySet[0]} item={propertySet[0].eventSet[0]} Pitem={eventList} scheme={scheme}
                                                                            statusList={statusList} activestatusfield={activestatusfield} showEvent={showEvent} Iindex={0} activefield={activeeventfield}
                                                                            widget={widget}  toggleDiv={this.toggleDiv} statusIndex={statusIndex} Jindex={eventIndex}  />);
                                                                    break;
                                                                case 'colorPicker':
                                                                    return(<ColorPickerProperty.getComponent key={comp} propertySet={propertySet[0]} item={propertySet[0].eventSet[0]} Pitem={eventList} scheme={scheme} activefield={activeeventfield}
                                                                            widget={widget}  toggleDiv={this.toggleDiv} Jindex={eventIndex} showEvent={showEvent} Iindex={0} />);
                                                                    break;
                                                                default:;
                                                            }
                                                        })  
                                                    }
                                                    {
                                                        scheme.map((comp,c)=>{
                                                            switch(comp){
                                                                case 'scopeStatus':
                                                                    return (<RangeStatusProperty.getComponent key={comp} rangeNowd={widgetInfo.rangeNowd} statusSet={propertySet[0].statusSet} rangePercent={widgetInfo.rangePercent} statusList={statusList} toggleDiv={this.toggleDiv} propertySet={propertySet[0]} 
                                                                activefield={activestatusfield} Jindex={statusIndex} showStatus={showStatus} scheme={scheme} />)
                                                                    break;
                                                                default:;
                                                            }
                                                        })
                                                    }
                                                    {
                                                        protocolConfigs.sort((a,b)=>{return b.type-a.type}).map((F,j)=>{
                                                            if(F.type == '2' && scheme.indexOf('event')>-1){
                                                                return(
                                                                    <section key={j}>
                                                                        <section className="addevent" data-index={widget.propertySet[0].eventSet.length-1} onClick={this.addEvent.bind(this,widget.propertySet[0].eventSet.length)}><em>+</em>添加点击事件</section>
                                                                        {
                                                                            propertySet[0].eventSet.map((event,index)=>{
                                                                                return(
                                                                                    <EventProperty.getComponent key={index} item={event} Pitem={F} pageList={pageList} activePage={activePage} showEvent={showEvent}
                                                                                    Iindex={index} activefield={activeeventfield} widget={widget} widgetList={pageList[activePage].widgetList} toggleDiv={this.toggleDiv}
                                                                                    dataList={dataList} Jindex={j} scheme={scheme} />
                                                                                )
                                                                            })
                                                                        }
                                                                    </section>
                                                                )
                                                            }else if(F.type == '3' && (scheme.indexOf('status')>-1 || scheme.indexOf('statusshow')>-1)){
                                                                return(
                                                                    <section key={j}>
                                                                        {
                                                                            (widget.id == 1001 || widget.id == 1002) ? null : <section className="addstatus" data-index={widget.propertySet[0].eventSet.length-1} onClick={this.addStatus}><em>+</em>添加状态</section>
                                                                        }
                                                                        {
                                                                            propertySet[0].statusSet.map((status,index)=>{
                                                                                return(
                                                                                    <StatusProperty.getComponent key={index} item={status} Pitem={F} scheme={scheme} showStatus={showStatus}
                                                                                    Iindex={index} activefield={activestatusfield} propertySet={propertySet[0]} Jindex={j} toggleDiv={this.toggleDiv} />
                                                                                )
                                                                            })
                                                                        }
                                                                    </section>
                                                                )
                                                            }else if(F.type == '2' && scheme.indexOf('mode')>-1){
                                                                return(
                                                                    <section key={j}>
                                                                        <section className="addmode" data-index={widget.propertySet[0].statusSet.length-1} onClick={this.addMode.bind(this,propertySet[0].eventSet.length,propertySet[0].statusSet.length)}><em>+</em>添加模式</section>
                                                                        {
                                                                            propertySet[0].statusSet.map((status,index)=>{
                                                                                return(
                                                                                <ModeProperty.getComponent key={index} propertySet={propertySet[0]} eventSet={propertySet[0].eventSet} eventList={eventList} scheme={scheme}
                                                                                statusSet={propertySet[0].statusSet} statusList={statusList} activestatusfield={activestatusfield} showMode={showMode} Iindex={index} activeeventfield={activeeventfield}
                                                                                widget={widget}  toggleDiv={this.toggleDiv} statusIndex={statusIndex} eventIndex={eventIndex}  activefield={activestatusfield}
                                                                                widgetList={pageList[activePage].widgetList} dataList={dataList} pageList={pageList} activePage={activePage}/>
                                                                                )
                                                                            })
                                                                        }
                                                                    </section>
                                                                )
                                                            }else if(F.type == '2' && scheme.indexOf('process')>-1){
                                                                return(
                                                                    <section key={j}>
                                                                        <ProcessProperty.getComponent  processNowd={widgetInfo.processNowd} propertySet={propertySet[0]}  scheme={scheme} Pitem={F} Jindex={j}
                                                                            statusSet={propertySet[0].statusSet} statusList={statusList} activestatusfield={activestatusfield} showStatus={showStatus} 
                                                                            widget={widget}  toggleDiv={this.toggleDiv} statusIndex={statusIndex}  activefield={activestatusfield}/>
                                                                    </section>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </div>
                    }
                    
                return (
                    <div ref="propertyArea" style={panelstyle} className='propertyArea'>
                        <header><em>页面&nbsp;/&nbsp;</em>{widget.originCaption || '控件'}</header>
                        <div className='propertybody'>
                            <CaptionProperty.getComponent  item={widget.caption} />
                            {styleContent}
                            {selectContent}
                            {processVariable}
                            {scopeContent}
                            {rangeVariable}
                            {textContent}
                            {interactiveContent}
                            
                        </div>
                    </div>
                );
            }
        });
    }
}


                            