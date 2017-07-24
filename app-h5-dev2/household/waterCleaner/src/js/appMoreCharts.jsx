/**
 * Created by Administrator on 2016-09-18.
 */
/**
 * 用户统计页面
 * @prop {}
 * @prop {}
 */
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

import {WeekComp} from './components/WeekComp.jsx';
import {MonthComp} from './components/MonthComp.jsx';
import {YearComp} from './components/YearComp.jsx';
//import {Router, Route, Link } from 'react-router'
var {Router, Route, hashHistory,RouterContext} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
        //debugMode: 'print', // 打印调试数据
        //updateFlagMap: {}
    });
});

//het.ready((data)=> {
//Actions.ready(data);
//});

// 接收app推送数据
het.repaint((data)=>{
    //appData = Funs._extends({}, appData, data);
    //Actions.repaint(appData);
});

class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            cn: '1',
            headerTop: isAndroid ? 50 : 64
        };
        let type = this.state.cn;
        Actions.getTypeData(type);
        this.listenStore(Store);
    }

    getAttr(e) {
        let eve = e.currentTarget.getAttribute('title'),type;
        this.setState({cn: eve});
        switch (eve) {
            case "1":
                type = '1';
                Actions.getTypeData(type);
                break;
            case "2":
                type = '2';
                Actions.getTypeData(type);
                break;
            case "3":
                type = '3';
                Actions.getTypeData(type);
                break;
        }
    }

    render() {
        let myDate = new Date(),
            year = myDate.getFullYear(),
            month = myDate.getMonth() + 1,
            day = myDate.getDate();
        //console.log(this.state,'1111111111111111111111111111111');
        return <div className="graMain" style={{marginTop:this.state.headerTop+'px'}}>
            <p>今天：{year}年{month}月{day}日</p>
            <div className="graUl">
                <a className="graRig" id="rigOne" data-type="week" title="1"
                   style={{background:this.state.cn=='1'?'#17dff2':'',color:this.state.cn=='1'?'#fff':'#17dff2'}}
                   onTouchEnd={this.getAttr.bind(this)}>周</a>
                <a className="graRig" id="rigTwo" data-type="month" title="2"
                   style={{background:this.state.cn=='2'?'#17dff2':'',color:this.state.cn=='2'?'#fff':'#17dff2'}}
                   onTouchEnd={this.getAttr.bind(this)}>月</a>
                <a data-type="year" id="rigThree" title="3"
                   style={{background:this.state.cn=='3'?'#17dff2':'',color:this.state.cn=='3'?'#fff':'#17dff2'}}
                   onTouchEnd={this.getAttr.bind(this)}>年</a>
            </div>
            {this.state.cn == '1' ? <WeekComp mydata={this.state.data}/> : ''}
            {this.state.cn == '2' ? <MonthComp mydata={this.state.data}/> : ''}
            {this.state.cn == '3' ? <YearComp mydata={this.state.data}/> : ''}
        </div>
    }
}
;

het.domReady(()=> {
    het.setTitle('向拓净水器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式0
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});
