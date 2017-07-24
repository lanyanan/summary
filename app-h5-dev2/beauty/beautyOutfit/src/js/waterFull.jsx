import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { Card } from './Card.jsx';

class WaterFull extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.listData = props.datas||[];
        this.state.columnCount = props.column;
        this.state.imgCount=this.state.listData.length;
        this.state.imgComIndex=0;
        this.state.pageIndex = 1;
    }
    // CreateList() {
    //     return [
    //         { imgUrl: 'http://img2.imgtn.bdimg.com/it/u=1876038905,3897565663&fm=21&gp=0.jpg', title: '用了喷雾仪脸还干,补水还是没有什么效果,究竟是什么...', badges: ['漂亮', '21岁', '大陆人'] },
    //         { imgUrl: 'http://img3.imgtn.bdimg.com/it/u=2116432478,692805493&fm=21&gp=0.jpg', title: '跑车跑车跑车', badges: ['A380', '747', '大飞机', '国行', '大陆', '到处飞'] },
    //         { imgUrl: 'http://img4.imgtn.bdimg.com/it/u=2973782313,1308926371&fm=21&gp=0.jpg', title: '路飞路飞路飞路飞路飞路飞路飞', badges: [] },
    //         { imgUrl: 'http://img3.redocn.com/20100320/Redocn_2010031716352583.jpg', title: '企鹅企鹅企鹅企鹅企鹅', badges: ['南极', '北极', '鸟'] },
    //         { imgUrl: 'http://img5.imgtn.bdimg.com/it/u=1383231899,2215646628&fm=21&gp=0.jpg', title: '妹子妹子妹子妹子', badges: ['漂亮', '21岁', '大陆人'] },
    //         { imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1127553013,3735062896&fm=21&gp=0.jpg', title: '橙子橙子橙子橙子橙子橙子橙子', badges: ['宣传照片'] },
    //         { imgUrl: 'http://img5.imgtn.bdimg.com/it/u=715530332,997477173&fm=21&gp=0.jpg', title: '猫咪猫咪猫咪猫咪猫咪', badges: ['短毛', '可爱', '猫'] },
    //         { imgUrl: 'http://travel.mangocity.com/images/plane/74M.jpg', title: '飞机飞机飞机', badges: ['波音', '747', '大飞机', '国行', '大陆', '到处飞'] },
    //     ]
    // }
    componentDidMount() {
        let scroller = this.refs.scroll,
            pullDown = this.refs.pullDown,
            pullDownLabel = this.refs.pullDownLabel,
            pullUp = this.refs.pullUp,
            pullUpLabel = this.refs.pullUpLabel,
            goTop=this.refs.goTop,
            _this = this,
            step = 0;//加载状态：默认0,1为加载状态，2为执行加载
        this.myScroll = new IScroll(this.refs.scroll, {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
            scrollbars: false,//有滚动条  
            mouseWheel: true,//允许滑轮滚动  
            fadeScrollbars: false,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
            bounce: true,//边界反弹  
            interactiveScrollbars: false,//滚动条可以拖动  
            shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: false,// 允许点击事件  
            keyBindings: false,//允许使用按键控制  
            momentum: true,// 允许有惯性滑动  
        });
        this.myScroll.on('scroll',function(){
            if(step==0&&this.y>20&&this.y<=40){
                pullDown.style.display = 'block';
                this.refresh();
                step = 1;
            }else if(step==1&&this.y>40){
                pullDownLabel.innerHTML = '松手马上刷新...';
                pullDown.className = 'flip';
                step = 2;
            }
            if(step==0&&this.y<(this.maxScrollY-50)){
                pullUp.style.display = 'block';
                this.refresh();
                step = 1;
            }else if(step==1&&this.y<this.maxScrollY-30){
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
                    pullDown.className = 'pull-tips';
                    step = 0;
                    _this.props.dataMethod('refresh');
                }
                if(pullUp.className=='flip'){
                    pullUpLabel.innerHTML = '正在加载...';
                    pullUp.className = 'pull-tips';
                    step = 0;
                     _this.props.dataMethod('load');
                }
            }
            if(this.y<-250){
                goTop.style.display='block';
            }else{
                goTop.style.display='none';
            }
        });
    }
    handleImgComplate(){
        this.state.imgComIndex++;
        if(this.state.imgComIndex==this.state.imgCount){
            this.myScroll.refresh();
        }
    }
    componentWillUpdate(props){
        this.state.listData = props.datas||[];
        this.state.columnCount = props.column;
        this.state.imgCount=this.state.listData.length;
        this.state.imgComIndex=1;
        this.state.pullDownLoading=false;
        this.state.pullUpLoading=false;
    }
    componentDidUpdate(){
        this.refs.pullDown.style.display=(this.state.pullDownLoading)?'block':'none';
        if(!this.state.pullDownLoading)this.refs.pullDownLabel.innerText='下拉刷新';
        this.refs.pullUp.style.display=(this.state.pullUpLoading)?'block':'none';
        if(!this.state.pullUpLoading)this.refs.pullUpLabel.innerText='上拉加载更多...';
    }
    handleBackTop(e){ 
        e.preventDefault();
        e.stopPropagation();
        this.myScroll.scrollTo(0,0,400);
        //this.refs.goTop.style.display='none';
    }
    render() {
        let self=this;
        let count = this.state.columnCount,
            i = 0, len = this.state.listData.length, listViews = [], columnWith = Math.floor(100 / count);
        let createItemView = function (item, index) {
            var badges=[];
            for(let i=0;i<item.tags.length;i++){
                badges.push(item.tags[i].tagName);
            }
            return <Card key={item.newsId} option={{ imgUrl: item.smallPic, title: item.title, badges:badges,newsId:item.newsId}} onImgCompalte={self.handleImgComplate.bind(self)}></Card>;
        };
        for (; i < count; i++) {
            listViews[i] = [];
        }
        i = 0;
        for (; i < len; i++) {
            let index = i % count;
            listViews[index].push(createItemView(this.state.listData[i], i));
        }
        return (
            <div className="scroll" ref="scroll">
                <div style={{display:(len>0)?'block':'none'}}>
                    <div ref="pullDown"  className="pull-tips">   
                        <span ref="pullDownLabel">下拉刷新</span>
                    </div>
                    <div className="water-full">
                        {
                            listViews.map(function (item, index) {
                                return <div className="column" key={index} style={{ width: columnWith + '%' }}>
                                    {item}
                                </div>
                            })
                        }
                    </div>
                    <div ref="pullUp" className="pull-tips">
                        <span ref="pullUpLabel">上拉加载更多...</span>
                    </div>
                </div>
                <div className="go-top" onTouchTap={this.handleBackTop.bind(this)} ref="goTop" style={{display:'none'}}></div>
            </div>
        )
    }
};

export { WaterFull };