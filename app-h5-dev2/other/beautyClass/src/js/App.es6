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

//获取数组中的最大值
function getMaxValue(arr){
    let max = arr[0];
    for(let i=0;i<arr.length;i++){ 

      if(max<arr[i]) max=arr[i];

    }
      return max
}
//获取数组中唯一元素对应下标
function getIndex(value,arr){
    let idx = 0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]==value){
            idx = i;
        }
    }
    return idx
}

//获取最近7天的日期（包括今天）
function get7days(){
    let myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 6);
    let dateArray = []; 
    let dateTemp; 
    let flag = 1;  
    for (let i = 0; i < 7; i++) {
        dateTemp = (myDate.getMonth()+1)+"/"+myDate.getDate();
        dateArray.push(dateTemp);
        myDate.setDate(myDate.getDate() + flag);
    }
    return dateArray
}


// 创建React组件
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.timeOutEvent = 0;
        this.flag = true;
        this.listenable = Store.listen((data)=>this.setState(data)); // 监听Store
    }
    formatter(num){
        return num<9?'0'+num:num;
    }
    componentDidUpdate(){
               let myChart = echarts.init(document.getElementById('mychart'));
               let count = this.state.count;
               let totalList = [];
               if(count&&count.list.length>0){
                   totalList = count.list;
                   let timeArr = [], valueArr = [];
                   if(totalList.length>0){
                       for(let i=0,len=totalList.length;i<len;i++){
                           timeArr[i] = totalList[i].date.split('-')[1]+'/'+totalList[i].date.split('-')[2];
                           valueArr[i] = totalList[i].value;
                       }
                   }

                   let maxValue = getMaxValue(valueArr);
                   if(maxValue<30) maxValue = 30;
                   let num = maxValue%3;
                   if(num===1){
                      maxValue = maxValue + 2;
                   }else if(num===2){
                      maxValue = maxValue + 1;
                   }
                   let _maxArr = [];
                   for(let i=0,len=valueArr.length;i<len;i++){
                      _maxArr[i] = maxValue;
                   }
                   let interval = maxValue/3;
                   let _this = this;
                   let option = {
                       title: {
                           show: false,
                           padding: 0,
                       },
                       grid: {
                           x:48, y:15, x2:15, y2:30,

                       },
                       tooltip: {show: false},
                       legend: {
                           show: false
                       },
                       xAxis: [{
                               type: 'category', 
                               axisLine: {
                                    show: false,
                               },
                               axisTick: {
                                    show: false,
                               },
                               axisLabel: {
                                    interval: 0,
                                    textStyle: {
                                        color: function (val) {
                                            let arr = timeArr;
                                            return val == arr[arr.length-1] ? '#F35A50' : '#909090';
                                        }
                                    },
                               },
                               data: timeArr,
                           },
                           {
                               type : 'category',
                               axisLine: {show:false},
                               axisTick: {show:false},
                               axisLabel: {show:false},
                               splitArea: {show:false},
                               splitLine: {show:false},
                               data : timeArr
                            }
                        ],
                       yAxis: {
                            axisLine: {
                                 show: false,
                            },
                            axisTick: {
                                 show: false,
                            },
                            interval: interval,
                            min: 0,
                            max: maxValue,
                            splitLine: {
                                 show: true,
                                 lineStyle: {
                                     color: '#f1f1f1'
                                 },
                            },
                            axisLabel: {
                                formatter: function(value,index){
                                    let min = parseInt(value/60);
                                    let second = value - min*60;
                                    return _this.formatter(min)+':'+_this.formatter(second);
                                },
                                textStyle: {
                                    color: '#909090'
                                },
                            },
                       },
                       series: [
                       {
                           name: '销量',
                           type: 'bar',
                           itemStyle: {
                                normal: {
                                    color: '#F35A50',
                                    barBorderRadius: [5,5,0,0],
                                },
                           },
                           zlevel: 1,
                           silent: true,
                           barWidth: '50%',
                           data: valueArr,
                       },
                       {
                           name: '销量',
                           type: 'bar',
                           xAxisIndex:1,
                           barWidth: '50%',
                           zlevel: 0,
                           silent: true,
                           itemStyle: {normal: {color:'#F5F5F5'}},
                           data: _maxArr
                       }
                       ]
                   };
                   myChart.setOption(option);
               }

    }
    componentDidMount(){
        Actions.getCourseData();
        Actions.getCourseCount();
        let _this = this;
        let timeArr = get7days();
        let option = {
            title: {
                show: false,
                padding: 0,
            },
            animation: false,
            grid: {
                x:48, y:15, x2:15, y2:30,

            },
            tooltip: {show: false},
            legend: {
                show: false
            },
            xAxis: [{
                    type: 'category', 
                    axisLine: {
                         show: false,
                    },
                    axisTick: {
                         show: false,
                    },
                    axisLabel: {
                         interval: 0,
                         textStyle: {
                             color: function (val) {
                              return '#909090'
                                 // let arr = timeArr;
                                 // return val == arr[arr.length-1] ? '#F35A50' : '#909090';
                             }
                         },
                    },
                    data: timeArr,
                },
                {
                    type : 'category',
                    axisLine: {show:false},
                    axisTick: {show:false},
                    axisLabel: {show:false},
                    splitArea: {show:false},
                    splitLine: {show:false},
                    data : timeArr
                 }
             ],
            yAxis: {
                 axisLine: {
                      show: false,
                 },
                 axisTick: {
                      show: false,
                 },
                 interval: 10,
                 min: 0,
                 max: 30,
                 splitLine: {
                      show: true,
                      lineStyle: {
                          color: '#f1f1f1'
                      },
                 },
                 axisLabel: {
                     formatter: function(value,index){
                         // let min = parseInt(value/60);
                         // let second = value - min*60;
                         return '00:00';
                     },
                     textStyle: {
                         color: '#909090'
                     },
                 },
            },
            series: [
            {
                name: '销量',
                type: 'bar',
                itemStyle: {
                     normal: {
                         color: '#F35A50',
                         barBorderRadius: [5,5,0,0],
                     },
                },
                zlevel: 1,
                silent: true,
                barWidth: '50%',
                data: [0,0,0,0,0,0,0],
            },
            {
                name: '销量',
                type: 'bar',
                xAxisIndex:1,
                barWidth: '50%',
                zlevel: 0,
                silent: true,
                itemStyle: {normal: {color:'#F5F5F5'}},
                data: [30,30,30,30,30,30,30]
            }
            ]
        };
        let myChart = echarts.init(document.getElementById('mychart'));
        myChart.setOption(option);
    }
    componentWillUnmount(){
        this.listenable();
        clearTimeout(this.clickTap);
        clearTimeout(this.clickBtn);
    }
    tapBtn(e){
        e.stopPropagation();
        e.preventDefault();
        let btn = e.currentTarget.getAttribute('data-btn');
        let con = ReactDOM.findDOMNode(this.refs[btn]);
        if(con){
            con.style.backgroundColor = 'rgba(0,0,0,0.1)';
            let cur = e.currentTarget;
            this.clickBtn = setTimeout(function(){
                 con.style.backgroundColor = 'rgba(0,0,0,0)';
                 cur.click();
            },100);
        }
    }
    clearDefault(e){
      e.stopPropagation();
      e.preventDefault();
    }
    confirmDel(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({show: false});
        let planId = this.state.delId;
        Actions.delCourse(planId);
    }
    startTap(e){
        e.stopPropagation();
        let id = e.currentTarget.getAttribute('data-id');
        let self = this;
        this.longPress = setTimeout(function(){
            self.longPress = 0;
            self.setState({show: true,delId: id});
        },500);
        
    }
    moveTap(e){
        e.stopPropagation();
        clearTimeout(this.longPress);
        this.longPress = 0;
    }
    endTap(e){
        e.stopPropagation();
        if(this.longPress==0){
            clearTimeout(this.longPress);
            this.longPress = 0;
            return false
        }
        let id = e.currentTarget.getAttribute('data-id');
        let con = ReactDOM.findDOMNode(this.refs[id]);
        con.style.backgroundColor = 'rgba(0,0,0,0.3)';
        if(con){
            let cur = e.currentTarget;
            this.clickTap = setTimeout(function(){
                 con.style.backgroundColor = 'rgba(0,0,0,0.1)';
                 cur.click();
            },100);
        } 
    }
    cancelPop(e){
      e.preventDefault();
      e.stopPropagation();
      this.setState({show: false})
    }
    render() {
        let mylist=null,fitlist=null,commonlist=null;
        let my = this.state.my,rec = this.state.recommend || [],hot = this.state.hot;
        if(isArrayFn(my)){
            mylist = my.map((item,index)=>{
                let len = my.length;
                let more = '';
                if(index===0) more = 'first';
                if(index===len-1) more = 'last';
                let adr = '';
                if(item.period===1) adr = 'weekClass/' + item.planId;
                if(item.period===2) adr = 'singleClass/' + item.planId;
                return (

                    <Link to={adr} className={'course-item '+more} key={index} onTouchStart={this.startTap.bind(this)} onTouchMove={this.moveTap.bind(this)} onTouchEnd={this.endTap.bind(this)} data-id={item.planId}>
                        <div className='item-con flex' ref={item.planId}>
                            <h1>{item.planName}</h1>
                            <div className='item-word flex'>
                                <em className={['cal','clock'][parseInt(item.period)-1]}></em>
                                <span>{item.subName}</span>
                            </div>
                        </div>
                        <img src={item.imageUrl}/>
                        <div className={`item-tip flex ${item.todayfinish?'finished':'unfinished'}`}><span>{item.todayfinish?'今日已完成':'今日未完成'}</span></div>
                    </Link>

                    )

            })
        }
        if(isArrayFn(rec)){
            fitlist = rec.map((item,index)=>{
                let len = rec.length;
                let more = '';
                if(index===0) more = 'first';
                if(index===len-1) more = 'last';
                let adr = '';
                if(item.period===1) adr = 'weekClass/' + item.planId;
                if(item.period===2) adr = 'singleClass/' + item.planId;
                return (

                    <Link to={adr} className={'course-item '+more} key={index} onTouchTap={this.endTap.bind(this)} data-id={item.planId}>
                        <div className='item-con flex' ref={item.planId}>
                            <h1>{item.planName}</h1>
                            <div className='item-word flex'>
                                <em className={['cal','clock'][parseInt(item.period)-1]}></em>
                                <span>{item.subName}</span>
                            </div>
                        </div>
                        <img src={item.imageUrl}/>
                    </Link>

                    )

            })
        }
        if(isArrayFn(hot)){
            commonlist = hot.map((item,index)=>{
                let len = hot.length;
                let more = '';
                if(index===0) more = 'first';
                if(index===len-1) more = 'last';
                let adr = '';
                if(item.period===1) adr = 'weekClass/' + item.planId;
                if(item.period===2) adr = 'singleClass/' + item.planId;
                return (

                    <Link to={adr} className={'course-item '+more} key={index} onTouchTap={this.endTap.bind(this)} data-id={item.planId}>
                        <div className='item-con flex' ref={item.planId}>
                            <h1>{item.planName}</h1>
                            <div className='item-word flex'>
                                <em className={['cal','clock'][parseInt(item.period)-1]}></em>
                                <span>{item.subName}</span>
                            </div>
                        </div>
                        <img src={item.imageUrl}/>
                    </Link>

                    )

            })
        }
        let noData = (
                <div className='nodata flex' onTouchTap={this.clearDefault.bind(this)}>
                    <Link to='/addCourse/singleCourse' onTouchTap={this.tapBtn.bind(this)} data-btn='btn2'>
                        <div ref='btn2' style={{width: '100%',height: '100%',borderRadius: '50%'}}></div>
                    </Link>
                    <p>小主,请添加一个课程</p>
                </div>
            );
        let count = this.state.count;
        let totalTime = '',totalCount = '', totalDay = '';
        if(count){
            totalTime = count.totalTime;
            totalCount = count.totalCount;
            totalDay = count.totalDay;
        }
        //let hour = parseInt(totalTime/3600);
        let min = parseInt(totalTime/60);
        return (
                <div>
                    <div className='m-top flex'>
                        <div className='statistics flex'>
                            <p><strong>{min}</strong><span>分</span></p>
                            <h3>累计美容</h3>
                        </div>
                        <div className='statistics flex'>
                            <p><strong>{totalCount}</strong><span>次</span></p>
                            <h3>累计完成</h3>
                        </div>
                        <div className='statistics flex'>
                            <p><strong>{totalDay}</strong><span>天</span></p>
                            <h3>坚持美容</h3>
                        </div>
                    </div>

                    <div className='m-chart'>
                        <div id='mychart' className='mychart'></div>
                    </div>

                    <div className='color-block'></div>

                    <div className='mycourse m-course flex' onTouchTap={this.clearDefault.bind(this)}>
                        <h2>我的课程</h2>
                        <Link to='/addCourse/singleCourse' onTouchTap={this.tapBtn.bind(this)} data-btn='btn1'>
                            <div ref='btn1' style={{width: '100%',height: '100%',borderRadius: '50%'}}></div>
                        </Link>
                    </div>

                    <div className='mycourse-list flex'>
                        {(my!==undefined&&my.length===0)?noData:mylist}
                    </div>


                    <div className='color-block' style={{display:`${rec.length?'':'none'}`}}></div>
                    <div className='fit-course m-course flex' style={{display:`${rec.length?'':'none'}`}}>
                        <h2>适合我的</h2>
                    </div>
                    <div className='fitme-list flex'>
                        {fitlist}
                    </div>


                    <div className='color-block'></div>
                    <div className='common-course m-course flex'>
                        <h2>大家都在参与的</h2>
                    </div>
                    <div className='common-list flex'>
                        {commonlist}
                    </div>

                    <div className='m-delPop' style={{display: `${this.state.show?'':'none'}`}} onTouchStart={this.clearDefault.bind(this)}>
                        <div className='m-isDel-shade' onTouchTap={this.cancelPop.bind(this)}></div>
                        <div className='m-isDel flex'>
                            <p className='flex'>确定退出课程？</p>
                            <div className='flex isSure'>
                                <span className='flex' onTouchTap={this.cancelPop.bind(this)}>取消</span>
                                <span className='flex' onTouchTap={this.confirmDel.bind(this)}>确认</span>
                            </div>
                        </div>
                    </div>

                </div>
            );
    }
}