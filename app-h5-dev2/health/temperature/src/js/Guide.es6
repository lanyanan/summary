import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
var {Router, Route, hashHistory,Link} = ReactRouter;

// 创建React组件
export class Guide extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {timeArray:["00:00"],
                    tempArray:['37'],
                    changeDate:'',
                    appId:'',
                    deviceId:'',
                    userType:'',
                    memberId:'',
                    index:2,
                    headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    measure(){
        het.toast('measure');
        ReactDOM.findDOMNode(this.refs["toApp"]).click();
    }
    moveStart(e){
        //开始拖动,记录初始坐标
        e.preventDefault();
        e.stopPropagation();
        this.initX = e.touches[0].clientX;
        this.clientX = e.touches[0].clientX;
        this.initTime = +new Date();
    }
    moveIng(e){
        //拖动中,根据拖动的偏移量计算拖动后的位置,忽略偏移太大的拖动
        e.preventDefault();
        e.stopPropagation();
        this.clientX = e.touches[0].clientX;
    }
    moveEnd(e){
        //结束拖动,如果需要返回值,则返回拖动的值
        e.preventDefault();
        e.stopPropagation();
        let time = +new Date();
        let index = this.state.activeIndex || 0;
        if((time-this.initTime)<100) return;
        if((this.clientX-this.initX)>0){
            index-=1;
        }else{
            index+=1;
        }
        if(index<0) index=0;
        if(index>2) index=2;
        this.setState({
            activeIndex : index 
        });
    }
    render() {
        let index = this.state.activeIndex || 0;
        return (
            <div className='guide'>
               <section className='main'>
                    <ul className="flex" onTouchStart={this.moveStart.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.moveEnd.bind(this)}>
                        <li style={{display:index==0?"block":'none'}}><img src="../static/img/guide1.png"/></li>
                        <li style={{display:index==1?"block":'none'}}><img src="../static/img/guide2.png"/></li>
                        <li style={{display:index==2?"block":'none'}}>
                            <img src="../static/img/guide3.png"/>
                            <span onTouchStart={this.measure.bind(this)}  id='device-btn' className='btn flex show'>连接设备</span>
                        </li>
                    </ul>
                    <p className="radius">
                        <span style={{background:index==0?"#3cc6d1":'#a0a0a0'}}></span>
                        <span style={{background:index==1?"#3cc6d1":'#a0a0a0'}}></span>
                        <span style={{background:index==2?"#3cc6d1":'#a0a0a0'}}></span>
                    </p>
                </section>
            <Link className='flex' to='/' ref='toApp' style={{opacity:0,width:0,height:0,display:'block'}}></Link>
        </div>
        );
    }
}