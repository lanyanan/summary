/**
 * Created by Administrator on 2016-08-10.
 */
/**
 * Created by Administrator on 2016-08-10.
 */
/**
 * Created by Administrator on 2016-08-09.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;
import  ContentBmi from  './components/ContentBmi.jsx';
import  ContentFatRate from  './components/ContentFatRate.jsx';
import  ContentMusclePrc from  './components/ContentMusclePrc.jsx';
import  ContentWaterPrc from  './components/ContentWaterPrc.jsx';
import  ContentDateMetal from  './components/ContentDateMetal.jsx';
import  ContentBoneWeight from  './components/ContentBoneWeight.jsx';
het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});

het.ready((data)=> {
    Actions.repaint(data);
});

// 接收app推送数据
het.repaint((data)=> {

    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {cn:'bmi',};
        this.listenStore(Store); // 监听Store

    }

    componentDidMount() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        }, false);
        //$('.measurementReport-ul').on('touchend', 'li', function () {
        //    $(this).addClass('measurementReport-active').siblings().removeClass('measurementReport-active');
        //})
    }

    getAttr(e) {
        var eve = e.currentTarget.getAttribute('title');
        this.setState({cn: eve});
    }

    render() {
        //console.log(this.state)
        return (
            <div>
                <header className='get-no-data-header'>
                    <div></div>
                    <div className='get-no-data-header-flex'>
                        <span className='get-no-data-w'>体重</span>
                        <span className='get-no-data-w-data'>{this.state.weight}<span style={{fontSize:'0.3rem'}}>kg</span></span>
                    </div>
                </header>
                <div className='measurementReport-main'>
                    <ul className='measurementReport-ul'>
                        <li onTouchStart={this.getAttr.bind(this)} title='bmi' className={this.state.cn==='bmi'?'measurementReport-active':''}>BMI</li>
                        <li onTouchStart={this.getAttr.bind(this)} title='fatRate' className={this.state.cn==='fatRate'?'measurementReport-active':''}>脂肪率</li>
                        <li onTouchStart={this.getAttr.bind(this)} title='waterPrc' className={this.state.cn==='waterPrc'?'measurementReport-active':''}>水分比例</li>
                        <li onTouchStart={this.getAttr.bind(this)} title='musclePrc' className={this.state.cn==='musclePrc'?'measurementReport-active':''}>肌肉比例</li>
                        <li onTouchStart={this.getAttr.bind(this)} title='dateMetal' className={this.state.cn==='dateMetal'?'measurementReport-active':''}>基础代谢</li>
                        <li onTouchStart={this.getAttr.bind(this)} title='boneWeight' className={this.state.cn==='boneWeight'?'measurementReport-active':''}>骨量</li>
                    </ul>
                    <div id='content'>
                        {this.state.cn === 'bmi' ? <ContentBmi mydata={this.state.bmiRate} myage={this.state.age} mygender={this.state.gender}/> : ''}
                        {this.state.cn === 'fatRate' ? <ContentFatRate mydata={this.state.fatRate} myage={this.state.age} mygender={this.state.gender}/> : ''}
                        {this.state.cn === 'waterPrc' ? <ContentWaterPrc mydata={this.state.moistureRate} myage={this.state.age} mygender={this.state.gender}/> : ''}
                        {this.state.cn === 'musclePrc' ? <ContentMusclePrc mydata={this.state.meatRate} myage={this.state.age} mygender={this.state.gender}/> : ''}
                        {this.state.cn === 'dateMetal' ? <ContentDateMetal mydata={this.state.metabolismRate} myage={this.state.age} mygender={this.state.gender}/> : ''}
                        {this.state.cn === 'boneWeight' ? <ContentBoneWeight mydata={this.state.boneWeight} myage={this.state.age} mygender={this.state.gender}/> : ''}
                    </div>
                </div>
            </div>
        )
    }
}

// 开始渲染
het.domReady(()=> {
    het.setTitle('测量报告');
// 无路由方式
// ReactDOM.render(<App />, document.getElementById('R  OOT'))

// 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});

//<span>暖心小贴士,快速get用秤技巧</span>
//<div>
//<img />
//<ul>
//<li>打开手机蓝牙</li>
//<li>把秤放在平坦切坚硬的地面上,否则会出现较大误差</li>
//<li>脱掉袜子,双脚平均踩在上面,才能准确测出各项指标</li>
//<li>设备数据同步到手机上后,可在APP上查看各项身体指标</li>
//</ul>
//</div>