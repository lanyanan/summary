// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.jsx';
import {StateModel} from './StateModel.jsx';

let stateModel = new StateModel;

// 创建React组件
export class SelectModel extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '模式', setNavRightBtnHiden: 1}));
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            Timehour: 0,
            Timemin: 0,
        };
        this.listenStore(Store); // 监听Store
        this.submitClock = function (h, m) {
            //console.log("h"+h+'m'+m);
            Actions.selectTime(h, m);
        };
        const _this = this;
        this.cancelClock = function () {
            //console.log("取消");
            _this.setState({
                selectshow: false
            });
        };
    }

    startEnd(e) {
        let activeIndex = e.target.getAttribute('data-index');
        this.setState({Timehour: 0, Timemin: 0, activeIndex: activeIndex});//选择模式
        console.log('select  activeIndex',activeIndex);
    }

    timeClock(e) {
        this.setState({
            selectshow: true
        });
    }

    modelStart() {
        if (parseInt(this.state.online) == 2) {
            het.toast('设备已离线');
            return false;
        }
        //console.log('modelStart');
        let Hour = parseInt(this.state.hour === undefined ? 0 : this.state.hour);//预约小时
        let Min = parseInt(this.state.minute === undefined ? 0 : this.state.minute);//预约分钟
        let CurWorkModel = this.state.activeIndex || 0;
        console.log('modelStart' + 'CurWorkModel='+CurWorkModel + 'Hour='+Hour+'Min='+Min);
        Actions.modelStart(parseInt(CurWorkModel), Hour, Min);
    }

    render() {
        let activeIndex = this.state.activeIndex || 0;
        //console.log('activeIndex',activeIndex);
        let selectshow = this.state.selectshow;
        let selectTitle = '预约时间';
        let statusname = '后启动';
        let hour = parseInt(this.state.hour);
        let minute = parseInt(this.state.minute);
        let remainTime = (hour > 0 || minute > 0) ? ((hour > 0 ? hour + '小时' : '') + (minute > 0 ? minute + '分' : '' ) + '后开始工作') : '- -';

        return (<section className="SetModel">
            <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: 'rgb(50,133,255)'}}></div>
            <div className='modelSel '>
                {stateModel.getAll().map(
                    (item, index) => {
                        return (
                            <div data-index={index} key={index} onTouchEnd={this.startEnd.bind(this)}>
                                <i className={item.photo + ' ' + (index == activeIndex ? 'active' : '')}
                                   data-index={index}></i>
                                <span data-index={index}
                                      className={(index == activeIndex ? 'active' : '')}>{item.name}</span>
                            </div>
                        );
                    })
                }
            </div>

            <div className="startModel">
                <div className='modelTime'>
                    <div className='timeOrder' onTouchEnd={this.timeClock.bind(this)}>
                        <span>预约时间</span>
                        <span>{remainTime}<i></i></span>
                    </div>
                    <div className='start' onTouchEnd={this.modelStart.bind(this)}>
                       启动
                    </div>
                </div>
                <TimeSelect title={selectTitle} minuteshow={true} hourshow={true} hourstep={1}
                            minutestep={1} defaulthour={1} statusname={statusname} cancelClock={this.cancelClock}
                            submitClock={this.submitClock} show={selectshow}
                            hourarray={['00', '01', '02', '03', '04', '05',
                                '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']}
                            minutearr={['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']}/>
            </div>
        </section>);
    }
}

