// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Range} from './Range.jsx';
import {StateModel} from './StateModel.jsx';
import {HEADERTOP, setTitle, initDataFm} from './constants';

let stateModel = new StateModel;

// 创建React组件
export class SelectModel extends BaseComponent {
    constructor(props) {
        super(props);
        setTitle('烘培模式');
        this.state = {
            tempSet: 0,
            timeSet: 0,
            index: 0
        };
        this.listenStore(Store); // 监听Store
    }

    handleTemperatureSet(value) {
        this.setState({'tempSet': value});
    }

    handleWorkTimeSet(value) {
        this.setState({
            'timeSet': value
        });
    }

    startEnd(e) {
        const activeIndex = e.target.getAttribute('data-mode');
        if (activeIndex != this.state.index) {
            this.setState({'index': activeIndex, 'tempSet': 0, 'timeSet': 0, activeIndex: activeIndex});
        }
        //console.log('select  activeIndex',activeIndex);
    }

    modeStart() {
        if (parseInt(this.state.online) == 2) {
            het.toast('设备已离线');
            return false;
        }
        let curWorkMode = this.state.activeIndex || 0;
        let defTemp = parseInt(stateModel.getAll()[parseInt(curWorkMode)].defTemp);
        let defTime = parseInt(stateModel.getAll()[parseInt(curWorkMode)].defTime);
        let setTemp = parseInt(this.state.tempSet == 0 ? defTemp : this.state.tempSet);//设置温度 如果没有选默认
        let setTime = parseInt(this.state.timeSet == 0 ? defTime : this.state.timeSet);//设置时间 如果没有选默认
        Actions.modeStart(parseInt(curWorkMode) + 1, setTemp, setTime);
    }

    render() {
        let activeIndex = this.state.activeIndex || 0;
        let tempSet = this.state.tempSet || 0;//温度设置
        let timeSet = this.state.timeSet || 0;//时长设置

        let minTemp = parseInt(stateModel.getItem(activeIndex).mintemp) || 40;
        let maxTemp = parseInt(stateModel.getItem(activeIndex).maxtemp) || 250;
        let offeTemp = parseInt(stateModel.getItem(activeIndex).defTemp) || 120;

        let minTime = parseInt(stateModel.getItem(activeIndex).mintime) || 5;
        let maxTime = parseInt(stateModel.getItem(activeIndex).maxtime) || 180;
        let offeTime = parseInt(stateModel.getItem(activeIndex).defTime) || 5;
        if (tempSet == 0) {
            tempSet = offeTemp;
        }
        if (timeSet == 0) {
            timeSet = offeTime;
        }
        let textTime = initDataFm(parseInt(timeSet / 60)) + ":" + initDataFm(timeSet % 60);
        return (<section className="SetMode">
            <div style={{height: HEADERTOP + 'px', width: '100%', backgroundColor: 'rgb(76,145,252)'}}></div>
            <div className='modeSel'>
                {stateModel.getAll().map(
                    (item, index) => {
                        return (
                            <div data-index={index} data-mode={index} key={index} onTouchEnd={this.startEnd.bind(this)}>
                                <i className={item.photo + ' ' + (index == activeIndex ? 'active' : '')}
                                   data-mode={index}></i><span data-mode={index}
                                                               className={(index == activeIndex ? 'active' : '')}>{item.name}</span>
                            </div>
                        );
                    })
                }
            </div>

            <div className="mode-ctrl">
                <p className="selectTime">烘焙温度: {tempSet}℃</p>
                <Range value={tempSet} min={minTemp} max={maxTemp} rate={5} fnFeedback={this.handleTemperatureSet.bind(this)}/>
                <p className="selectTime">烘焙时长: {textTime}</p>
                <Range value={timeSet} min={minTime} max={maxTime} type='time' rate={1}
                       fnFeedback={this.handleWorkTimeSet.bind(this)}/>
            </div>
            <div className='start' onTouchEnd={this.modeStart.bind(this)}>启动</div>
        </section>);
    }
}

