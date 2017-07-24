// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import {Link} from 'react-router';

function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.innerHTML = '';
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);

}

function formatDate(val){
    return val < 10 ? '0'+val : val;
}

function transTime(timestamp){
    if(!timestamp){
        return '';
    }
    var d = new Date(timestamp);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" + 
               (formatDate(d.getMonth() + 1)) + "-" +
               (formatDate(d.getDate()));     
    return(date);
}
let ip = location.protocol+'//'+location.host + '/manages/mobile/cBeauty';
// let ip = 'http://np.tunnel.qydev.com';
// 创建React组件
export class details extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            tapbtn1: false,
            tapbtn2: false,
            joinbtn: '马上参加',
        };
        this.listenStore(Store); // 监听Store
        this.oid = this.GetQueryString('oid');
        this.cid = this.GetQueryString('combId');
        wx.showAllNonBaseMenuItem();
        Actions.getActivityInfo();
        Actions.shareActivity();
    }
    componentDidMount(){
        
        let openId = this.GetQueryString('oid');
        let name = 'activityInfo';
        Actions.registerPage(name,openId);
        Actions.checkStatus(openId);        
    }
    componentDidUpdate() {

    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    showInvite(){
        let openId = this.GetQueryString('oid');
        let code = ReactDOM.findDOMNode(this.refs.code);
        let reg = /^1[34578]\d{9}$/;
        let val = code.value;
        if(!reg.test(val)){
            showToast('邀请码输入错误');
            return
        }
        this.setState({show: false})
        Actions.chooseImage(openId,val);
    }
    hideInvite(e){
        this.setState({
            show: false
        });
        e.preventDefault();
        e.stopPropagation();
    }
    joinNow(e){
        if(this.oid == '' || this.oid == null){
            window.location.href = ip + '/honeyActivity/page/index.html#/GuideActivity';
            return;
        }
        if(this.state.joinbtn!=='马上参加'){
            return
        }
        let openId = this.GetQueryString('oid') || '';
        this.setState({
            tapbtn2:false,
            show:false
        })
        Actions.joinNow(openId,this.cid);
        e.preventDefault();
        e.stopPropagation();
        
    }
    toVote(e){
        if(this.oid == '' || this.oid == null){
            window.location.href = ip + '/honeyActivity/page/index.html#/Vote';
            return;
        }
        this.setState({
            tapbtn1: false
        })
        e.currentTarget.click();
        e.preventDefault();
        e.stopPropagation();
    }
    tapbtn(e){
        let type = e.currentTarget.getAttribute('data-type');
        if(type=='vote'){
            this.setState({
                tapbtn1: true
            })
        }
        if(type=='join'){
            if(this.state.joinbtn!=='马上参加'){
            return
            }
            this.setState({
                tapbtn2: true
            })
        }
        
    }
    voteMove() {
        this.setState({
            tapbtn1: false
        })
    }
    joinMove() {
        this.setState({
            tapbtn2: false
        })
    }
    render() {
        let activityStartTime = this.state.activityStartTime||'';
        let activityEndTime = this.state.activityEndTime||'';
        let voteStartTime = this.state.voteStartTime||'';
        let voteEndTime = this.state.voteEndTime||'';
        // if(voteEndTime){
        //     var voteEndTime1 = new Date(voteEndTime.replace(/\-/g,'/'));
        //     let time = voteEndTime1.getTime()+24*3600*1000;
        //     voteEndTime1 = transTime(time);
        // }
        
        let voteResultPublishTime = this.state.voteResultPublishTime||'';
        let oid = this.oid ? this.oid : '';
        let str = this.cid ? "/Vote/"+oid+"/"+this.cid : "/Vote/"+oid;
        let bold = {fontWeight: 'bold',color: '#F57CA1'};
        return (
            <div className='m-main'>
                
                <div className='m-top'></div>

                <div className='m-info flex'>
                    <div className='m-info-content'>
                        <div className='info time'>
                            <h2><span>活动时间</span></h2>
                            <p>活动时间：<span style={bold}>{activityStartTime} - {activityEndTime}</span></p>
                            <p>投票时间：<span style={bold}>{voteStartTime} - {voteEndTime}</span></p>
                        </div>
                        <div className='info method'>
                            <h2><span>参与方式</span></h2>
                            <li className='flex'><em>1</em><p>活动仅限18岁-35岁女性,每组限<span style={bold}>2人参与</span>,其中1人填写信息,完成后发闺蜜接力确认参与</p></li>
                            <li className='flex small-line'><em>2</em><p>上传您与闺蜜在不同场景下的<span style={bold}>3张合影</span>,合影必须要有您与闺蜜两人</p></li>
                            <li className='flex'><em>3</em><p>报名成功后,邀请朋友为你投票,在投票时间内,<span style={bold}>每人每天可投3票</span></p></li>
                            <li className='flex'><em>4</em><p>活动邀请码可通过和而泰内部员工获取</p></li>
                        </div>
                        <div className='info rule'>
                            <h2><span>活动规则</span></h2>
                            <li className='flex'><em>1</em><p><span style={bold}>票数超过200的前30组参与者即可免费获取C-Life 3件美容基础设备2套</span></p></li>
                            <li className='flex small-line'><em>2</em><p>获奖人员及奖品领取信息将在活动结束后2天内在CLady微信公众号发布</p></li>
                            <li className='flex'><em>3</em><p>落选用户可关注后续的闺蜜行动——复活记,仍有机会赢取美容基础设备</p></li>
                            <li className='flex small-line'><em>4</em><p>活动期间,如有任何疑问或需定制拉票海报,请联系“小C管家”</p></li>
                            {/*<li className='flex small-line'><em>5</em><p>{'落选的用户可在投票结束后1天内('+voteEndTime1+' 10:00)联系“小C管家”参与“翻盘—填问卷赢设备”活动'}</p></li>
                            <li className='flex small-line'><em>6</em><p>{'成功申领名单将在'+voteResultPublishTime+'公布,届时请留意微信公众号推送信息. '}</p></li>*/}
                        </div>
                        <div className='info join flex'>
                            <div className='join-con flex'>
                                <img src='../static/img/qr-code.jpg' alt='二维码'/>
                                <p><span style={bold}>长按二维码,添加小C管家,咨询更多详情</span></p>
                            </div>
                            
                        </div>

                        <div className='small1 small'></div>
                        <div className='small2 small'></div>
                        <div className='small3 small'></div>
                        <div className='small4 small'></div>
                        <div className='small5 small'></div>
                        <div className='small6 small'></div>
                        <div className='small7 small'></div>
                        <div className='small8 small'></div>
                    </div>
                </div>

                <div className='m-dev flex'>
                    <div className='m-dev-con flex'>
                        <h2><span>智能美容设备</span></h2>
                        <div className='dev-item flex item1 first'>
                            <img src='../static/img/dev1.png' />
                            <p>[基础款]智能测肤,3秒认识你的肤质,提供个性化的护肤指导</p>
                        </div>
                        <div className='dev-item flex item2'>
                            <p>[基础款]深层洁面,智能控制 洁面时长,分区洗脸,让每一个毛孔都自由呼吸</p>
                            <img src='../static/img/dev2.png' />
                        </div>
                        <div className='dev-item flex item1'>
                            <img src='../static/img/dev3.png' />
                            <p>[基础款]补水控油,纳米级水雾深层滋润,随时提醒,让肌肤360°喝饱水</p>
                        </div>
                        <div className='dev-item flex item2'>
                            <p>[加强款]提拉紧致,五大护肤功能,去角质、平细纹,令肌肤Q弹有活力</p>
                            <img src='../static/img/dev4.png' />
                        </div>
                        <div className='dev-item flex item1 last'>
                            <img src='../static/img/dev5.png' />
                            <p>[加强款]彩光美肤,离子、动力光、超声波三大美容科技激发细胞活力,令肌肤光彩重生</p>
                        </div>

                        <div className='small-dev1 small-dev'></div>
                        <div className='small-dev2 small-dev'></div>
                    </div>
                </div>
                <div className='m-btn flex'>

                    
                    <Link to={str} data-type='vote' className={this.state.tapbtn1?'btn1':''} onTouchStart={this.tapbtn.bind(this)} onTouchMove={this.voteMove.bind(this)} onTouchTap={this.toVote.bind(this)}>投票</Link>
                    <a href='javascript:void(0);' data-type='join' className={this.state.tapbtn2?'btn2':''} onTouchStart={this.tapbtn.bind(this)} onTouchMove={this.joinMove.bind(this)} onTouchTap={this.joinNow.bind(this)} style={this.state.joinbtn=='马上参加'?{opacity:1}:{opacity:.4}}>{this.state.joinbtn}</a>
                </div>

                <div className='m-toast' id='toast' style={{display: 'none'}}></div>

                <div className='m-flexwin' style={this.state.show?{}:{display:'none'}}>
                    <div className='shade'></div>
                    <div className='invite flex'>
                        <h2>请输入活动邀请码</h2>
                        <input  type='text' placeholder='和而泰员工手机号' ref='code'/>
                        <div className='invite-btn flex'>
                            <span onTouchTap={this.hideInvite.bind(this)}>再看看</span>
                            {/* <span ><Link to='/ide'>去参加</Link></span> */}
                            <span onTouchTap={this.showInvite.bind(this)}>去参加</span>
                        </div>
                    </div>
                </div>
            </div>

            )
    }
}