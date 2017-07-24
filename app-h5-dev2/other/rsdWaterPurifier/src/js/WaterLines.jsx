import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {EchartsBar } from './EchartsBar.jsx';
import {EchartsLiner } from './EchartsLiner.jsx';
export class WaterLines extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            codes:this.state.codes,
            waterlines:[],
            count: 1,
            type: 0
        };
        this.listenStore(Store); // 监听Store
        this.changeType = this.changeType.bind(this);
    }
    componentDidMount() {
        Actions.waterLines(0);
    }
    changeType(e){
        if(e.currentTarget.getAttribute('class')=='flex-cell active') return false;
        let idx = e.currentTarget.getAttribute('data-idx');
        Actions.waterLines(idx);
    }
    render() {
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'ios':'android';
        let changeCycleArray = ['日','月','年'];
        let idx = this.state.type!=undefined ? this.state.type  : 0;
        //let waterlines = this.state.waterlines? this.state.waterlines:[];
        return (
            <main>
                <section className={"charts-area "+navigation}>
                    <div className="liner-box">
                        <i id="liner-title"></i>
                        <EchartsLiner waterlines={this.state.waterlines} renderWaterline={this.state.renderWaterline} />
                    </div>
                    <div className="bar-box">
                        <EchartsBar waterlines={this.state.waterlines} renderWaterline={this.state.renderWaterline} />
                        <i id="bar-title"></i>
                        <div id="change-cycle" className="flex change-type">
                            {changeCycleArray.map(
                                ((element,index)=>{
                                    return(
                                        <span key={index} className={'flex-cell'+( index == idx?' active':'')} data-idx={index} onTouchStart={this.changeType}>{element}</span>
                                    )}).bind(this)
                            )}
                        </div>
                    </div>
                </section>
                <div id="mytoast"></div>
            </main>
        );
    }
};
