import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

// 创建React组件
export class SceneDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            strategyId: this.props.params.strategyId,
            successShow: false,
            failShow: false,
            unbindShow: false
        };
        het.setTitle('方案详情');
        this.deviceTypeId = null;
        this.deviceSubtypeId = null;
        this.deviceId = null;
        this.listenStore(Store); // 监听Store
        Actions.getStrategy(this.state.strategyId);
    }
    useMode(e) {
        let stepId = parseInt(e.currentTarget.getAttribute('data-stepId'));
        let isBind = parseInt(e.currentTarget.getAttribute('data-bind'));
        this.deviceTypeId = parseInt(e.currentTarget.getAttribute('data-deviceTypeId'));
        this.deviceSubtypeId = parseInt(e.currentTarget.getAttribute('data-deviceSubtypeId'));
        this.deviceId = e.currentTarget.getAttribute('data-deviceId');
        if(!isBind){
            this.setState({unbindShow:true});
        }else{
            Actions.useMode(this.deviceTypeId,this.deviceSubtypeId,stepId);
        }
        e.stopPropagation();
        e.preventDefault();
    }
    stayHere(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            successShow: false,
            failShow: false,
            unbindShow: false
        });
    }
    goBind(e) {//去绑定
        e.stopPropagation();
        e.preventDefault();
        window.AppJsBridge.service.openActivity({"params":{"target":"findDevice",},"success":function(){console.log('进入设备引导')},"error":function(){}});
    }
    checkDevice(e) {//查看设备
        e.stopPropagation();
        e.preventDefault();
        if(this.deviceTypeId == 34 && this.deviceSubtypeId == 1){
            //电磁洁面仪
            // window.location.href = '../../../../com.het.smarthome.clife.dirver/cleansing/page/index.html';
            let url = 'smarthome/com.het.smarthome.clife.dirver/cleansing/page/index.html?sn='+this.deviceId;
            window.AppJsBridge.service.applicationService.openURL({"title":"电磁洁面仪","url":url,"success":function(){},"error":function(){}});
        }
        if(this.deviceTypeId == 37 && this.deviceSubtypeId == 1){
            //彩光导入仪
            //window.location.href = '../../lightBeauty/page/index.html';
            let url = 'smarthome/com.het.smarthome.clife.dirver/lightBeauty/page/index.html?sn='+this.deviceId;
            window.AppJsBridge.service.applicationService.openURL({"title":"彩光导入仪","url":url,"success":function(){},"error":function(){}});
        }
        if(this.deviceTypeId == 36 && this.deviceSubtypeId == 1){
            //便携喷雾仪
            //window.location.href = '../../kymSpray/page/index.html';
            let url = 'smarthome/com.het.smarthome.clife.dirver/kymSpray/page/index.html?sn='+this.deviceId;
            window.AppJsBridge.service.applicationService.openURL({"title":"便携喷雾仪","url":url,"success":function(){},"error":function(){}});
        }
        this.setState({
            successShow: false,
            failShow: false,
            unbindShow: false
        });
    }
    render() {
        //console.log('最终数据:',this.state);
        let tags = this.state.tags || [];
        let devices = this.state.devices || [];
        let steps = this.state.steps || [];
        return (
            <div className="scene">
                <div className="top">
                    <h2 className="h2">{this.state.title}</h2>
                    {tags.map((item,index)=>{
                        return (
                            <span key={index} className="label">{item.tagName}</span>
                        )
                    })}
                    <p className="txt">{this.state.descs}</p>
                    <h3 className="h3">{devices.length >0 ? '所需设备' : ''}</h3>
                    {devices.map((item,index)=>{
                        return (
                            <dl key={index} className="dl">
                                <dt><img src={item.productIcon} /></dt>
                                <dd className={item.isBind?'':'unbind'}></dd>
                            </dl>
                        )
                    })}
                </div>
                {steps.map((item,index)=>{
                    return (
                        <Link to={"/stepDetail/"+item.stepId} className="device" key={index} data-stepId={item.stepId}>
                            <h3 className="title">{item.stepTitle}</h3>
                            <div className="device-detail">
                                <p className="txt">{item.stepDesc}</p>
                                {item.deviceInfo ? (
                                    <div>
                                        <h3 className="h3">{'推荐设备'}</h3>
                                        <section className="high-light flex">
                                            <img src={item.deviceInfo.productIcon} />
                                            <div className="high-r">
                                                <h3>{item.deviceInfo.productName}</h3>
                                                {(item.deviceConfig || []).map((item,index)=>{
                                                    return (<span key={index}>{item.descs+':'}{item.value}</span>)
                                                })}
                                            </div>
                                        </section>
                                        <div className="btn" data-stepId={item.stepId} data-bind={item.deviceInfo.isBind} data-deviceTypeId={item.deviceInfo.deviceTypeId} data-deviceSubtypeId={item.deviceInfo.deviceSubtypeId} data-deviceId={item.deviceInfo.deviceId} onTouchTap={this.useMode.bind(this)}>启用该模式</div>
                                    </div>
                                ) : ''}
                            </div>
                        </Link>
                    )
                })}
                {/*设备绑定成功*/}
                <div className="cover" ref="success" style={{display:this.state.successShow?'block':'none'}}>
                    <div className="content">
                        <img className="successImg" src="../static/img/scene-1.png" />
                        <p className="desc">设备同步成功</p>
                        <a href="#" onTouchTap={this.checkDevice.bind(this)}>查看我的设备</a>
                        <a href="#" onTouchTap={this.stayHere.bind(this)}>留在当前页面</a>
                    </div>
                </div>
                {/*设备绑定失败*/}
                <div className="cover" ref="fail" style={{display:this.state.failShow?'block':'none'}}>
                    <div className="content">
                        <img className="failImg" src="../static/img/scene-2.png" />
                        <p className="desc">设备同步失败,请检查手机网络设置!</p>
                        <a href="#" onTouchTap={this.stayHere.bind(this)}>确定</a>
                    </div>
                </div>
                {/*设备未绑定*/}
                <div className="cover" ref="unbind" style={{display:this.state.unbindShow?'block':'none'}}>
                    <div className="content">
                        <p className="desc1">您尚未绑定设备,无法启动该模式.</p>
                        <button className="go-bind" onTouchTap={this.goBind.bind(this)}>去绑定</button>
                        <button className="no-thx" onTouchTap={this.stayHere.bind(this)}>不了,谢谢!</button>
                    </div>
                </div>
            </div>
        );
    }
}
