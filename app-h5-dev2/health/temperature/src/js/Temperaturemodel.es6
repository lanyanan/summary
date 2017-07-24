'use strict';
/**
 * 设备连接失败
 */
import {Actions} from './Actions.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Store} from './Store.es6';
import {TempHint} from './TempHint.es6';
import {Head} from './Head.es6';
import {Echarts} from './Echarts.es6';
var {Router, Route, hashHistory,Link} = ReactRouter;

export class Temperaturemodel extends BaseComponent{
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    componentWillMount() {
        document.body.style.height = window.screen.availHeight+'px';

        Actions.getOldData();
        het.toast('kickQuilt');
        document.getElementById("ROOT").style.height = '100%';
    }
    componentDidMount(){
        //if()
    }
    render() {

        let temp = this.state.bedTemp;
        let overturnAlert = this.state.overturnAlert || 27;
        let temptip,tempComfor;
        if(temp<27){
            temptip = "被温偏凉";
            tempComfor = false;
        }else if(temp>35){
            temptip = "被温偏高";
            tempComfor = false;
        }else{
            temptip = "被温舒适";
            tempComfor = true;
        }
        let dataDay;
        let date = new Date();
        let year = date.getFullYear()<10?'0'+date.getFullYear():date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        dataDay = year+"-"+month+"-"+day;
        // 时分秒
        let datatext;
        let hours=date.getHours()<10?'0'+date.getHours():date.getHours();
        let minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        let seconds=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
        datatext=hours+":"+minutes+":"+seconds;
        return (
        	<div className="hig-main">
            <section>          
                <header style={{'paddingTop':this.state.headerTop}}></header>
                <div className='content'>
                     <Head nickname={this.state.nickname} img={this.state.img} memberId={this.state.memberId} />
                    {/*舒适模式下样式：com-temData，ok-model显示:舒适，高温模式下样式comup-temData，显示：被温偏高*/}
                    <div className={tempComfor?"temData com-temData":"temData comup-temData"} ref="temData">
                        <p className={tempComfor?"tip com-green ok-model":'tip cor-red ok-model'}>{temptip}</p>
                        <p className='num'>{Number(Number(this.state.bedTemp).toFixed(2)) || '--'}<b>°C</b></p>
                        <p className='datatext'><span>{datatext}</span></p>
                        <p className='dataDay'>{dataDay}</p>
                    </div>
                     {/*舒适模式下字体提示样式：com-green，高温模式下字体提示样式：cor-red*/}
                    <p className="tip com-green">{''}</p>
                    <img className="clife-log" src="../static/img/c_sleep@2x.png" />
                </div>
                <ol className="com-list">
                    <li>
                        <p>当前踢被次数</p>
                        <h1>{this.state.bedTimes || '--'}</h1>
                    </li>
                    <li className="list-border">
                        <p>当前被窝平均温度</p>
                        <h1>{Number(Number(this.state.bedAvgTemp).toFixed(2)) || '--'}<b>°C</b></h1>
                    </li>
                </ol>  
            </section>
            <Link to="/" className='flex temp-btn' id='hsty-btn'>体温模式</Link>
        </div>
        );
    }
}
