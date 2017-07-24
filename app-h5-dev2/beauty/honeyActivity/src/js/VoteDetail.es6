import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 开始渲染
het.domReady(()=>{
    het.setTitle('闺蜜行动');
});

let pageIndex = 1,pageRows = 2;
let voteGuide = '#GuideVote';
let activityGuide = '#GuideActivity';

// 创建React组件
export class VoteDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            originCid:this.GetQueryString('combId') || '',
            cid: this.props.params.cid || '',
            oid: this.props.params.oid || '',
            joinText:'马上参加',
            joinClass:'btn2',
            show:false
        };
        this.mySwiper;
        this.listenStore(Store); // 监听Store
        Actions.getMyGroupData(this.state.cid,this.state.oid,this.state.originCid);
    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var res = window.location.search;
         var r = res.substr(res.indexOf('?')+1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    }
    componentDidMount() {
        Actions.checkActivity(this.state.oid);

        this.mySwiper=new Swiper(".swiper-container",
        {
            initialSlide:1,
            slidesPerView:"auto",
            centeredSlides:!0,
            watchSlidesProgress:!0,
            pagination:".swiper-pagination",
            paginationClickable:false,
            onProgress:function(a){
                let b,c,d,scale,es;
                for(b=0;b<a.slides.length;b++)c=a.slides[b],d=c.progress,scale=1-Math.min(Math.abs(.2*d),1),es=c.style,es.opacity=1-Math.min(Math.abs(d/2),1),es.webkitTransform=es.MsTransform=es.msTransform=es.MozTransform=es.OTransform=es.transform="translate3d(0px,0,"+-Math.abs(500*d)+"px)"
            },
            onSetTransition:function(a,b){
                let es;
                for(var c=0;c<a.slides.length;c++)es=a.slides[c].style,es.webkitTransitionDuration=es.MsTransitionDuration=es.msTransitionDuration=es.MozTransitionDuration=es.OTransitionDuration=es.transitionDuration=b+"ms"
            }
        });

        function calImgHeiWid($img){
            let slideW = $('.swiper-slide').width();
            let slideH = $('.swiper-slide').height();
            let imgW = $img.width();
            let imgH = $img.height();
            let sc = imgW / imgH;
            if(sc >= 1){//宽图
                imgW > slideW ? $img.addClass('main-img-w') : $img.removeClass('main-img-w');
            }else{
                imgH > slideH ? $img.addClass('main-img-h') : $img.removeClass('main-img-h');
            }
        }
        // $('.main-img').on('load',()=>{
        //     $('.main-img').each(function(i){
        //         console.log($(this));
        //         calImgHeiWid($(this));
        //     });
        // });

        $('.main-img').each(function(i){
            $('.main-img').eq(i).on('load',function(){
                console.log($(this));
                calImgHeiWid($(this));
            });
        });
    }
    componentWillMount(){

    }
    componentWillUpdate() {
        
    }
    componentDidUpdate(){
        
    }
    vote() {
        if(!this.state.oid){
            window.location.href = voteGuide;
            return;
        }
        Actions.vote(this.state.cid,this.state.oid,1,pageRows,'',this.state.cid);
        this.setState({
            voteActive:false
        });
    }
    voteTouchStart() {
        this.setState({
            voteActive:true
        });
    }
    touchMove() {
        this.setState({
            voteActive:false
        });
    }
    joinTouchStart(e) {
        if(this.state.joinText != '马上参加'){
            return;
        }
        this.setState({
            joinClass:'btn2-active'
        });
    }
    joinTouchMove() {
        this.setState({
            joinClass:'btn2'
        });
    }
    join() {
        if(!this.state.oid){
            window.location.href = activityGuide;
            return;
        }
        if(this.state.joinText != '马上参加'){
            return;
        }
        let oid = this.state.oid;
        this.setState({
            show:false
        })
        Actions.joinNow(oid);
    }
    showInvite(){
        let openId = this.state.oid;
        let code = ReactDOM.findDOMNode(this.refs.code);
        let val = code.value;
        Actions.chooseImage(openId,val);
    }
    hideInvite(){
        this.setState({
            show: false
        })
    }
    render() {
        //console.log(this.state);
        return (
            <div style={{background: '#fef9f5'}}>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img className="main-img img1" src={this.state.img1}/></div>
                        <div className="swiper-slide"><img className="main-img img2" src={this.state.cover}/></div>
                        <div className="swiper-slide"><img className="main-img img3" src={this.state.img2}/></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="group">
                    <p className="vote-count tc">
                        <i className="flower"></i><span>{this.state.totalVotes ? this.state.totalVotes : 0}</span>朵
                    </p>
                    <p className="p-text tc">{this.state.combinationName}</p>
                    <p className="p-text tc">{this.state.declarationContent}</p>
                </div>
                <div className="vote-way margin-t20 border-tb">
                    <h3>投票方式</h3>
                    <p>关注CLady公众号,回复“投票”,点击链接进入活动页面进行投票。每人每天可投3票哦~</p>
                    <img className="qr-code" src="../static/img/clady-code.jpg"/>
                    <span>CLady公众号</span>
                </div>
                <div className='m-btn flex'>
                    <button className={this.state.voteActive ? 'btn1-active':'btn1'} onTouchStart={this.voteTouchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchTap={this.vote.bind(this)}>投票</button>
                    <button className={this.state.joinClass} onTouchStart={this.joinTouchStart.bind(this)} onTouchMove={this.joinTouchMove.bind(this)} onTouchTap={this.join.bind(this)}>{this.state.joinText}</button>
                </div>
                <div className="placeholder"></div>
                <div className='m-toast' id='toast' style={{display: 'none'}}></div>

                <div className='m-flexwin' style={this.state.show?{}:{display:'none'}}>
                    <div className='shade'></div>
                    <div className='invite flex'>
                        <h2>请输入邀请码</h2>
                        <input  type='text' placeholder='邀请码' ref='code'/>
                        <div className='invite-btn flex'>
                            <span onTouchTap={this.hideInvite.bind(this)}>再看看</span>
                            <span onTouchTap={this.showInvite.bind(this)}>去参加</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
