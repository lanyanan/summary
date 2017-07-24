import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {HeaderTab} from './HeaderTab.es6';
import {LeftTab} from './leftTab.es6';
import {ReportDetail} from './ReportDetail.es6';
import {ChartsTab} from './chartsTab.es6';

// 创建React组件
export class SleepReport extends BaseComponent {
    constructor(props) {
        super(props);
        let date = this.formatDateTime(new Date());
        this.state = {
            propHash:"report",
            reportDateList : [{dataTime:date+"",sleepQuality:"暂无数据"}]
        };
        this.keyDownEvent = this.keyDownEvent.bind(this);
        this.listenStore(Store); // 监听Store
        this.hashFlag = "report";
    }
    formatDateTime(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    keyDownEvent(e){
        if(e.keyCode == 38 || e.keyCode == 40){
            this.isHeader = false;
        }else if(e.keyCode == 37){
            if(this.state.propHash == 'out') return;
            if(this.state.propHash == 'report'){
                this.setState({
                    propHash: "out"
                });
            }else if(this.state.propHash == 'time'){
                this.setState({
                    propHash: "report"
                });
            }
            this.isHeader = true;
        }else if(e.keyCode == 39){
            if(this.state.propHash == 'time') return;
            if(this.state.propHash == 'report'){
                this.setState({
                    propHash: "time"
                });
            }else if(this.state.propHash == 'out'){
                this.setState({
                    propHash: "report"
                });
            }
            this.isHeader = true;
        }else if(e.keyCode == 13 && this.isHeader &&
                 this.hashFlag.indexOf(this.state.propHash) == -1){
            if(this.state.propHash == "time"){
                location.hash = "time";
            }else if(this.state.propHash == "out"){
                localStorage.clear();
                location.hash = "login";
            }

        }
    }
    componentDidMount() {
        window.addEventListener('keydown',this.keyDownEvent);
        // Actions.getRecentDateList();
    }
    componentWillMount() {
        Actions.confirmLogin('report');
    }
    componentWillUnmount() {
        window.removeEventListener('keydown',this.keyDownEvent);
    }
    render() {
        let reportDateList = this.state.reportDateList;
        return (
            <div className="bg-img">
                <HeaderTab hash={this.state.propHash} />
                {(!reportDateList || reportDateList.length === 0) ?
                	<section className="noData">
                		暂无数据
                		<label>设备未使用或数据不能满足生成报告！</label>
                	</section>
                	:
	                <section className="reportMain">
	                    <LeftTab dateList={reportDateList} />
	                    <ReportDetail heartRate={this.state.heartRate} respirationRate={this.state.respirationRate}
	                    bodyMovement={this.state.bodyMovement} sleepQuality={this.state.sleepQuality}
	                    sleepType={this.state.sleepType} analysisDetail={this.state.analysisDetail}
	                    sleepRank={this.state.sleepRank} fallTime={this.state.fallSleepDuration}
	                    shallowTime={this.state.lightSleepDuration} deepTime={this.state.deepSleepDuration} />
	                    <ChartsTab sleepScope={this.state.sleepScope} sleepCount={this.state.asleepDuration}
	                    heartRate={this.state.heartRate} respirationRate={this.state.respirationRate}
	                    bodyMovement={this.state.bodyMovement} reportLoaded={this.state.reportChartGet}
	                    threeLoaded={this.state.threeChartGet} />
	                </section>
	            }
            </div>
        );
    }
}