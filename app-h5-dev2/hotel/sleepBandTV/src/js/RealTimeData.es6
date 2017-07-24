import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {HeaderTab} from './HeaderTab.es6';
import {RealTimeChart} from './realTimeChart.es6';
import {LeftSide} from './leftSide.es6';

// 创建React组件
export class RealTimeData extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            sleepStatus : 0,
            propHash : "time"
        };
        this.keyDownEvent = this.keyDownEvent.bind(this);
        this.listenStore(Store); // 监听Store
        this.hashFlag = "time";
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
            if(this.state.propHash == "report"){
                location.hash = "";
            }else if(this.state.propHash == "out"){
                localStorage.clear();
                location.hash = "login";
            }
        }
    }
    componentDidMount() {
        window.addEventListener('keydown',this.keyDownEvent);
    }
    componentWillMount() {
        Actions.confirmLogin();
    }
    componentWillUnmount() {
        window.removeEventListener('keydown',this.keyDownEvent);
    }
    getSleepStatus(status){
        if(status == this.state.sleepStatus) return;
        this.setState({
            sleepStatus : status
        });
    }
    render() {
        return (
            <div className="time bg-img">
                <HeaderTab hash={this.state.propHash} />
                <LeftSide  sleepStatus = {this.state.sleepStatus}/>
                <section className="rightSide">
                    <RealTimeChart getSleepStatus={this.getSleepStatus.bind(this)} />
                </section>
            </div>
        );
    }
}