'use strict';

/**
 * 组件属性面板类
 * 提供控件各种属性设定
 * @author   xinglin
 * @datetime 2015-12-24
 */
import {Actions} from '../../app/Actions.es6';
import {Store} from '../../app/Store.es6';
import {PanelBase} from '../../core/PanelBase.class';
import {CaptionProperty} from './CaptionProperty.es6'; // 标题组件
import {BaseComponent} from '../../../libs/BaseComponent.class.es6';

export default class WidgetsProperty extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        class dom extends BaseComponent{
             constructor(props) {
                super(props);
                this.state = {
                    panelSwitch:{propertyPanelSwitch:1},
                        protocolConfigs:[
                        ],
                        pages: {
                            activePage:0,
                            activeWidget:-1,
                            pageList:[
                                {pageName:'主页',pageId:0,widgetList:[
                                ]}
                            ]
                        },
                        showStatus:0,
                        showEvent:0
                };
                this.listenStore(Store); // 监听Store
                this.baseData = {
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
                        }]
                };
                this.baseProtocolConfigs = [
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
                ];

            }
            close(e){//关闭面板
                e.preventDefault();
                Actions.showPanel('propertyPanel');
            }
            resetPanel(e){
                e.preventDefault();
                e.stopPropagation();
                let dom = document.querySelector('#property-view');
                dom.style.top='40px';
                dom.style.right='210px';
            }
            toggleDiv(index,type){
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
                }
            }
            render(){
                let pageProShow = this.state.pages.activePage!=-1&&this.state.pages.activeWidget==-1 ? true : false;
                let protocolConfigs = this.state.protocolConfigs.length != 0 ? this.state.protocolConfigs : this.baseProtocolConfigs,
                    activePage = this.state.pages.activePage,
                    activeWidget = this.state.pages.activeWidget,
                    pageList = this.state.pages.pageList,
                    widget = typeof pageList[activePage].widgetList[activeWidget] !== 'undefined' ?
                             pageList[activePage].widgetList[activeWidget] : this.baseData,
                    scheme = typeof widget.scheme !=='undefined' ? widget.scheme : ['status','event'],
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
                        if(P.type==2) {
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
                                (P.type==3 && Q.property==R.statusField) ? activestatusfield[k]=j : '';
                                (P.type==3 && !R.statusField) ? activestatusfield[k]=0 : '';
                            });//遍历确定以前被选中的状态字段以及值
                            propertySet[0].eventSet.map((S,h)=>{
                                (P.type==2 && Q.property==S.eventField) ? activeeventfield[h]=j : '';
                                (P.type==2 && !S.eventField) ? activeeventfield[h]=0 : '';
                            });//遍历确定以前被选中的事件字段以及值
                        });//遍历来确定以前被选中的字段以及值
                    });
                return <div ref="propertyArea" style={panelstyle} className='propertyArea'>
                        <header>{widget.originCaption || '控件'}</header>
                        <div className='propertybody'>
                            {/*<section className='heading'>
                                <span className='imagetitle'>{widget.originCaption}</span>
                            </section>*/}
                            <ShowProperty.getComponent item={propertySet[0]} index={0} />
                            {scheme.map((comp,c)=>{
                                switch(comp){
                                    case 'caption':
                                        return(<CaptionProperty.getComponent key={comp} item={widget.caption} />);
                                        break;
                                    case 'text':
                                        return(<TextProperty.getComponent key={comp} item={propertySet[0]} editText={widget.editText} index={0} />);
                                        break;
                                    case 'color':
                                        return(<ColorProperty.getComponent key={comp} item={propertySet[0]} index={0} />);
                                        break;
                                    case 'fontStyle':
                                        return(<fontStyleProperty.getComponent key={comp} item={propertySet[0]} index={0} />);
                                        break;
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
                                    case 'range':
                                        return(<RangeProperty.getComponent key={comp} statusSet={propertySet[0].statusSet} statusList={statusList} toggleDiv={this.toggleDiv} propertySet={propertySet[0]}
                                                activefield={activestatusfield} Jindex={statusIndex} showStatus={showStatus} scheme={scheme} />);
                                        break;
                                    case 'colorPicker':
                                        return(<ColorPickerProperty.getComponent key={comp} propertySet={propertySet[0]} item={propertySet[0].eventSet[0]} Pitem={eventList} scheme={scheme} activefield={activeeventfield}
                                                widget={widget}  toggleDiv={this.toggleDiv} Jindex={eventIndex} showEvent={showEvent} Iindex={0} />);
                                        break;
                                    default:;
                                }
                            })}
                            {protocolConfigs.sort((a,b)=>{return b.type-a.type}).map((F,j)=>{
                                if(F.type == '3' && (scheme.indexOf('status')>-1 || scheme.indexOf('statusshow')>-1)){
                                    return(
                                        <section key={j}>
                                            {propertySet[0].statusSet.map((status,index)=>{
                                                return(
                                                    <StatusProperty.getComponent key={index} item={status} Pitem={F} scheme={scheme} showStatus={showStatus}
                                                    Iindex={index} activefield={activestatusfield} propertySet={propertySet[0]} Jindex={j} toggleDiv={this.toggleDiv} />
                                                )
                                            })}
                                        </section>
                                    )
                                }else if(F.type == '2' && scheme.indexOf('event')>-1){
                                    return(
                                        <section key={j}>
                                            {propertySet[0].eventSet.map((event,index)=>{
                                                return(
                                                    <EventProperty.getComponent key={index} item={event} Pitem={F} pageList={pageList} activePage={activePage} showEvent={showEvent}
                                                    Iindex={index} activefield={activeeventfield} widget={widget} widgetList={pageList[activePage].widgetList} toggleDiv={this.toggleDiv}
                                                    dataList={dataList} Jindex={j} scheme={scheme} />
                                                )
                                            })}
                                        </section>
                                    )

                                }
                            })}
                        </div>
                    </div>
            }

        }
        
    }
}
