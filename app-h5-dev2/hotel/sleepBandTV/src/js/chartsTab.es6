import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';

// 创建React组件
export class ChartsTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let sleepScope = this.props.sleepScope || '2017-03-13 00:00:00~2017-03-14 00:00:00';
        let arr = sleepScope.split('~');
        let hour1 = Number(arr[0].split(' ')[1].split(':')[0])+8;
        let hour2 = Number(arr[1].split(' ')[1].split(':')[0])+8;
        let minute1 = arr[0].split(' ')[1].split(':')[1];
        let minute2 = arr[1].split(' ')[1].split(':')[1];
        hour1 = hour1>=24 ? hour1-24 : hour1;
        hour2 = hour2>=24 ? hour2-24 : hour2;
        hour1 = hour1<10 ? "0"+hour1 : hour1;
        hour2 = hour2<10 ? "0"+hour2 : hour2;
        sleepScope = hour1+":"+minute1+"-"+hour2+":"+minute2;
        let sleepCount = this.props.sleepCount || 0;
        let hour = Math.floor(sleepCount/60);
        let minute = sleepCount - hour*60;
        hour = hour<10 ? "0"+hour : hour;
        minute = minute<10 ? "0"+minute : minute;
        sleepCount = hour+"h"+minute+"min";
        return (
            <section className="chartsTab" id="reportCont">
                <div className="reportTime">
                    <label>在床时段</label>
                    <i>{sleepScope || "22:12-10:21"}</i>
                    <label>睡眠时长</label>
                    <i>{sleepCount || "16小时15分钟"}</i>
                </div>
                <div className="reportChart">
                    <div style={{visibility:this.props.reportLoaded?"visible":"hidden"}}
                         id="reportSleepChart" className='report-sleep-chart-down' ></div>
                    <div className="loading" style={{display:this.props.reportLoaded?"none":"block"}}>
                        <img src="../static/img/loading.gif" />
                    </div>
                </div>
                <div className="reportChart">
                    <div style={{visibility:this.props.threeLoaded?"visible":"hidden"}}
                         id="reportHeartChart" className='report-sleep-chart-down' ></div>
                    <label className="averageValue">平均<span> {this.props.heartRate}</span>次/分</label>
                    <div className="loading" style={{display:this.props.threeLoaded?"none":"block"}}>
                        <img src="../static/img/loading.gif" />
                    </div>
                </div>
                <div className="reportChart">
                    <div style={{visibility:this.props.threeLoaded?"visible":"hidden"}}
                         id="reportBreathingChart" className='report-sleep-chart-down' ></div>
                    <label className="averageValue breathAverage">平均<span> {this.props.respirationRate}</span>次/分</label>
                    <div className="loading" style={{display:this.props.threeLoaded?"none":"block"}}>
                        <img src="../static/img/loading.gif" />
                    </div>
                </div>
                <div className="reportChart" >
                    <div style={{visibility:this.props.threeLoaded?"visible":"hidden"}}
                         id="reportOverChart" className='report-sleep-chart-down' ></div>
                    <label className="averageValue trunAverage">
                        累计<span> {this.props.bodyMovement}</span>次
                    </label>
                    <div className="loading" style={{display:this.props.threeLoaded?"none":"block"}}>
                        <img src="../static/img/loading.gif" />
                    </div>
                </div>
            </section>
        );
    }
}