/**
 * 用水详情页面
 */
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
import {Bubble} from './Bubble.jsx';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';

export class Bound extends React.Component {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            renderChart: false,
            headerTop: isAndroid ? 50 : 64
        };
        Store.listen((data)=> {
            if (!this.isMounted(this)) return;
            this.setState(data)
        }); // 监听Store
    }

    touchStart(e) {
        e.preventDefault();
        location.href = "xt://xt_more";
    }

    componentDidMount() {
        Actions.refresh();
        Actions.getWeekLogData();
        setInterval(function(){
            Actions.getWeekLogData();
            //console.log('ref')
        },60000);
    }

    isMounted(component) {
        try {
            ReactDOM.findDOMNode(component);
            return true;
        } catch (e) {
            return false;
        }
    }

    componentWillReceiveProps(next) {
        if (next.chartData.xAxis.data.length > 0) {
            if (!this.state.renderChart) {
                var myChart = echarts.init(document.getElementById('charts'));
                myChart.setOption(next.chartData);
                this.setState({
                    renderChart: true
                });
            }
        }
    }

    format(d) {
        return d >= 10 ? d : ("0" + d);
    }

    locationHref(e) {
        e.preventDefault();
        location.href = 'xt://xt_more_daily_record';
    }

    stopE(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        let now = (new Date()).getTime(), items = this.state.macFilter ? this.state.macFilter : [];
        //console.log('----------------items', items, items instanceof Array);
        let pureWaterTds = this.state.pureWaterTds;
        let sourceWaterTds = this.state.sourceWaterTds;
        let waterTemp = this.state.waterTemp;
        let flowMeter = this.state.flowMeter < 1000 ? this.state.flowMeter + "升" : (this.state.flowMeter / 1000).toFixed(2) + "吨";
        let mTime = this.state.endBillTime - now;
        mTime = (mTime > 0 && mTime < 86400000) ? 86400000 : mTime;
        mTime = mTime < 0 ? 0 : mTime;
        let day = this.format(Math.floor(mTime / 1000 / 60 / 60 / 24));

        return <div id="panel-scroller">
            <div className="boundMain">
                <div className="boundTop">
                    <div className="boundRing">
                        <div className="boundRingContent">
                            <div className="sourceWaterData">
                                <p><span className="sourceTDSNumber"></span><span>净化前/后(TDS)</span></p>
                            </div>
                            <div className="runningData">
                                <p><span className="TDSNumber">{sourceWaterTds}/{pureWaterTds}</span>
                                </p>
                                <div className="line"></div>
                                <p><span className="tempreture">水温</span><span
                                    className="tempretureNumber"> {waterTemp} </span><span> ℃</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="bubble" onTouchStart={this.stopE}>
                        <Bubble />
                    </div>
                    {(mTime > 0) ? <div className="stateDiscrib">
                        <p><span>服务剩余时间</span><span className="serviceTime">{day}</span>天，总计用水<span
                            className="waterNumber">{flowMeter}</span></p>
                    </div> :
                        <div className="serviceExpire">
                            <span>您的租凭服务已到期。</span>
                        </div>}
                </div>
                <span className='purifierMessage-title'>滤芯状态</span>
                <ul className='purifierMessage'>
                    {items.map(function (it, idx) {
                        return <li className='purifierMessage-li' key={idx} title={idx}>
                            <div className='purifierMessage-num'>{idx + 1}</div>
                            <div className='purifierMessage-content'>
                                <dl className='purifierMessage-content-dl'>
                                    <dt>{it.filterName}</dt>
                                    <dd>预计剩余天数{it.remainderDay}天</dd>
                                </dl>
                                <a className='purifierMessage-content-r'
                                   style={{color:it.scale<=0? '#ff3600':'#18dffb'}}>{it.scale <= 0 ? '已过期' : it.scale * 100 + '%'}</a>
                            </div>
                        </li>
                    }.bind(this))
                    }
                </ul>
                <h3>
                    <span>本周用水日志</span>
                </h3>
                <div id="charts"></div>
                <a className='more-mes' onTouchEnd={this.locationHref}>查看更多用水日志</a>
                <div id="cover" className="cover">
                    <div id="loading">
                        <img src="../static/img/loading.gif"/>
                        <span>数据加载中...</span>
                    </div>
                    <div id="warning">
                        <img src="../static/img/warning.png"/>
                        <span>网络错误，数据加载失败</span>
                    </div>
                </div>
            </div>

        </div>
    }
}
;
//{items.map(function (it, idx) {
//        return <li className='purifierMessage-li' key={idx}>
//            <div className='purifierMessage-num'>{{idx} + 1}</div>
//            <div className='purifierMessage-content'>
//                <dl className='purifierMessage-content-dl'>
//                    <dt>{it.filterName}</dt>
//                    <dd>预计剩余天数{it.remainderDay}天</dd>
//                </dl>
//                <a className='purifierMessage-content-r' style={{color:it.scale<=0? '#18dffb':'#ff3600'}}>{it.scale <= 0 ? '已过期' : it.scale * 100}%</a>
//            </div>
//        </li>
//    }).bind(this)
//} style={{marginTop:this.state.headerTop+'px'}}

