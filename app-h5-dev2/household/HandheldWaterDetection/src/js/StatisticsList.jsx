import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {DataInfo} from './DataInfo.jsx';

/**
 * 统计列表
 * */
class StatisticsList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.activeIndex = -1;
        this.state.listData = props.datas || [];
        this.state.imgCount = this.state.listData.length;
        this.state.imgComIndex = 0;
        this.state.pageIndex = 1;
    }

    componentDidMount() {
        let scroller = this.refs.scroll,
            pullDown = this.refs.pullDown,
            pullDownLabel = this.refs.pullDownLabel,
            pullUp = this.refs.pullUp,
            pullUpLabel = this.refs.pullUpLabel,
            goTop = this.refs.goTop,
            _this = this,
            step = 0;//加载状态：默认0,1为加载状态，2为执行加载
        this.myScroll = new IScroll(this.refs.scroll, {
            probeType: 2,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
            scrollbars: false,//有滚动条
            mouseWheel: true,//允许滑轮滚动
            fadeScrollbars: false,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果
            bounce: true,//边界反弹
            preventDefault: false,
            interactiveScrollbars: false,//滚动条可以拖动
            shrinkScrollbars: 'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
            click: false,// 允许点击事件
            keyBindings: false,//允许使用按键控制
            momentum: true,// 允许有惯性滑动
        });
        this.myScroll.on('scroll', function () {
            if (step == 0 && this.y > 10 && this.y <= 30) {
                pullDown.style.display = 'block';
                this.refresh();
                step = 1;
            } else if (step == 1 && this.y > 30) {
                pullDownLabel.innerHTML = '松手马上刷新...';
                pullDown.className = 'flip';
                step = 2;
            }
            if (step == 0 && this.y < (this.maxScrollY - 10) && this.y > (this.maxScrollY - 30)) {
                pullUp.style.display = 'block';
                this.refresh();
                step = 1;
            } else if (step == 1 && this.y <= this.maxScrollY - 30) {
                pullUpLabel.innerHTML = '松手马上加载...';
                pullUp.className = 'flip';
                step = 2;
            } else if (step == 2 && (this.y < this.maxScrollY) && (this.pointY < 1)) {
                this.scrollTo(0, this.maxScrollY, 400);
                return;
            }
        });
        this.myScroll.on('scrollEnd', function () {
            if (step == 1) {
                pullDown.style.display = 'none';
                pullUp.style.display = 'none';
                step = 0;
                this.refresh();
            }
            if (step == 2) {
                if (pullDown.className == 'flip') {
                    pullDownLabel.innerHTML = '正在刷新...';
                    pullDown.className = 'pull-tips';
                    step = 0;
                    _this.props.dataMethod('refresh');
                }
                if (pullUp.className == 'flip') {
                    pullUpLabel.innerHTML = '正在加载...';
                    pullUp.className = 'pull-tips';
                    step = 0;
                    _this.props.dataMethod('load');
                }
            }
        });
    }

    componentWillUpdate(props) {
        this.state.activeIndex = -1;
        this.state.listData = props.datas || [];
        this.state.imgCount = this.state.listData.length;
        this.state.imgComIndex = 1;
        this.state.pullDownLoading = false;
        this.state.pullUpLoading = false;
    }

    componentDidUpdate() {
        this.refs.pullDown.style.display = (this.state.pullDownLoading) ? 'block' : 'none';
        if (!this.state.pullDownLoading) this.refs.pullDownLabel.innerText = '下拉刷新';
        this.refs.pullUp.style.display = (this.state.pullUpLoading) ? 'block' : 'none';
        if (!this.state.pullUpLoading) this.refs.pullUpLabel.innerText = '上拉加载更多...';
    }

    getGrade(wqiVal) {
        let gradeVal;
        if (wqiVal <= 60) {
            gradeVal = "差";
        } else if (wqiVal > 60 && wqiVal < 80) {
            gradeVal = "中";
        } else if (wqiVal >= 80 && wqiVal < 90) {
            gradeVal = "良";
        } else {
            gradeVal = "优";
        }
        return gradeVal;
    };

    getGradeColor(wqiVal) {
        let gradeColor;
        if (wqiVal <= 60) {
            gradeColor = "red-color";
        } else if (wqiVal > 60 && wqiVal < 80) {
            gradeColor = "yellow-color";
        } else if (wqiVal >= 80 && wqiVal < 90) {
            gradeColor = "blue-color";
        } else {
            gradeColor = "green-color";
        }
        return gradeColor;
    };

    handleItem(index, e) {
        e.preventDefault();
        let currIndex = this.state.activeIndex;
        this.setState({
            activeIndex: currIndex == index ? '-1' : index
        });
        e.stopPropagation();
    }

    render() {
        let mydata = this.state.listData || [];
        let len = mydata.length;
        let activeIndex = this.state.activeIndex;
        return (
            <div className="statistics-scroll" ref="scroll">
                <div style={{display: (len > 0) ? 'block' : 'none'}}>
                    <div ref="pullDown" className="pull-tips" style={{display: 'none'}}>
                        <span ref="pullDownLabel">下拉刷新</span>
                    </div>
                    <div className="statistics--full">
                        {mydata.map(function (item, index) {
                            let wqiVal = item.wqi;
                            return <div
                                className="statistics-li" key={index}>
                                <div className='statistics-li-parent' data-index={index}
                                     onClick={this.handleItem.bind(this, index)}>
                                    <div>
                                        <p className="statistics-li-location">{item.uploadLocation != "" ? item.uploadLocation : "未知地址"}</p>
                                        <p>{item.uploadTime}</p>
                                    </div>
                                    <span className={this.getGradeColor(wqiVal)}>{this.getGrade(wqiVal)}
                                        <i className={index == activeIndex ? "statistics-li-zankai" : ""}></i></span>
                                </div>
                                <div className="statistics-li-children"
                                     style={{display: index == activeIndex ? "" : "none"}}>
                                    <DataInfo
                                        styleMode="1"
                                        myData={item}
                                    />
                                </div>
                            </div>
                        }.bind(this))}
                    </div>
                    <div ref="pullUp" className="pull-tips" style={{display: 'none'}}>
                        <span ref="pullUpLabel">上拉加载更多...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export {StatisticsList};