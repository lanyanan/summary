'use strict';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const  {Link} = ReactRouter;
const  appData = {

};
const isFault = () => {
    if(appData.networkavailable==2){
        console.log('请检查网络');
        return '请检查网络';
    }
    if(appData.online==2){
        console.log('设备与APP已断开连接!');
        return '设备与APP已断开连接!';
    }
    return false;
}

// 接收app推送数据
export const WaterPlate = React.createClass({
    getInitialState: function(){
        return {};
    },
    componentWillReceiveProps:function(next){
        //console.log('-------isClicked当前，之前,',next.washData.isClicked,next.MachineOperationState,this.props.MachineOperationState,next.washData.online,next.washData.networkavailable);
        if(next.MachineOperationState==1 && appData.washStart!=1 && next.washData.online!==2 && next.washData.networkavailable!==2){
            //console.log('执行定时器');
            appData.washStart=1;
            appData.timerA = setInterval(function(){
                if(document.getElementsByClassName("eleName").length>0){
                    document.getElementsByClassName("eleName")[0].className = "washContent-i";
                }
            }.bind(this),30000/74);
        };
        //washStart字段用于防止定时器重复触发，只有当washStart=0时才能触发开启动画定时器
        if(appData.timerA && (next.washData.MachineOperationState!=1 || next.washData.online==2 ||next.washData.networkavailable==2 )) {
            appData.washStart=0;
            clearInterval(appData.timerA);
            $(".washContent-i").attr('class','eleName');
            //console.log('如果有定时器，清除定时器');
        }
    },
	render: function() {
        let washData= this.props.washData;
        let SourceWaterTdsValue = washData.SourceWaterTdsValue;
        let PureWaterTdsValue = washData.PureWaterTdsValue;
       // console.log('---PureWaterTdsValue--',PureWaterTdsValue)
        let quality = (v)=>{
            return isNaN(parseFloat(v))==false &&
                   (v>=1000 && '水质极差' || v>=500 && '水质较差' || v>=200 && '有较多杂质' || v>=100 && '有些许杂质'||v>=50 && '有少量杂质' || v>=0 && '水质极佳') ||
                   '加载中...'
        };
        let WaterQuality = quality(PureWaterTdsValue);
        let item = [];
        for(let i=0;i<=74;i++){
            item[i]=i*5;
        }
        let washStatus = washData.MachineOperationState;
        let washIndex = (washData.networkavailable==2 || washData.online==2 ||  washStatus!=1 || washData.washOver==1) ? 'wash-index':'hidden';
        let washPlate = (washData.online==2 ||  washData.networkavailable==2 || washStatus!=1 || washData.washOver==1) ? 'hidden':'wash-plate';

        let toggleMinify =  washData.slide==2? 'index-top normal' : 'index-top minify';
        let washCircle = 'eleName';
        let washSatusTxt = ['待机','设备冲洗中','制水','水满'][washStatus];
        return (
            <section className={toggleMinify} id="waterPlate">

                <figure>
                    <div className={washIndex} id="washIndex">
                        <p className="top-title">自来水水质：{SourceWaterTdsValue}TDS</p>
                        <Link to="waterLines" className="flex flex-column top-plate">
                            <figure className="flex-cell top-plate-a">TDS</figure>
                            <figure className="flex-cell top-plate-b">{PureWaterTdsValue}</figure>
                            <figure className="flex-cell top-plate-c"><span>{WaterQuality}</span></figure>
                        </Link>
                    </div>
                </figure>
                <figure className={washPlate} id="washPlate">
                    <div className="washContent" id="washContent">
                        <p>{washSatusTxt}</p>
                        {item.map(function(o,index) {
                             return(
                             <i key={index} className={washCircle} style={{'-webkitTransform': 'rotate('+o+'deg)', transform: 'rotate('+o+'deg)'}}></i>
                             )
                        }.bind(this))}
                    </div>
                </figure>
                <span className='wash' data-wash={washStatus} onClick={this.props.washDevice}>冲洗</span>
            </section>
	    );
	}
});
