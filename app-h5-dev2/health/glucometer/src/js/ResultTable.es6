import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class ResultTable extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render(){
        return <table className="report-table">
                <thead>
                    <tr>
                        <td colSpan="2" className="ta-l">{this.props.date}</td>
                        <td colSpan="2" className="ta-r"><a href="health://skip_url/reference.html" style={{visibility:this.props.showRefer?'visible':'hidden'}}><i className="h"></i> 血糖标准参考</a></td>
                    </tr>
                </thead>
                <tbody>
                {this.props.results.map((it, idx)=>{
                    let time = Funs.dateFormat(it.recordTime, 'hh:mm', true);
                    let hl = (it.resultName||'').indexOf('高')>-1 ? 'high' : ((it.resultName||'').indexOf('低')>-1 ? 'low' : '');
                    return <tr key={idx}>
                        <td className="title">{it.personalStatusName}</td>
                        <td className={'mmol ta-c ' + hl}>{it.bloodGlucoseValue}mmol/L</td>
                        <td className="conc">{it.resultName}</td>
                        <td className="time ta-r">{time}</td>
                    </tr>;
                })}
                </tbody>
            </table>;
    }
};