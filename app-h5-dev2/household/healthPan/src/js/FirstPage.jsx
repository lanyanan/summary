'use strict';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Loading} from './Loading.jsx';
const {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {
    count: 0,
    lastMode: 0,
    lastRecordTime: 0,
    slideClose: true,
    slideCount: 0,
}
export const FirstPage =  React.createClass({
    getInitialState: function(){
        return {};
    },
    componentWillReceiveProps(next){},
    componentDidMount(){},
    render:function(){
        //控制数据
        let operate = this.props.operate;
        let mode = operate.mode;
        let modeName = operate.modeName;
        let fire = operate.fire;
        //离线&故障数据
        let online = operate.online;
        let networkavailable =operate.networkavailable;
        let hightemperature = operate.hightemperature;
        let dryburning = operate.dryburning;
        let opencircuit = operate.opencircuit;
        let shortcircuit = operate.shortcircuit;
        //运行数据
        let workingstatus = operate.workingstatus;

        let surplusreservehour = operate.surplusreservehour;
        let surplusreservemin = operate.surplusreservemin;

        let surplusworkhour = operate.surplusworkhour;
        let surplusworkmin = operate.surplusworkmin;

        //预约，加热倒计时显隐
        let countdownShow = operate.countdownShow;
        let reservationShow = false;
        let heatingShow = false;
            //运行数据,预约倒计时,加热时间倒计时(正常加热和保温模式都当做是加热时间)
            if(surplusreservehour !=0 || surplusreservemin!=0) reservationShow =true;
            if(surplusworkhour !=0 || surplusworkmin!=0) heatingShow =true;
            if(mode==0) reservationShow= false,heatingShow=false;
        let reserveOver = (surplusreservehour==0 && surplusreservemin== 0)?true:false;
        //按钮样式
        let liveMode = "flex-cell live"+(mode==0?' on':' off');
        let liveHeat = "flex-cell live"+((mode!=0 && reserveOver && mode!=1 && mode!=8)?' on':' off');
        let liveFire = "flex-cell live"+(mode == 1?' on':' off');
        let liveModePic = mode == 0 ?'url(../static/img/mode/m-0-on.png) no-repeat center center':'url(../static/img/mode/m-'+mode+'-off.png) no-repeat center center';
        let liveHeatPic = 'url(../static/img/i-heat-on.png) no-repeat center center';
        let liveFirePic = mode == 1 ?
            ['url(../static/img/i-fire-iii.png) no-repeat center center', 'url(../static/img/i-fire-i.png) no-repeat center center'][fire]
            :
            'url(../static/img/i-fire-on.png) no-repeat center center';
        let liveFireTxt = mode == 1 ? ['武火','文火'][fire]:'火力';
        //按钮事件
        let liveModeSet = mode==0 ? this.props.slide:'';
        let liveHeatSet = mode!=0 && mode!=1 && mode!=8 && reserveOver ?this.props.openClock:'';
        let liveFireSet = mode!=1 ?'':this.props.openClock;
        let cancelEvent = mode==0 ?'':this.props.cancel;
        //运行状态(本地维护)
        if(!workingstatus) {
            switch (parseInt(mode)){
                case 0:
                    workingstatus = 0;
                    break;
                case 1:
                    workingstatus = 2;
                    break;
                case 8:
                    workingstatus = 3;
                    break;
                default:
                    mode !=0 && mode !=1 && mode !=8 && (workingstatus = reserveOver ? 2 : 1)
                    break;
            }
        }
        let workingStatusCss= "working-status "+(['green','green','orange','orange'][workingstatus]);
            if(online == 2) workingStatusCss = 'hide';
        let workingStatusTxt = ['待机中','预约中','加热中','保温中'][workingstatus];
        //预约倒计时，加热倒计时，显示与否
        let timeHint= countdownShow==true ? 'flex time on': 'flex time off';
        let timeHintSurplus = mode !=1 && mode!=8 ?  (reservationShow ? surplusreservehour+'小时'+ surplusreservemin+'分钟后开始加热':''):'';
        let timeHintHeating = heatingShow ?((mode==8?'保温时长':'加热时长')+(surplusworkhour==1?60:surplusworkmin)+'分钟'):'';
        //取消&提示
        let cancel = mode!=0?'cancel on':'cancel off';
        let cancelHint = mode!=0?'cancel-hint on':'cancel-hint off';
        //离线展示
        let onlineHint = online==2?'dev-offline slide-up':'dev-offline slide-down';
        //短路故障
        let deviceErrorTxt= '';
            if(hightemperature==1) deviceErrorTxt='提示:高温保护';
            if(dryburning==1) deviceErrorTxt='提示:干烧故障';
            if(opencircuit==1) deviceErrorTxt='提示:传感器开路故障';
            if(shortcircuit==1) deviceErrorTxt='提示:传感器短路故障';
        //调试打印
        //<aside className='console'>
        //    {' 调试打印: '}
        //    {' 控制模式: '+operate.mode }
        //    {' 运行模式: '+operate.runningMode }
        //    {' 加热时:'+surplusworkhour }
        //    {' 加热分:'+surplusworkmin }
        //    {' 预约H:'+surplusreservehour }
        //    {' 预约M:'+surplusreservemin }
        //    {' 在线: '+online }
        //    {' 火力: '+fire }
        //    {' 倒计时控制: '+operate.countdownShow.toString() }
        //    {' 干烧: '+operate.dryburning.toString() }
        //    {' 高温: '+operate.hightemperature.toString() }
        //    {' 开路: '+operate.opencircuit.toString() }
        //    {' 短路: '+operate.shortcircuit.toString() }
        //</aside>
        return(
            <div className="first-page">
                <DevPicture />
                <section ref="liveBox" className="dev-operate">
                    <h5 className='device-error show'>{deviceErrorTxt}</h5>
                    <h4 className={workingStatusCss}><span className="flex-cell">{workingStatusTxt}</span></h4>
                    <h3 className={timeHint}>{timeHintSurplus+'   '}{timeHintHeating}</h3>
                    <div className="flex operate-live" id="operate-live">
                        <span className={liveMode} onClick={liveModeSet}>
                            <i style={{background:liveModePic}}></i>
                            <h5>{modeName}</h5>
                        </span>
                        <span className={liveHeat} data-seat="2" onClick={liveHeatSet}>
                            <i style={{background:liveHeatPic}}></i>
                            <h5>加热时间</h5>
                        </span>
                        <span className={liveFire} data-seat="1" onClick={liveFireSet}>
                            <i style={{background:liveFirePic}}></i>
                            <h5>{liveFireTxt}</h5>
                        </span>
                    </div>
                    <h4 className={cancelHint}>点击取消，重置切换当前模式</h4>
                    <figure className={cancel} onClick={cancelEvent}>取消</figure>
                    <figure className={onlineHint}>{'主人,您的养生锅不在线哦~!'}</figure>
                </section>
                <Loading show={operate.loadingShow} info={'正在启动中'} />
            </div>
        )
    }
});
export const DevPicture = React.createClass({
    render(){
        return(
            <section className="dev-screen">
                <img src="../static/img/dev-screen.jpg"/>
            </section>
        )
    }
})