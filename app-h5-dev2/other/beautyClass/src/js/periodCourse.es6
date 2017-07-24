import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Component} from 'react';
import {Link} from 'react-router';

/* 
 判断是否为数组
 */ 
function isArrayFn(value){ 
    if (typeof Array.isArray === "function") { 
        return Array.isArray(value); 
    }else{ 
        return Object.prototype.toString.call(value) === "[object Array]"; 
    } 
} 

// 创建React组件
export class PeriodCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1
        };
        this.listenable = Store.listen((data)=>this.setState(data)); // 监听Store
    }
    componentDidMount(){
        this.initIscroll();
        Actions.getCourseList2(this.state.pageIndex,1);
        this.myScroll.refresh();
    }      
    componentDidUpdate(){        
        this.myScroll.refresh();
    }
    componentWillUnmount(){
        this.listenable();
        clearTimeout(this.clickTap);
        this.setState({pageIndex: 1});
    }
    endTap(e){
        e.preventDefault();
        e.stopPropagation();
        let id = e.currentTarget.getAttribute('data-id');
        let con = ReactDOM.findDOMNode(this.refs[id]);
        con.style.backgroundColor = 'rgba(0,0,0,0.3)';
        let cur = e.currentTarget;
        let _this = this;
        this.clickTap = setTimeout(function(){
             con.style.backgroundColor = 'rgba(0,0,0,0.1)';
             cur.click();
        },100);
        
    }
    initIscroll(){
        let pullDown = document.getElementById('pullDown');
        let pullDownLabel = document.getElementById('pullDownLabel');
        let pullUp = document.getElementById('pullUp');
        let pullUpLabel = document.getElementById('pullUpLabel');
        let pullDownOffset = pullDown.offsetHeight; 
        let pullUpOffset = pullUp.offsetHeight;
        let _this = this;
        let step = 0;//加载状态：默认0,1为加载状态，2为执行加载
        pullDown.style.display = 'none';
        pullUp.style.display = 'none';
        this.myScroll = new IScroll('#wraper', {  
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
            scrollbars: false,//有滚动条  
            mouseWheel: true,//允许滑轮滚动  
            fadeScrollbars: false,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
            bounce:true,//边界反弹  
            interactiveScrollbars:false,//滚动条可以拖动  
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: false,// 允许点击事件  
            keyBindings:false,//允许使用按键控制  
            momentum:true,// 允许有惯性滑动  
        }); 
        this.myScroll.on('scroll',function(){
            if(step==0&&this.y>10&&this.y<=30){
                pullDown.style.display = 'block';
                this.refresh();
                step = 1;
            }else if(step==1&&this.y>30){
                pullDownLabel.innerHTML = '松手马上刷新...';
                pullDown.className = 'flip';
                step = 2;
            }
            if(step==0&&this.y<(this.maxScrollY-10)&&this.y>(this.maxScrollY-30)){
                pullUp.style.display = 'block';
                this.refresh();
                step = 1;
            }else if(step==1&&this.y<=this.maxScrollY-30){
                pullUpLabel.innerHTML = '松手马上加载...';
                pullUp.className = 'flip';
                step = 2;
            }else if(step==2&&(this.y < this.maxScrollY) && (this.pointY < 1)){
                this.scrollTo(0, this.maxScrollY, 400);
                return;
            }

        });
        this.myScroll.on('scrollEnd',function(){
            if(step==1){
                pullDown.style.display = 'none';
                pullUp.style.display = 'none';
                step = 0;
                this.refresh();
            }
            if(step==2){
                if(pullDown.className=='flip'){
                    pullDownLabel.innerHTML = '正在刷新...';
                    pullDown.className = '';
                    step = 0;
                    Actions.getCourseList2(_this.state.pageIndex,1);
                }
                if(pullUp.className=='flip'){
                    pullUpLabel.innerHTML = '正在加载...';
                    pullUp.className = '';
                    step = 0;
                    let pageIndex = _this.state.pageIndex;
                    ++pageIndex;
                    Actions.getCourseList2(pageIndex,1);
                }
            }
        })
    }
    render() {
        let list = null;
        let items = this.state.items || [];
        if(isArrayFn(items)){
            list = items.map((item,index)=>{
                let len = items.length;
                let more = '';
                if(index===0) more = 'first';
                if(index===len-1) more = 'last';
                let adr = '';
                if(item.period===1) adr = 'weekClass/' + item.planId;
                if(item.period===2) adr = 'singleClass/' + item.planId;
                return (

                    <Link to={adr} className={'course-show '+more} key={index} onTouchTap={this.endTap.bind(this)} data-id={item.planId}>
                        <div className='show-con flex' ref={item.planId}>
                            <h1>{item.planName}</h1>
                            <div className='show-word flex'>
                                <em className={['cal','clock'][parseInt(item.period)-1]}></em>
                                <span>{item.subName}</span>
                            </div>
                            <div className='show-join flex' style={{display: `${item.isJoin?'':'none'}`}}>
                                <em></em>
                                <span>已参加</span>
                            </div>
                        </div>
                        <img src={item.imageUrl}/>
                    </Link>

                    )

            })
        }
        return (
                    <div id='wraper'>
                        <div id='scroller'>
                            <div id="pullDown">   
                                <span id="pullDownLabel">下拉刷新</span>  
                            </div>

                            <div className='period-course flex'>
                                {list}
                            </div>

                            <div id="pullUp">  
                                <span id="pullUpLabel">上拉加载更多...</span>  
                            </div>
                        </div>

                        <div className='m-toast' id='toast' style={{display: 'none'}}></div>
                    </div>
                    
                )
                
    }
}