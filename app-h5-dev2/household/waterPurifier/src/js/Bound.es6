/**
 * 用水详情页面
 */
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
import {Bubble} from './Bubble.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
export class Bound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {renderChart:false};
        Store.listen((data)=>{
            if(!this.isMounted(this)) return;
            this.setState(data)
        }); // 监听Store
    }
    touchStart(e) {
        e.preventDefault();
        location.href="xt://xt_more";
    }
    componentDidMount(){
        Actions.refresh();
        Actions.getWeekLogData();
        setInterval(Actions.getWeekLogData, 60000);
    }
    isMounted(component){
      try {
        ReactDOM.findDOMNode(component);
        return true;
      } catch (e) {
        return false;
      } 
    }
    componentWillReceiveProps(next){
        if(next.chartData.xAxis.data.length>0){
            if(!this.state.renderChart){
                var myChart = echarts.init(document.getElementById('charts'));
                myChart.setOption(next.chartData);
                this.setState({
                    renderChart:true
                });
            }
        }
    }
    format(d){
        return d >= 10 ? d : ("0"+d);
    }
    render() {
        let now=(new Date()).getTime();
        let pureWaterTds = this.state.pureWaterTds;
        let sourceWaterTds = this.state.sourceWaterTds;
        let waterTemp = this.state.waterTemp;
        let flowMeter = this.state.flowMeter<1000?this.state.flowMeter+"升":(this.state.flowMeter/1000).toFixed(2)+"吨";
        let mTime=this.state.endBillTime-now;
        mTime = (mTime>0&&mTime<86400000)? 86400000:mTime;
        mTime = mTime<0 ? 0 :mTime;
        let day=this.format(Math.floor(mTime/1000/60/60/24));
        return <div  id="panel-scroller">
            <div className="boundMain">
                <div className="boundTop">
                    <div className="boundRing">
                        <div className="boundRingContent">
                            <div className="sourceWaterData">
                                <p>净化前：<span  className="sourceTDSNumber">{sourceWaterTds}</span><span> TDS</span></p>
                            </div>
                            <div className="runningData">
                                <p>净化后<span className="TDSNumber">{pureWaterTds}</span><span>TDS</span></p>
                                <div className="line"></div>
                                <p><span className="tempreture">水温</span><span className="tempretureNumber"> {waterTemp} </span><span> ℃</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="bubble">
                         <Bubble />
                    </div>
                    {(mTime>0)?<div className="stateDiscrib">
                        <p><span>服务剩余时间</span><span  className="serviceTime">{day}</span>天，总计用水<span  className="waterNumber">{flowMeter}</span></p>
                    </div>:
                    <div className="serviceExpire">
                        <span>您的租凭服务已到期。</span>
                    </div>}
                </div>
                <h3>
                    <span>本周用水日志</span>
                    <a onTouchStart={this.touchStart.bind(this)}>更多 </a>
                </h3>
                <div id="charts"></div>
                    <div id="cover" className="cover">
                   <div id="loading">
                        <img src="../static/img/loading.gif" />
                        <span>数据加载中...</span>
                    </div>
                    <div id="warning">
                        <img src="../static/img/warning.png" />
                        <span>网络错误，数据加载失败</span>
                    </div>
                </div>
            </div>

        </div>
    }
};
