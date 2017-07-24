import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Toast} from './toast.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class List extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            alarmClock1Hour:'--',
            alarmClock1Minute:'--',
            alarmClock2Hour:'--',
            alarmClock2Minute:'--'
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.showData();
        Actions.getData();
        this.reGetData();
    }
    reGetData() {//
        clearInterval(window.dataTimer);
        window.dataTimer = setInterval(Actions.getData, 6000);
    }
    clockOneSwitch() {
        let num = this.state.alarmClock1Switch==0?1:0;
        let dataJson = {
            alarmClock1Bell:this.state.alarmClock1Bell,
            alarmClock1Hour:this.state.alarmClock1Hour,
            alarmClock1Light:this.state.alarmClock1Light,
            alarmClock1LightMode:this.state.alarmClock1LightMode,
            alarmClock1Minute:this.state.alarmClock1Minute,
            alarmClock1Nap:this.state.alarmClock1Nap,
            alarmClock1Repeat:this.state.alarmClock1Repeat,
            alarmClock1Ring:this.state.alarmClock1Ring,
            alarmClock1Switch:num,
            alarmClock2Bell:this.state.alarmClock2Bell,
            alarmClock2Hour:this.state.alarmClock2Hour,
            alarmClock2Light:this.state.alarmClock2Light,
            alarmClock2LightMode:this.state.alarmClock2LightMode,
            alarmClock2Minute:this.state.alarmClock2Minute,
            alarmClock2Nap:this.state.alarmClock2Nap,
            alarmClock2Repeat:this.state.alarmClock2Repeat,
            alarmClock2Ring:this.state.alarmClock2Ring,
            alarmClock2Switch:this.state.alarmClock2Switch,
            controlNumber:0x03
        }
        Actions.changeClock1Switch(dataJson);
    }
    clockTwoSwitch() {
        let num = this.state.alarmClock2Switch==0?1:0;
        let dataJson = {
            alarmClock2Bell:this.state.alarmClock2Bell,
            alarmClock2Hour:this.state.alarmClock2Hour,
            alarmClock2Light:this.state.alarmClock2Light,
            alarmClock2LightMode:this.state.alarmClock2LightMode,
            alarmClock2Minute:this.state.alarmClock2Minute,
            alarmClock2Nap:this.state.alarmClock2Nap,
            alarmClock2Repeat:this.state.alarmClock2Repeat,
            alarmClock2Ring:this.state.alarmClock2Ring,
            alarmClock2Switch:num,
            alarmClock1Bell:this.state.alarmClock1Bell,
            alarmClock1Hour:this.state.alarmClock1Hour,
            alarmClock1Light:this.state.alarmClock1Light,
            alarmClock1LightMode:this.state.alarmClock1LightMode,
            alarmClock1Minute:this.state.alarmClock1Minute,
            alarmClock1Nap:this.state.alarmClock1Nap,
            alarmClock1Repeat:this.state.alarmClock1Repeat,
            alarmClock1Ring:this.state.alarmClock1Ring,
            alarmClock1Switch:this.state.alarmClock1Switch,
            controlNumber:0x03
        }
        Actions.changeClock2Switch(dataJson)
    }
    render() {
        let clockOneSwitch = this.state.alarmClock1Switch==0?"timing-remind-right-off":"timing-remind-right-on";
        let clockTwoSwitch = this.state.alarmClock2Switch==0?"timing-remind-right-off":"timing-remind-right-on";
        let repeat1 = this.state.alarmClock1Repeat==0?"仅一次":this.state.alarmClock1Repeat==192?"周末":"工作日";
        let repeat2 = this.state.alarmClock2Repeat==0?"仅一次":this.state.alarmClock2Repeat==192?"周末":"工作日";
        let clockOneHour =(this.state.alarmClock1Hour=="--")?this.state.alarmClock1Hour:(parseInt(this.state.alarmClock1Hour)<10?("0"+parseInt(this.state.alarmClock1Hour)):parseInt(this.state.alarmClock1Hour))
        let clockOneMin = (this.state.alarmClock1Minute=="--")?this.state.alarmClock1Minute:(parseInt(this.state.alarmClock1Minute)<10?("0"+parseInt(this.state.alarmClock1Minute)):parseInt(this.state.alarmClock1Minute))
        let clockTwoHour = (this.state.alarmClock2Hour=="--")?this.state.alarmClock2Hour:(parseInt(this.state.alarmClock2Hour)<10?("0"+parseInt(this.state.alarmClock2Hour)):parseInt(this.state.alarmClock2Hour))
        let clockTwoMin = (this.state.alarmClock2Minute=="--")?this.state.alarmClock2Minute:(parseInt(this.state.alarmClock2Minute)<10?("0"+parseInt(this.state.alarmClock2Minute)):parseInt(this.state.alarmClock2Minute))
        let colockOne = clockOneHour+":"+clockOneMin;
        let colockTwo = clockTwoHour+":"+clockTwoMin;
        return <div className="lists">
                    <div className="list-timing">
                        <Link to="/Timing?id=1">
                            <div className="list-timing-left">
                                <h3>{colockOne}</h3>
                                <span>{repeat1}</span>
                            </div>
                        </Link>
                        <i className={clockOneSwitch} onTouchStart={this.clockOneSwitch.bind(this)}>
                        </i>
                    </div>
                    <div className="list-timing">
                        <Link to="/Timing?id=2">
                            <div className="list-timing-left" >
                                <h3>{colockTwo}</h3>
                                <span>{repeat2}</span>
                            </div>
                        </Link>
                        <i className={clockTwoSwitch} onTouchStart={this.clockTwoSwitch.bind(this)}>
                        </i>
                    </div>
                    <Toast show={this.state.toastShow} tips={this.state.tips}/>           
               </div>;
    }
}