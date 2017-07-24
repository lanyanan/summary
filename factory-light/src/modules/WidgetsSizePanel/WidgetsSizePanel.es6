'use strict';

/**
 * 组件位置尺寸面板类
 * 提供控件各种位置尺寸设定
 * @author   xinglin
 * @datetime 2015-12-11
 */
import {Actions} from '../../app/Actions.es6';
import {Store} from '../../app/Store.es6';
import {PanelBase} from '../../core/PanelBase.class.es6';
import {BaseComponent} from '../../../libs/BaseComponent.class.es6';



export default class WidgetsSizePanel extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return class size extends BaseComponent{
            constructor(props) {
                super(props);
                this.state = {
                    checkIndex:0,
                    switchHidden:true,
                    hidden:true,
                    controllerList:[],
                    relatedSwitchList:[{switchVOList:[]}],
                    panelSwitch:{sizePanelSwitch:1},
                    pages:{
                        activePage:0,
                        activeWidget:-1,
                        pageList:[
                        {
                            widgetList:[{
                                id:1001,
                                caption:"灯",
                                userWidgetID:0,
                                top:0,
                                left:0,
                                width:0,
                                height:0,
                                lightDeviceVOs:[{}]
                            }]
                        }]
                    }
                };
                this.listenStore(Store); // 监听Store
            }
            close(e){
                e.preventDefault();
                Actions.showPanel('sizePanel');
            }
            changeStatusName(e){//修改控件当前状态显示名
                let snvalue = e.target.value;
                Actions.changeWidgetCaption(snvalue);
            }
            delStatusName(e){//删除控件当前状态显示名
               Actions.changeWidgetCaption('');
            }
            showFocus(e){
                let defaultvalue = e.target.value;
                this.setState({hidden:false},()=>{
                    ReactDOM.findDOMNode(this.refs.captionName).value=defaultvalue;
                    ReactDOM.findDOMNode(this.refs.captionName).focus();
                });
            }
            hiddenBlur(e){
                this.setState({hidden:true});
            }
            keydown(e){//回车快捷键 提交命名结束
                e.stopPropagation();
                if(e.keyCode == 13){
                    this.setState({hidden:true});
                }
                else{
                    return;
                }
            }
            changeControll(e){
                let deviceId = e.target.options[e.target.selectedIndex].getAttribute('data-id')
                Actions.changeDeviceId(deviceId);

            }
            changeCode(e){
                let value = Number(e.target.value); 
                Actions.changeCode(value);    
            }
            changeSize(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-typename');
                let value = Number(e.target.value);
                if(type=='width'||type=='height') value = value || 1;
                Actions.changeSize(type,value);
            }
            changeName(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-typename');
                let value = Number(e.target.value);
                if(type=='width'||type=='height') value = value || 1;
                console.log(this.state)
            }
            showPanel(){
                this.setState({
                    switchHidden:false
                })
            }
            cancle(){
                this.setState({
                    switchHidden:true
                })
            }
            submit(){
                Actions.saveWidgets()
                this.setState({
                    switchHidden:true
                })
            }
            checkControll(e){
                let key = e.target.getAttribute('data-key');
                let mark = e.target.getAttribute('checked');
                if(mark=='checked'){
                    
                }else{
                    this.setState({
                        checkIndex:key
                    }) 
                }
            }
            changeLight(e){
                let key = e.target.getAttribute('data-key');
                let name = e.target.getAttribute('data-name');
                let mac = e.target.getAttribute('data-mac');
                let checked = e.target.checked;
                Actions.changeLight(key, name, mac, checked);   
            }
            render(){
                let pageProShow = this.state.pages.activePage!=-1&&this.state.pages.activeWidget==-1 ? true : false;
                let panelstyle = {
                    display : this.state.panelSwitch.sizePanelSwitch == 1&&!pageProShow ? 'block':'none'
                },
                activePage = this.state.pages.activePage,
                activeWidget = this.state.pages.activeWidget,
                widget = this.state.pages.pageList[activePage].widgetList[activeWidget];
                widget = typeof widget !== 'undefined' ? widget : {top:0,left:0,width:1,height:1,deg:0,zIndex:0,code:0,bindDeviceId:'',id:''};
                let xValue = widget.left,
                yValue = widget.top,
                code = widget.code,
                id = widget.id,
                caption = widget.caption,
                userWidgetID = widget.userWidgetID,
                widgetWidth = widget.width,
                widgetHeight = widget.height,
                deg = widget.deg || 0,
                controllerId = widget.bindDeviceId,
                controllerName = '',
                lightArr = widget.switchIds?widget.switchIds.map((item, index)=>{
                    return parseInt(item.lightDeviceId);
                }):[];
                this.state.controllerList.map((item, index)=>{
                    if(item.deviceId == controllerId){
                        controllerName = item.deviceName + "(" + item.macAddress + ")"
                    }
                })
                return <div style={{display:'block'}}  className='sizeArea'>
                        <div className='sizebody'>
                            <div className="value value-x">
                                <span className='value-top'>坐标X</span>
                                <input className='value-input' type="number" value={xValue}  min='0' max='800' data-typename='x' onChange={this.changeSize}  />
                            </div>
                            <div className="value value-y">
                                <span className='value-top'>坐标Y</span>
                                <input className='value-input' type="number" value={yValue} min='0' max='800' data-typename='y' onChange={this.changeSize}  />
                            </div>
                            <div className="value value-name">
                                <span className='value-top'>设备名称</span>
                                <input className='value-input' type = 'text' value={caption} data-typename='name' onChange={this.showFocus.bind(this)}
                                onFocus={this.showFocus.bind(this)} />
                                <input className="value-input" type="text" onChange={this.changeStatusName.bind(this)}
                                onBlur={this.hiddenBlur.bind(this)} style={{display:(this.state.hidden?"none":"")}}
                                onKeyDown={this.keydown.bind(this)} defaultValue={caption} ref='captionName'/>
                            </div>
                            <div className="value value-m">
                                <span className='value-top'>设备编号</span>
                                <input className='value-input' type="number" min='0' max='40'  value={code} onChange={this.changeCode.bind(this)}  />
                            </div>
                            <div className="value value-controller">
                                <span className='value-top' >控制器</span>
                                <select className='controllers' value={controllerName}  onChange={this.changeControll.bind(this)} >
                                    <option >请选择控制器</option>
                                    {
                                        this.state.controllerList.map((item, index)=>{
                                            return <option key={index} data-id={item.deviceId} data-mac={item.macAddress}  value={item.deviceName+"("+item.macAddress+")"}>{item.deviceName+"("+item.macAddress+")"}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="value value-on" style={{display:id==1002?"block":"none"}}>
                                <span className='value-on-btn' onClick={this.showPanel.bind(this)}>关联开关</span>
                                <div className="relate-switch" style={{display:this.state.switchHidden?'none':'block'}}>
                                    <div className="relate-header">
                                        <div className="relate-header-title">设置关联开关</div>
                                        <div className="relate-header-btn" onClick = {this.cancle.bind(this)}>X</div>
                                    </div>
                                    <div className="relate-body">
                                        <div className="relate-body-left">
                                            <div className="controller-title">控制器</div>
                                            {this.state.relatedSwitchList.map((item, index)=>{
                                                if(this.state.checkIndex==index){

                                                    return  <div key={index}  className="controller-item">
                                                            <input checked='checked' data-key={index} className="controller-item-list" type='checkbox'  name={item.deviceName} value={item.deviceId} onChange={this.checkControll.bind(this)}/><label htmlFor='c1'>{item.deviceName+'('+item.macAddress+')'}</label>
                                                        </div>
                                                }else{
                                                    return  <div key={index}  className="controller-item">
                                                            <input data-key={index} className="controller-item-list" type='checkbox'  name={item.deviceName} value={item.deviceId} onChange={this.checkControll.bind(this)}/><label htmlFor='c1'>{item.deviceName+'('+item.macAddress+')'}</label>
                                                        </div>
                                                }
                                               
                                                
                                            })}
                                        </div>
                                        <div className="relate-body-right">
                                            {this.state.relatedSwitchList.length>=1?this.state.relatedSwitchList[this.state.checkIndex].switchVOList.map((d, i)=>{
                                                    if(lightArr.indexOf(d.lightDeviceId)>-1){
                                                        return  <div key={i}  className="controller-item">
                                                                <input key={i} data-key={d.lightDeviceId} checked='checked' className="controller-item-list" type='checkbox' id={d.lightDeviceId} data-mac={d.macAddress} data-name={d.deviceName} onClick={this.changeLight.bind(this)} /><label htmlFor='c1'>{d.deviceName}</label>
                                                            </div>
                                                    }else{
                                                        return  <div key={i}  className="controller-item">
                                                                <input key={i} data-key={d.lightDeviceId} checked={false} className="controller-item-list" type='checkbox' id={d.lightDeviceId} data-name={d.deviceName} data-mac={d.macAddress} onClick={this.changeLight.bind(this)} /><label htmlFor='c1'>{d.deviceName}</label>
                                                            </div>
                                                    }
                                                    
                                                }):''
                                            }
                                        </div>
                                    </div>
                                    <div className="relate-footer">
                                        <div className="subBtn" onClick = {this.submit.bind(this)}>确定</div>
                                        <div className="canBtn" onClick = {this.cancle.bind(this)}>取消</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        };
    }

}
