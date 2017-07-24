import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
// import {ArcSliding} from './ArcSliding.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

// 创建React组件
export class SingleClass extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?96:66,
            planId: this.props.params.planId || 64
        };
        this.listenStore(Store); // 监听Store
        Actions.getSingleClass(this.state.planId);
    }
    formatTime(time) {
        let res = '';
        let temp = parseInt(time);
        if(time>60){
            res = parseInt(temp/60) + 'min' + temp%60 + 's';
        }else{
            res = temp + 'S';
        }
        return res;
    }
    startClass() {
        let isJoin = this.state.isJoin;
        let planId = this.state.planId;
        let toVideo = ReactDOM.findDOMNode(this.refs.toVideo);
        if(!isJoin){
            Actions.joinClass(planId,this.state.period);
        }else{
            toVideo.click();
        }
    }
    render() {
        console.log('最终数据',this.state);
        let tags = this.state.tags || [];
        let detailList = this.state.detailList || [];
        let btnText = this.state.isJoin ? '开始课程':'添加课程';
        return (
            <div className="s-class">
                <div className="s-top">
                    <h2 className="title" style={{marginTop:this.state.headerTop/24 + 'rem'}}>{this.state.planName}</h2>
                    <p className="desc">
                        {tags.map((item,index)=>{
                            return (
                                <span key={index}>{item.tagName}</span>
                            )
                        })}
                    </p>
                    <div className="s-bottom">
                        <span>单次练习</span>
                        <p><i className="clock"></i>{this.state.subName}</p>
                    </div>
                    <img src={this.state.imageUrl} />
                    <div className="black-cover"></div>
                </div>
                <section className="s-middle">
                    <h3>课程详情</h3>
                    <p>{this.state.abstracts}</p>
                </section>
                <section className="s-detail">
                    {detailList.map((item,index)=>{
                        return (
                            <div className="class" key={index}>
                                <img src={item.imageurl} />
                                <p>{item.smallTitle}</p>
                                <span>{this.formatTime(item.timeLength)}</span>
                            </div>
                        )
                    })}
                </section>
                <div className={this.state.isJoin ? 'footer-join':'footer'} onTouchTap={this.startClass.bind(this)}>
                    {btnText}
                </div>
                <Link ref="toVideo" to={"/videoClass/"+this.state.planId+'/'+this.state.period} />
            </div>
        );
    }
}
