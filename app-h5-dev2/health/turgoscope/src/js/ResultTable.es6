import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class ResultTable extends BaseComponent {
    constructor(props) {
        super(props);
    }
    getBP(data) {
        let result = 0; // 0-正常，1-低血压，2-高血压
        if (data.diastolicPressure<60 || (data.systolicPressure<90)) {
            result = 1;
        } else if (data.diastolicPressure>=90 || (data.systolicPressure>=140)) {
            result = 2;
        }
        return result;
    }
    render(){
        // 渲染模式renderMode：1-高低血压分行显示，2-高低血压同行显示
        let renderMode = this.props.renderMode ? this.props.renderMode : 1;
        return <table className="report-table">
                <thead>
                    <tr>
                        <td colSpan="2" className="ta-l">{this.props.date}</td>
                        <td colSpan="2" className="ta-r"><a href="#reference" style={{visibility:this.props.showRefer?'visible':'hidden'}}><i className="h"></i> 血压心率标准参考</a></td>
                    </tr>
                </thead>
                {this.props.results.map((it, idx)=>{
                    let bp = this.getBP(it);
                    let time = Funs.dateFormat(it.dataTime, 'hh:mm', true);
                    let hl = ['', 'low','high'][bp];
                    let resultName = ['正常', '低压', '高压'][bp];
                    let hasHR = !isNaN(it.heartRate); // 判断是否有心率数据
                    let hr = it.heartRate < 60 ? 1 : (it.heartRate > 100 ? 2 : 0);
                    let hrName = ['正常', '偏低', '偏高'][hr];
                    let hrClass = ['', 'low','high'][hr];
                    if (this.props.renderMode==2) {
                        return <tbody key={idx}>
                            <tr>
                                <td className="title">血压</td>
                                <td className={'mm ta-r ' + hl}><b>{it.systolicPressure}/{it.diastolicPressure}</b>mmHg</td>
                                <td className={'rs ta-c '+hl}><i>{resultName}</i></td>
                                <td className="ta-r time">{time}</td>
                            </tr>
                            {hasHR ? (
                                <tr>
                                    <td>脉搏</td>
                                    <td className={'mm ta-r ' + hrClass}><b>{it.heartRate}</b>次/分钟</td>
                                    <td className={'ta-c rs ' + hrClass}><i>{hrName}</i></td>
                                    <td>&nbsp;</td>
                                </tr>
                            ) : null}
                        </tbody>;
                    } else {
                        return <tbody key={idx}>
                            <tr>
                                <td className="title">高压</td>
                                <td className={'mm ta-c ' + hl}><b>{it.systolicPressure}</b>mmHg</td>
                                <td rowSpan="2" className={'rs ta-c '+hl}><i>{resultName}</i></td>
                                <td className="ta-r time">{time}</td>
                            </tr>
                            <tr>
                                <td>低压</td>
                                <td className={'mm ta-c ' + hl}><b>{it.diastolicPressure}</b>mmHg</td>
                                <td>&nbsp;</td>
                            </tr>
                            {hasHR ? (
                                <tr>
                                    <td>脉搏</td>
                                    <td className={'mm ta-c ' + hrClass}><b>{it.heartRate}</b>次/分钟</td>
                                    <td className={'ta-c rs ' + hrClass}><i>{hrName}</i></td>
                                    <td>&nbsp;</td>
                                </tr>
                            ) : null}
                        </tbody>;
                    };
                })}
            </table>;
    }
};