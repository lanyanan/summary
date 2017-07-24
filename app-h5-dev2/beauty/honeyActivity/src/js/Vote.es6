import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
var {Router, Route, hashHistory, Link} = ReactRouter;

let myscroll;
let pageIndex = 1,pageRows = 10;
let url = '#GuideVote';

// 开始渲染
// het.domReady(()=>{
//     het.setTitle('闺蜜行动');
// });

// 创建React组件
export class Vote extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            originCid : this.props.params.cid || '',
            cid: this.props.params.cid || '',
            oid: this.props.params.oid || '',
            deviceH:document.documentElement.clientHeight,
            inputWidth:88,
            searchShow:false,
            deleteShow:false,
            searchIconShow:true,
            voteList:[],
            btnActiveArr:[]
        };
        this.searchText = '搜索';
        this.nullText = '快去邀请闺蜜一起参加活动吧~';
        this.myScroll;
        this.listenStore(Store); // 监听Store
        Actions.getData(pageIndex,pageRows,'');
        Actions.getMyGroupData(this.state.cid,this.state.oid);
        Actions.registerPage('activityVote',this.state.oid);
    }
    componentDidMount() {
        this.myScroll = new IScroll('#wrapper',{
            probeType: 3,
            // momentum: false,//关闭惯性滑动
            scrollbars: false,//滚动条可见
            useTransform: true,//CSS转化
            useTransition: true,//CSS过渡
            bounce: true,//反弹
            startX: 0,
            startY: 0,
            preventDefaultException:{tagName: /^(INPUT|TEXTAREA|SELECT|A)$/}
        });
        this.myScroll.on('scrollEnd', pullUp);
        function pullUp(){
            if (this.y<=this.maxScrollY+30) {
                pageIndex++;
                Actions.getData(pageIndex,pageRows,'');
            }
        }
    }
    componentWillUpdate() {
        
    }
    componentDidUpdate(){
        //处理图片压缩变形
        function handlePic($img){
            let width = $img.width();
            let height = $img.height();
            if(width>=height){
                $img.css({'height': '100%'}); 
            }
            if(height>width){
                $img.css({'width': '100%'});
            }
        }
        $('.detail-img>img').each(function(i){
                
                $('.detail-img>img').on('load',function(){
                    handlePic($(this));
                })
                
        })
        this.myScroll.refresh();
    }
    componentWillUnmount() {
        pageIndex = 1;
    }
    focus(e) {
        //console.log('focus');
        let value = e.currentTarget.value;
        this.searchText = '搜索';
        if(value){
            this.setState({
                inputWidth:70,
                searchShow:true,
                deleteShow: true,
                searchIconShow: false
            });
        }else{
            this.setState({
                inputWidth:70,
                searchShow:true,
                deleteShow: false,
                searchIconShow: false
            });
        }
    }
    blur(e) {
        //console.log('blur');
    }
    keyPress(e) {
        //console.log(value);
        let value = e.currentTarget.value;
        if(value){
            this.setState({
                deleteShow: true
            });
        }else{
            this.setState({
                deleteShow: false
            });
        }
    }
    delete() {
        //console.log('delete');
        let ipt = ReactDOM.findDOMNode(this.refs.place);
        ipt.value = '';
        this.setState({
            deleteShow: false
        });
    }
    search(e) {
        this.nullText = "该闺蜜组合不存在";
        let text = e.currentTarget.innerHTML;
        let ipt = ReactDOM.findDOMNode(this.refs.place);
        if(text == '取消搜索'){
            pageIndex = 1;
            this.searchText = '搜索';
            this.nullText = '快去邀请闺蜜一起参加活动吧~';
            ipt.value = '';
            this.setState({
                inputWidth:88,
                searchShow:false,
                deleteShow: false,
                searchIconShow: true
            });
            Actions.getData(pageIndex,pageRows,'');
            e.stopPropagation();
            e.preventDefault();
        }else{
            pageIndex = 1;
            this.searchText = '取消搜索';
            ipt.blur();
            this.setState({
                inputWidth:70,
                searchShow:true,
                deleteShow: false
            });
            Actions.getData(pageIndex,pageRows,ipt.value);            
        }
    }
    touchStart(e) {
        let arr = [];
        let activeIndex = e.currentTarget.getAttribute('data-index');
        arr.push(parseInt(activeIndex));
        this.setState({
            btnActiveArr:arr
        });
    }
    touchMove(e){
        this.setState({
            btnActiveArr:[]
        });
    }
    vote(e) {
        if(this.state.oid == '' || this.state.oid == null){
            window.location.href = url;
            return;
        }
        let ipt = ReactDOM.findDOMNode(this.refs.place);
        let value = ipt.value;
        let cid = e.currentTarget.getAttribute('data-combinationid');
        Actions.vote(cid,this.state.oid,1,pageRows,value,this.state.cid);
        this.setState({
            btnActiveArr:[]
        });
    }
    voteDetail(e){
        // console.log('e',e.currentTarget,e.target);
        if(e.currentTarget.tagName === 'A' && e.target.tagName!=='BUTTON') e.currentTarget.click();
    }    
    render() {
        //console.log(this.state);
        // let myPartShow = this.state.cid ? true : false;
        let myPartShow = false;
        if(this.state.cid || this.state.oid){
            if(this.state.confirmDate){
                myPartShow = true;
            }else{
                myPartShow = false;
            }
        }else{
            myPartShow = false;
        }
        return (
            <div id="wrapper" style={{height:this.state.deviceH}}>
                <div id="scroller">
                    <img className="tp_bg" src="../static/img/tp-bg.png" />
                    <div className="vote-way" style={{display:'none'}}>
                        <h3>投票方式</h3>
                        <p>关注CLady公众号,回复“投票”,点击链接进入活动页面进行投票。每人每天可投3票哦~</p>
                        <img className="qr-code" src="../static/img/qr-code.jpg"/>
                        <span>CLady公众号</span>
                    </div>
                    <div className="my-part" style={{display:myPartShow? 'block': 'none'}}>
                        <h2 className="title border-t">我的闺蜜组合</h2>
                        <Link to={"/VoteDetail/"+this.state.combinationId+"/"+this.state.oid} data-combinationid={this.state.combinationId} onTouchTap={this.voteDetail.bind(this)}>
                            <div className="detail flex">
                                {/* <img className="detail-img" src={this.state.cover}/> */}
                                <div className='detail-img'>
                                    <img src={this.state.coverS}/>
                                </div>
                                <div className="detail-r flex-cell">
                                    <h3 className="detail-h3">{this.state.combinationName}</h3>
                                    <p className="vote-count">
                                        <i className="flower"></i><span>{this.state.totalVotes||0}</span>朵
                                    </p>
                                    <button className={this.state.btnActiveArr.indexOf(0)!=-1 ? 'detail-btn-active':'detail-btn'} data-combinationid={this.state.combinationId} data-index={0} onTouchStart={this.touchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchTap={this.vote.bind(this)}>投票</button>
                                    <em className="arrow-r"></em>
                                </div>
                                <span className="grade flex"><i>{this.state.ranking > 999 ? '999+' : this.state.ranking}</i></span>
                            </div>
                        </Link>
                    </div>
                    <div className="all-part">
                        <h2 className="title border-t">所有的闺蜜组合</h2>
                        <div className="search-div flex">
                            <div className="search-box flex flex-cell" style={{width:this.state.inputWidth+'%'}}>
                                <i className="search" style={{display:this.state.searchIconShow?'block':'none'}}></i>
                                <input type="text" ref="place" placeholder="搜索闺蜜组合" className="search-input" onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onKeyUp={this.keyPress.bind(this)} />
                                <span style={{display:this.state.deleteShow ? 'block' : 'none'}} className="delete" onTouchTap={this.delete.bind(this)}></span>
                            </div>
                            <span className="search-txt" ref="text" style={{display:this.state.searchShow?'block':'none'}} onTouchTap={this.search.bind(this)}>{this.searchText}</span>
                        </div>
                        <div className="vote-list">
                            {this.state.voteList.map((item,index)=>{
                                return(
                                    <Link to={"/VoteDetail/"+item.combinationId+"/"+this.state.oid} key={index} data-combinationid={item.combinationId} onTouchTap={this.voteDetail.bind(this)}>
                                        <div className="detail flex" data-index={index}>
                                            {/* <img className="detail-img" src={item.coverImgURL}/> */}
                                            <div className='detail-img'>
                                                <img src={item.coverImgURL}/>
                                            </div>
                                            <div className="detail-r flex-cell">
                                                <h3 className="detail-h3">{item.combinationName}</h3>
                                                <p className="vote-count">
                                                    <i className="flower"></i><span>{item.totalVotes||0}</span>朵
                                                </p>
                                                <button className={this.state.btnActiveArr.indexOf(index+1)!=-1 ? 'detail-btn-active':'detail-btn'} data-combinationid={item.combinationId} data-index={index+1} onTouchStart={this.touchStart.bind(this)} onTouchMove={this.touchMove.bind(this)} onTouchTap={this.vote.bind(this)}>投票</button>
                                                <em className="arrow-r"></em>
                                            </div>
                                            <span className="grade flex"><i>{item.sortIndex > 999 ? '999+' : item.sortIndex}</i></span>
                                        </div>
                                    </Link>
                                )
                            })}
                            <div className="no-list" style={{display:this.state.voteList.length>0?'none':'block'}}>
                                {this.nullText}
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className="refresh flex">
                        <img src="../static/img/loading.gif"/>
                        加载中...
                    </div>
                    */}
                </div>
                <div className='m-toast' id='toast' style={{display: 'none'}}></div>
            </div>
        );
    }
}
