import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {EchartsHeart } from './EchartsHeart.jsx';
import {PageConnect }  from './PageConnect.jsx';
const {Router, Route, hashHistory} = ReactRouter;
import {isIOS } from'./LocalFuns.jsx';

het.repaint((data, type)=>{
    Actions.repaint(data, type);
});
let firstEnter = true;
export class PageHeart extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            heartrate: '--',
            heartratemax:'--',
            heartratemin:'--',
            heartrateavg:'--',
            measurestatus: 0,
            connect: 'syncOk'
        };
        this.listenStore(Store);
        Actions.local();
    }
    componentWillReceiveProps(next){
        //console.log('----measurestatus-----',this.state.measurestatus,next.measurestatus)
    }
    componentWillUpdate(next){}
    componentDidMount(){
        this.setState({
            heartrate:'--',
            heartratemax:'--',
            heartratemin:'--',
            heartrateavg:'--',
        });
        Actions.getHeart({
            measurestatus: 0
        });
    }
    conponentWillUnmount(){}
    drawHeart(e){
        Actions.getHeart({
            measurestatus: !this.state.measurestatus
        });
        this.setState({
            measurestatus: !this.state.measurestatus
        });
    }
    render() {
        let measurestatus =  this.state.measurestatus!=undefined ? this.state.measurestatus:0,
            max = this.state.heartratemax,
            min = this.state.heartratemin,
            avg = this.state.heartrateavg =='--'?'--':parseInt(this.state.heartrateavg);
        if(this.state.connect=='scan' ) window.location.href ='#/PageConnect';
        // console.log('---------心率----连接---measurestatus',this.state.heartrate,this.state.measurestatus);
        // console.log('firstEnter',firstEnter.toString());
        // console.log(measurestatus,'---------measurestatus--------');
        return(
            <main className={'heartrate' +isIOS}>
                <nav className={'nav' + isIOS}>
                    <a onClick={()=>{window.location.href = '#/'}}> </a>
                    <a>心率</a>
                    <a className="none"> </a>
                </nav>
                <section className="times">
                    <h2>{measurestatus == 0 ?'--':this.state.heartrate}</h2>
                    <div>次/分</div>
                </section>
                <section className={"mileage flex"}>
                    <aside className="flex-cell"><h2>{max}</h2><h5>最高值</h5></aside>
                    <aside className="flex-cell"><h2>{avg}</h2><h5>平均值</h5></aside>
                    <aside className="flex-cell"><h2>{min}</h2><h5>最低值</h5></aside>
                </section>
                <EchartsHeart heartrate={this.state.heartrate} measurestatus={measurestatus} />
                <section className="measure">
                    <a onTouchStart={this.drawHeart.bind(this)}
                       href={"request://"+(measurestatus==0? 'end':"start")}
                       className={ measurestatus ?'stop':"start"}>
                       {
                           measurestatus ? '停止' : "开始"
                       }
                    </a>
                </section>
            </main>
        )
    }
}