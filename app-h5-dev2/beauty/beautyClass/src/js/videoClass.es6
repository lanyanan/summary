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
            date:parseInt(this.props.params.date) || ''
        };
        this.listenStore(Store); // 监听Store
        Actions.startClass(this.state.planId,this.state.period,this.state.date-1);
        this.page = 0;
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        this.page = 0;
    }
    forward() {//向前翻页
        this.page--;
        if(this.page == 0) this.page = 0;
        this.setState({planId:this.state.planId});
    }
    back() {//向后翻页
        let length = this.state.detailList ? this.state.detailList.length : 0;
        this.page++;
        if(this.page > length) this.page = length;
        this.setState({planId:this.state.planId});
    }
    render() {
        console.log('video-state',this.state);
        let item = this.state.detailList ? this.state.detailList[this.page] : {};
        let length = this.state.detailList ? this.state.detailList.length : 0;
        return (
            <div className="s-class">
                <section className="video">
                    <video id="video" className="video" autoPlay="autoplay" controls="true">
                        <source src={item.videourl} type="video/mp4"></source>
                        您的浏览器不支持HTML5视频播放,请使用更先进的Chrome浏览器，或者IE 10以上的浏览器播放视频
                    </video>
                    <span className="back"></span>
                </section>
                <section className="content">
                    <p>{item.descripe}</p>
                </section>
                <section className="v-footer">
                    <i className="arrow-l" style={{display:(this.page == 0) ? 'none':''}} onTouchTap={this.forward.bind(this)}></i>
                    <div className="page">
                        <p>{item.smallTitle}</p>
                        <span>{this.page+1}/{length}</span>
                    </div>
                    <i className="arrow-r" style={{display:(this.page+1 == length) ? 'none':''}} onTouchTap={this.back.bind(this)}></i>
                </section>
            </div>
        );
    }
}
