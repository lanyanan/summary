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

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }

    componentDidMount() {
        appLeader();
    }
    divTouch(e){
        e.preventDefault();
        let downDiv=this.refs.downloadBody;  
            downDiv.style.display = "none";
    }
    clickDownload(){
            let downDiv=this.refs.downloadBody;  
            downDiv.style.display = "block";

    }
    render() {
        let date1=new Date(parseInt(this.props.params.date1));//开始时间戳
        let date2=new Date(parseInt(this.props.params.date2));//结束时间戳
        /*let dateBegin=new Date(parseInt(date1));//开始时间
        let monthBegin=  dateBegin.substring(dateBegin.indexOf("/")+1,dateBegin.lastIndexOf("/"));//开始 月份
        let daysBegin=dateBegin.substring(dateBegin.lastIndexOf("/")+1,dateBegin.indexOf("上")).trim();//开始 天数
        let dateEnd=new Date(parseInt(date2)).toLocaleString();//结束时间
        let monthEnd=  dateEnd.substring(dateEnd.indexOf("/")+1,dateEnd.lastIndexOf("/"));//结束 月份
        let daysEnd=dateEnd.substring(dateEnd.lastIndexOf("/")+1,dateEnd.indexOf("上")).trim();//结束 天数*/
        return <div className="beautyDiv">
                        {/*......................................产品信息begin.............*/}
                        <div className="product_info">
                            {/*头部begin.........................................*/}
                            <div className="header jump">                        
                                <div className="logo"></div>
                                <div className="text">C-Life美容，您的智能美容管家！</div>
                                <div className="down"></div>
                            </div>
                            {/*头部begin.........................................*/}
                            <div className="activityDiv translateX">
                                <div className="productImg translateX"></div>
                                <div className="productText">
                                    <div className="productTitle">
                                      超声波智能洁面仪  
                                    </div>
                                    <div className="productContent">                                
                                        1.深层洁净;
                                        ２.改善痘痘肌;
                                        ３.去角质去黑头;
                                        ４.细致毛孔排毒素;
                                        ５.轻松卸妆;
                                    </div>
                                    <div className="activityTetail"></div>
                                    <div className="activityTetailText">                        
                                        <p className="TetailTitle">活动规则</p>
                                        <p>活动时间：{date1.getMonth()+1}月{date1.getDate()}日—{date2.getMonth()+1}月{date2.getDate()}日</p>
                                        <p>试用产品：超声波智能洁面仪一套</p>

                                        <p className="TetailTitle TetailTitle_margin">申请方式</p>
                                        <p>1.戳击“0元申请”按钮</p>
                                        <p>2.把活动资讯分享给微信好友</p>
                                        <p>3.填写详细的资料信息</p>
                                        <p>4.关注微信公众号（关注CLady),查看获奖名单</p>

                                        <p className="TetailTitle TetailTitle_margin">获奖须知</p>
                                        <p>1.活动结束后将随机抽取20位幸运用户</p>
                                        <p>2.奖品将在9月7日寄出,获奖用户请留意查收</p>
                                        <p>3.获得试用资格的用户，提交使用反馈有惊喜大礼等着你</p>
                                        <p>4.如有任何疑问,请在微信公众号留言即可</p>
                                        <p>5.本次活动解释权归和而泰家居在线所有</p>
                                    </div>
                                </div>
                            </div>
                            <div className="footer"  onTouchStart={this.clickDownload.bind(this)}>
                                申请免费领取
                            </div>
                        </div>
                        {/*......................................产品信息end.............*/}
                        {/*......................................下载的页面begin.............*/}
                        <div onTouchStart={this.divTouch.bind(this)} className="downloadBody" ref="downloadBody">
                            <div className="download_div" onTouchStart={(e)=>e.stopPropagation()}>
                                <div className="img_div translateX">
                                    <img src="../static/images/productImg.png" alt=""/>
                                </div>
                                <div className="p_div">
                                    <p>想把超声波智能洁面仪领回家?</p>
                                    <p>快下载C-Life美容app吧!</p>
                                </div>
                                <div className="jump translateX">立即下载</div>
                            </div>
                        </div>   
                        {/*......................................下载的页面end.............*/}
                </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('免费领取洁面仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/:date1/:date2" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});