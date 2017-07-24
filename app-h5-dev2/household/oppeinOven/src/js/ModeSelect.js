import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { Actions } from './Actions';
import { Store } from './Store';
import Range from './range';
import { TimeSelect } from './TimeSelect';
import { STATE, RUNMODE, MINTEMPERATURE, MAXTEMPERATURE, DEFAULTTEMPERATURE, DATEARRAY, addZero, TOPDISTANCE, setTitle } from './constants';

export class ModeSelect extends BaseComponent {
    constructor(props) {
        super(props);
        // this.listenStore(Store);
        this.state = { ...STATE, minTemperature: 50, maxTemperature: 250, reservationshow: false, mode:1 };
        this.handleTemperatureSet = this.handleTemperatureSet.bind(this);
        this.handleModeSet = this.handleModeSet.bind(this);
        this.handleWorkTimeSet = this.handleWorkTimeSet.bind(this);
        this.handleReservationSet = this.handleReservationSet.bind(this);
        this.handleCancelReserv = this.handleCancelReserv.bind(this);
        this.handleSubmitReserv = this.handleSubmitReserv.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }
    componentWillMount() {
        setTitle('模式');
    }
    handleTemperatureSet(value) {
        this.setState({ 'temperatureset': value });
    }
    handleModeSet(e) {
        const newMode = +e.target.getAttribute('data-mode');
        if (newMode != this.state.mode) {
            this.setState({ 'mode': newMode, 'temperatureset': DEFAULTTEMPERATURE[newMode] });
        }
    }
    handleWorkTimeSet(value) {
        this.setState({
            'workhour': parseInt(value / 60),
            'workmin': value % 60
        });
    }
    handleReservationSet() {
        this.setState({ 'reservationshow': true });
    }
    handleCancelReserv() {
        this.setState({ 'reservationshow': false });
    }
    handleSubmitReserv(h, m) {
        this.setState({
            'reservationhour': +h,
            'reservationmin': +m,
            'reservationshow': false
        });
    }
    handleStart() {
        const {temperatureset, workhour, workmin, reservationhour, reservationmin, mode } = this.state;
        const power = 1;
        const pause = 2;
        Actions.sendData({ power, temperatureset, workhour, workmin, reservationhour, reservationmin, mode, pause });
        history.back();
    }
    render() {
        const {temperatureset, minTemperature, maxTemperature, mode, remainingreservationtimehour, remainingreservationtimemin, reservationhour, reservationmin, workhour, workmin} = this.state;
        return (
            <div className="mode">
                <div className="mode-nav" style={{ height: TOPDISTANCE }}></div>
                <div className="mode-list">
                    <ul>
                        {RUNMODE.map((cur, index, array) => {
                            if (index > 0 && index < 9) {
                                return (
                                    <li key={index} onTouchTap={this.handleModeSet} data-mode={index}>
                                        <img data-mode={index} src={`../static/img/icon-mode${index}${index == this.state.mode ? '' : '-off'}.png`} />
                                        <p data-mode={index} className={`${index == this.state.mode ? 'mode-selected' : ''}`}>
                                            {RUNMODE[index]}
                                        </p>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className="mode-txt"></div>
                <div className="mode-ctrl">
                    <h3>烘焙温度  {temperatureset}℃</h3>
                    <Range value={temperatureset} min={MINTEMPERATURE[mode]} max={MAXTEMPERATURE[mode]} fnFeedback={this.handleTemperatureSet} />
                    <h3> 烘焙时长  {addZero(workhour)} : {addZero(workmin)} <span>(小时)</span></h3>
                    <Range value={workhour * 60 + workmin} min={1} max={599} type='time' fnFeedback={this.handleWorkTimeSet} />
                    <div className="reservation" onTouchTap={this.handleReservationSet}>
                        <span className="reservation-txt">预约时间</span>
                        <span className="reservation-num">
                            <span>{(reservationhour == 0 && reservationmin == 0) ? '- -' : `${reservationhour}小时${reservationmin}分钟后工作`}</span>
                            <i className="reservation-icon"></i>
                        </span>
                    </div>
                </div>
                <div className="reservation-start" onTouchTap={this.handleStart}>启动</div>
                <TimeSelect title='预约时间' show={this.state.reservationshow} maxhour={10} minutearr={DATEARRAY} cancelClock={this.handleCancelReserv} submitClock={this.handleSubmitReserv} />
            </div>
        )
    }
}
