// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

het.ready((data)=>{
    Actions.ready(data);
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
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            deviceStatus: 4,    // 1-提示打开 2-扫描中 3-无法连接 4-有数据
            result: 0,          // 称重结果
            foodClassId: 1   // 食材类别ID
        };
        this.listenStore(Store);// 监听Store
    }
    clickStatus(e){
        e.preventDefault();
        let val = parseInt(e.currentTarget.getAttribute('data-val'));
        this.setState({foodClassId:val});
    }
    inputFoodName(e){
        let val = e.currentTarget.value;
        this.setState({foodName:val});
    }
    submit(e){
        e.preventDefault();
        if (!this.state.foodName) {
            het.toast('请输入食物名称');
            ReactDOM.findDOMNode(this.refs.foodname).focus();
            return;
        }
        Actions.submitResult(this.state.result, this.state.foodName, this.state.foodClassId);
    }
    render() {
        return <div className="main" style={{'paddingTop':this.state.headerTop}}>
            <header>
                <figure>
                    <img src={this.state.avatar} />
                    <p>你好，{this.state.nickname}</p>
                </figure>
            </header>
            {this.state.deviceStatus==1?(
                <section className="sec-0">
                    <div className="text">请将食物放在秤上 ...</div>
                    <img src="../static/img/misc1.png" />
                </section>
            ):''}
            {this.state.deviceStatus==2?(
                <section className="sec-1">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="text">扫描中...</div>
                </section>
            ):''}
            {this.state.deviceStatus==3?(
                <section className="sec-2">
                    <div className="msg">抱歉，无法连接到营养秤</div>
                    <a href="health://guide_retry" className="ft-button">再试一次</a>
                </section>
            ):''}
            {this.state.deviceStatus==4?(
                <section className="sec-3">
                    <div className="result">
                        <p>称重结果</p>
                        <p><b>{this.state.result}</b><span className="unit">g</span></p>
                    </div>
                    <div className="foot">
                        <div className="btns-wrap">
                            <p>输入食物名称</p>
                            <p><input type="text" ref="foodname" placeholder="请输入1到8个字符" maxLength={8} className="foodname" value={this.state.foodName} onChange={this.inputFoodName.bind(this)} /></p>
                            <p>选择食物类别</p>
                            <p className="flex">
                                <a href="#" data-val='1' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==1 ? ' active' : '')}>谷类</a>
                                <a href="#" data-val='2' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==2 ? ' active' : '')}>蛋类</a>
                                <a href="#" data-val='3' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==3 ? ' active' : '')}>奶类</a>
                                <a href="#" data-val='5' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==5 ? ' active' : '')}>肉类</a>
                                <a href="#" data-val='6' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==6 ? ' active' : '')}>蔬菜类</a>
                                <a href="#" data-val='7' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==7 ? ' active' : '')}>瓜果类</a>
                            </p>
                            <p className="flex">
                                <a href="#" data-val='4' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==4 ? ' active' : '')}>豆类</a>
                                <a href="#" data-val='9' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==9 ? ' active' : '')}>鱼虾类</a>
                                <a href="#" data-val='10' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==10 ? ' active' : '')}>贝类</a>
                                <a href="#" data-val='11' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==11 ? ' active' : '')}>干果类</a>
                                <a href="#" data-val='8' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==8 ? ' active' : '')}>根茎类</a>
                                <a href="#" data-val='12' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.foodClassId==12 ? ' active' : '')}>调味品</a>
                            </p>
                        </div>
                        <a href="#" className="ft-button" onClick={this.submit.bind(this)}>确定</a>
                    </div>
                </section>
            ):''}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('营养秤');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});