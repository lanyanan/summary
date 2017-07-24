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
    render() {
        //console.log();
        let apply = this.props.params.apply || "1";//是否已经申请
        let num =this.props.params.num;//已参加人数
        let date1=new Date(parseInt(this.props.params.date1));//开始时间戳
        let date2=new Date(parseInt(this.props.params.date2));//结束时间戳
        let date4=new Date().getTime();
        let date3=this.props.params.date2-date4;  //时间差的毫秒
        //计算出相差天数
        let days=Math.floor(date3/(24*3600*1000))         
        //计算出小时数
        let leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
        let hours=Math.floor(leave1/(3600*1000))
        if(days<0){
            days=0;
        }
        if(hours<0){
            hours=0;
        }
        return <div className="shareDiv"> 
                <div className="shareHader">
                        <div className="timeDiv">剩余{days}天{hours}小时</div>
                   </div> 
                   {/* ..................................数量信息begin.................................*/}
                   <div className="activityNews">
                        <div className="activityNumber">
                            <span className="text">数量</span><br/><span className="number">20</span>                          
                        </div>
                        <div className="activityValue">
                            <span className="text">价值</span><br/><span className="number"><span className="moneyIcon">￥</span>999</span>
                        </div>
                        <div className="activityPeople">
                            <span className="text">参加人数</span><br/><span className="number">{num}</span>
                            
                        </div> 
                   </div>
                    {/* ..................................数量信息end.................................*/}
                    {apply==="1"?(
                        <div className="apply_zero translateX" onTouchStart={()=>location.href="cbeauty://cbeauty_activityapply"}>
                                <span className="love"></span>
                                <span className="text">0元申请</span>
                                {/*<img src="../static/images/2l.png"/>*/}
                            </div>  
                    ): apply==="2" ? (
                            <div className="applyDiv translateX" onTouchStart={()=>location.href="cbeauty://cbeauty_editaddress"}>
                                <p>已申请
                                    <img className="verticalBar" src="../static/images/verticalBar.png" alt=""/>查看收货地址
                                    <img className="OkArrows" src="../static/images/OkArrows.png" alt=""/>
                                </p>
                            </div> 
                             
                    
                    ):(
                            <div className="applyDiv translateX" onTouchStart={()=>location.href="cbeauty://cbeauty_editaddress"}>
                                <p>已申请
                                    <img className="verticalBar" src="../static/images/verticalBar.png" alt=""/>填写收货地址
                                    <img className="OkArrows" src="../static/images/OkArrows.png" alt=""/>
                                </p>
                            </div> 
                    )};
                     
                    
                    <div className="Awi translateX"></div>
                     {/* ...................................活动流程begin.................................*/}
                    <div className="activeDirectory translateX">
                        <div className="width-auto translateX">
                            <div className="roundDiv  roundDiv_1">
                             <p className="pTop">免费</p>
                             <p>申请</p>
                            </div>
                            <div className="Splice"></div>

                            <div className="roundDiv roundDiv_2">
                             <p className="pTop">参加</p>
                             <p>抽奖</p>
                            </div>
                            <div className="Splice"></div>

                            <div className="roundDiv roundDiv_3">
                            <p className="pTop">体验</p>
                             <p>产品</p>
                            </div>
                            <div className="Splice"></div>

                            <div className="roundDiv roundDiv_4">
                            <p className="pTop">撰写</p>
                             <p>点评</p>
                            </div>
                            </div>
                    </div>
                     {/* ...................................活动流程end.................................*/}
                    <div className="Awi_details translateX"></div>
                    {/* ...................................活动详情begin.................................*/}
                    <div className="activity_rule translateX">
                        <p className="p_bold">活动规则</p>
                        <p>活动时间：{date1.getMonth()+1}月{date1.getDate()}日—{date2.getMonth()+1}月{date2.getDate()}日</p>
                        <p>试用产品：超声波智能洁面仪一套</p>
                        <p className="p_bold p_top">申请方式</p>
                        <p>1.戳击“0元申请”按钮</p>
                        <p>2.把活动资讯分享给微信好友</p>
                        <p>3.填写详细的资料信息</p>
                        <p>4.关注微信公众号（关注CLady),查看获奖名单</p>
                        <p className="p_bold p_top">获奖须知</p>
                        <p>1.活动结束后将随机抽取20位幸运用户</p>
                        <p>2.奖品将在9月7日寄出,获奖用户请留意查收</p>
                        <p>3.获得试用资格的用户，提交使用反馈有惊喜大礼等着你</p>
                        <p>4.如有任何疑问,请在微信公众号留言即可</p> 
                        <p>5.本次活动解释权归和而泰家居在线所有</p>                   
                    </div>
                    {/* ...................................活动详情end.................................*/}
                    {/* .................................. 二维码begin.................................*/}
                    <div className="two_dimension_div">
                        <img src="../static/images/two_dimension_code1.png" alt=""/>
                        <p>获取更多最新活动消息</p>
                    </div>
                    {/* ...................................二维码end.................................*/}
                    <div className="award_Tetail translateX"></div>
                    {/* ...................................奖品图片begin.................................*/}
                    <div className="award_img translateX">
                         <img src="../static/images/award1.png" alt=""/>
                    </div>
                    {/* ...................................奖品图片end.................................*/}
                     {/* ...................................产品功能begin.................................*/}
                    <div className="activity_rule">
                        <p className="p_bold">1.深层洁净</p>
                        <p>清洁效果比普通洁面仪提升３倍</p>
                        <p className="p_bold p_top">２.改善痘痘肌</p>
                        <p>祛除老化角质,延缓肌肤衰老,恢复光滑细致,清除堵塞毛孔油脂,减少黑头形成</p>
                        <p className="p_bold p_top">３.去角质去黑头</p>
                        <p>深层洁净,让皮肤自由呼吸,从根本抑制痘痘生成</p>
                        <p className="p_bold p_top">４.细致毛孔排毒素</p>
                        <p>清洁+按摩,让皮肤恢复细致,快速有效清除皮肤有害物质</p>
                        <p className="p_bold p_top">５.轻松卸妆</p>       
                        <p>高效快速卸妆,安全无残留</p>             
                    </div>
                    {/* ...................................产品功能end.................................*/}      

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
            <Route path="/:apply/:num/:date1/:date2" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});