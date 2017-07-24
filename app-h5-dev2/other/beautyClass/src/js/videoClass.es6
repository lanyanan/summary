import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
// import {ArcSliding} from './ArcSliding.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

// 创建React组件
export class VideoClass extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            planId:parseInt(this.props.params.planId),
            period:parseInt(this.props.params.period),
            date:parseInt(this.props.params.date) || '',
            coverShow:false
        };
        this.listenStore(Store); // 监听Store
        Actions.startClass(this.state.planId,this.state.period,this.state.date-1);
        this.page = 0;
    }
    componentDidMount() {
        let video = document.getElementById('video');
        video.addEventListener('canplay',function(arg){
            video.play();
        });
        video.addEventListener('canplaythrough',function(arg){
            video.play();
        });
    }
    componentDidUpdate() {
        let length = this.state.detailList ? this.state.detailList.length : 0;
        let video = document.getElementById('video');
        let page = this.page;
        let _this = this;
        let planId = this.state.planId;
        let taskId = this.state.taskId;
        let period = parseInt(this.state.period);
        video.addEventListener('ended',function(arg){
            if(page == length-1){
                Actions.finishCourse(planId,taskId,period);
            }
        });
    }
    componentWillUnmount() {
        this.page = 0;
    }
    forward() {//向前翻页
        this.page--;
        if(this.page == 0) this.page = 0;
        let item = this.state.detailList[this.page];
        let video = ReactDOM.findDOMNode(this.refs.video);
        video.currentTime = 0;
        this.setState({planId:this.state.planId});
    }
    back() {//向后翻页
        let length = this.state.detailList ? this.state.detailList.length : 0;
        this.page++;
        if(this.page > length) this.page = length-1;
        let item = this.state.detailList[this.page];
        let video = ReactDOM.findDOMNode(this.refs.video);
        video.currentTime = 0;
        this.setState({planId:this.state.planId});
    }
    formatTime(value) {
        let res = 0;
        if(value<=60){
            res = 1;
        }else{
            res = Math.round(value/60);
        }
        return res;
    }
    know(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({coverShow:false});
        window.location.hash = '#';
    }
    render() {
        console.log('video-state',this.state);
        if(!this.state.detailList) return null;
        let item = this.state.detailList ? this.state.detailList[this.page] : {};
        let videourl = item.videourl;
        let length = this.state.detailList ? this.state.detailList.length : 0;
        let timeLen = 0;
        if(this.state.detailList){
            this.state.detailList.map((item,index)=>{
                timeLen += parseInt(item.timeLength);
            })
        }
        return (
            <div className="s-class">
                <section className="video">
                    <video id="video" ref="video" className="video" autoplay controls>
                        <source src={videourl} type="video/mp4"></source>
                        您的浏览器不支持HTML5视频播放,请使用更先进的Chrome浏览器，或者IE 10以上的浏览器播放视频
                    </video>
                </section>
                <section className="content">
                    <p>{item.descripe}</p>
                </section>
                <section className="v-footer">
                    <i className="arrow-l" style={{display:(this.page == 0) ? 'none':'block'}} onTouchTap={this.forward.bind(this)}></i>
                    <div className="page">
                        <p>{item.smallTitle}</p>
                        <span>{this.page+1}/{length}</span>
                    </div>
                    <i className="arrow-r" style={{display:(this.page+1 == length) ? 'none':'block'}} onTouchTap={this.back.bind(this)}></i>
                </section>
                {/*课程学习完了的弹窗*/}
                <div className="video-cover" style={{display:this.state.coverShow?'':'none'}}>
                    <div className="video-content">
                        <p>您已经完成了今日的训练</p>
                        <p>美容时长<span>{this.formatTime(timeLen)}</span>分钟 美容动作<span>{length}</span>个</p>
                        <a href="@@" onTouchTap={this.know.bind(this)}>我知道了</a>
                    </div>
                </div>
            </div>
        );
    }
}
