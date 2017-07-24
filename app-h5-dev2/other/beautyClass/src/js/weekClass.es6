import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
// import {ArcSliding} from './ArcSliding.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

// 创建React组件
export class WeekClass extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?96:66,
            planId: parseInt(this.props.params.planId) || 10,
            day:1,
            coverShow:false,
            valueH:0
        };
        this.listenStore(Store); // 监听Store
        this.myScroll = [];
        Actions.getWeekClass(this.state.planId);
    }
    componentDidMount() {
        //myScroll放在componentDidUpdate里面初始化，是应该在componentDidMount里面获取不到this.state.taskList.length，一直都是0
    }
    componentDidUpdate() {
        let length = this.state.taskList ? this.state.taskList.length : 0;
        for(let i=0;i<length;i++){
            this.myScroll[i] = new IScroll('#wrapper'+i, {
                eventPassthrough: true,
                scrollX: true, 
                scrollY: false,
                preventDefault: false 
            });
        }
        for(let i=0;i<length;i++){
            this.myScroll[i] && this.myScroll[i].refresh();
        }
    }
    hide(e) {
        let index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.setState({['show'+index]:!this.state['show'+index]});
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
    selectDay(e) {
        this.setState({coverShow:true});
        e.stopPropagation();
        e.preventDefault();
    }
    cancel() {
        this.setState({coverShow:false});
    }
    endDefault(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    endDefault1(e){
        e.stopPropagation();
    }
    choiceDay(e) {
        let index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.setState({
            day:index+1,
            coverShow:false
        })
    }
    render() {
        console.log('最终数据:',this.state);
        let tags = this.state.tags || [];
        let taskList = this.state.taskList || [];
        let length = taskList.length;
        let day = this.state.day;
        let btnText = this.state.isJoin ? '开始第'+day+'天课程':'添加课程';
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
                        <span>周期课程</span>
                        <p><i className="calendar"></i>{this.state.subName}</p>
                    </div>
                    <img src={this.state.imageUrl} />
                    <div className="black-cover"></div>
                </div>
                <section className="s-middle">
                    <h3>课程详情</h3>
                    <p>{this.state.abstracts}</p>
                </section>
                <section className="s-detail">
                    {taskList.map((item,index)=>{
                        return (
                            <div key={index} className="w-class">
                                <div className="w-class-top">
                                    <h3>{item.taskSmallTitle} {item.taskMainTitle}</h3>
                                    <span data-index={index} onTouchTap={this.hide.bind(this)}>{item.totle||0}个动作<i className={this.state['show'+index]?'arrow-u':'arrow-d'}></i></span>
                                </div>
                                <div className="w-class-bottom" id={'wrapper'+index} style={{display:this.state['show'+index]?'':'none'}}>
                                    <div className="scroller" id={'scroller'+index} style={{width:188*item.totle/24+'rem'}}>
                                        {item.detailList && item.detailList.map((item,index)=>{
                                            return (
                                                <div key={index} className="img-c">
                                                    <img src={item.imageurl}/>
                                                    <span>{item.smallTitle}</span>
                                                    <i>{index+1}</i><em></em>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
                <div className={this.state.isJoin ? 'footer-join':'footer'} onTouchTap={this.startClass.bind(this)}>
                    <div className="choice-day" onTouchTap={this.selectDay.bind(this)}>
                        <span>{day}/{length}</span>
                    </div>
                    {btnText}
                </div>
                <Link ref="toVideo" to={"/videoClass/"+this.state.planId+'/'+this.state.period+'/'+day} />
                {/*选择天数浮层*/}
                <div className="cover" style={{display:this.state.coverShow?'':'none'}} onTouchStart={this.endDefault1.bind(this)}>
                    <section onTouchEnd={this.cancel.bind(this)} onTouchMove={this.endDefault.bind(this)} onTouchStart={this.endDefault.bind(this)}></section>
                    <ul className="day-ul">
                        {taskList.map((item,index)=>{
                            return (
                                <li key={index} data-index={index} onTouchTap={this.choiceDay.bind(this)}><span>{item.taskSmallTitle} {item.taskMainTitle}</span><i className={day-1 == index ? 'check':''}></i></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
