import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TempHint} from './TempHint.es6';
import {Echarts} from './Echarts.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode : 'print', // 打印调试数据
        renderConfigData : true
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    //console.log('0000',data);
    Actions.repaint(data);
});
// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            timeArray:['00:00'],
            tempArray:[''],
            headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    render() {
        //alert(this.state.img);
        return (
            <div className='temp'>
            <section className='main'>
                    {/*<header className='header'><span className='goback'></span><span className='title'>体温贴</span><img src="../static/img/ic-help.png" className='leftIcon help' alt='帮助'/></header>*/}                 
                    <header style={{'paddingTop':this.state.headerTop}}></header>
                    <div className='content'>
                    <a href="health://skip_url/membersList"><img className='photo' src={this.state.img=='' || this.state.memberId != 0?'../static/img/ic-toadd.png':this.state.img} alt='头像'/><span className='fs16 nikename'>{this.state.nickname==''?'添加家庭成员':this.state.nickname}</span></a>
                    <p className='num'>{this.state.temp}<b>°C</b></p>
                    <p className={this.state.temp>37.2?"tip cor-red":'tip'}>{this.state.temp>37.2?"有点发烧了，请注意观察":'一枚安静又体贴的体温贴~'}</p>
                    <TempHint  value={this.state.temp}/>
                </div>
            </section>
            <Echarts timelist={this.state.timeArray} templist={this.state.tempArray}/>   
             <a className='flex' id='hsty-btn' href='health://skip_url/history.html'>历史数据</a>
        </div>
        );
    }

    componentWillUpdate(){
         if(this.state.dataTime)
        {
            let dataTime=Funs.dateFormatFull(this.state.dataTime,"-",1),
                timeArray=this.state.timeArray,
                tempArray=this.state.tempArray,
                lastTime=timeArray[timeArray.length-1];

            //console.log(timeArray,lastTime);
            if(lastTime!=dataTime){
                let temp = this.state.temp;
                if(temp < 34){
                    temp = '34';
                }else if(temp > 42){
                    temp = '42';
                }
                timeArray.push(dataTime);
                tempArray.push(temp);
            }

            if(timeArray.length>=8)
            {
                timeArray.shift();
                tempArray.shift();
                
            }
            if(timeArray[0] === '00:00'){
                timeArray.shift();
                tempArray.shift();
            }
            //console.log(timeArray,tempArray);
        }
    }

}

// 开始渲染
het.domReady(()=>{
    het.setTitle('体温贴');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));

   /* // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});