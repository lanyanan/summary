import {arrayMax } from'./LocalFuns.jsx';
let echartsDOM=null,
    myChart=null,
    changeyAxis = 0,
    data = [],
    option={
        grid:{
            left: '10%',
            right: '10%',
            top: '5%',
            bottom:'5%',
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            axisLine:{
                lineStyle:{
                    color: '#2b2d48'
                },
            },
            axisLabel:{
                show: false
            },
            axisTick: {
                length: 0
            }
        },
        yAxis: {
            type: 'value',
            //boundaryGap: [0, '100%'],
            min: 0,
            max: 150,
            interval: 30,
            splitNumber: 4,
            axisTick: {
                length: 0
            },
            splitLine: {
                show: true,
                lineStyle:{
                    color:  'rgba(106,119,249,0.2)'
                }
            },
            axisLine:{
                show: false
            },
            axisLabel:{
                textStyle: {
                    color: '#6e757b',
                },
            }
        },
        visualMap: {
            top: 100,
            right: 10,
            show:false,
            textStyle: {
                color: 'red'
            },
            pieces: [{
                gt: 0,
                lte: 20,
                color: '#fff'
            }, {
                gt: 20,
                lte: 50,
                color: '#ddd'
            }, {
                gt: 50,
                lte: 60,
                color: 'green'
            }, {
                gt: 60,
                lte: 100,
                color: '#ed5416'
            }, {
                gt: 100,
                lte: 160,
                color: '#cc0033'
            },
            {
                gt: 160,
                color: 'red'
            }
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            smooth: true,
        }]
    };
let now = +new Date(1997, 9, 3),
    oneDay = 24 * 3600 * 1000,
    randomData = function(x) {
        now = new Date(+now + oneDay);
        //value = value + Math.random() * 21 - 10;
        var obj = {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                x || 60
            ]
        };
        return obj
    };
for(let i=0;i<100;i++){
    data.push(randomData())
}

export const EchartsHeart = React.createClass({
    getInitialState(){
        return {};
    },
    liveError(){
        if(this.props.data.online==2){
            return '设备已离线'
        }
        if(this.props.data.networkavailable==2){
            return '当前网络不可用！'
        }
        return false;
    },
    componentWillReceiveProps(nextProps){
        console.log('----nextProps.measurestatus,this.props.measurestatus-------',nextProps.measurestatus,this.props.measurestatus);
        //当renderline == true 开始重绘，构造一个有60个数据的数组
        // if(nextProps.measurestatus!=this.props.measurestatus){
        //     for(let i=0;i<60;i++){
        //         data.push(randomData())
        //     }
        // }
        if(nextProps.measurestatus){
            for (var i = 0; i < 5; i++) {
                data.shift();
                data.push(randomData(nextProps.heartrate));
            }
            console.log('data-----------',data)

            if(nextProps.heartrate>150 &&　changeyAxis==0 ){
                changeyAxis = 1;
                option.yAxis.max = 200;
                option.yAxis.interval= 40;
                option.yAxis.splitNumber = 5;
                myChart.setOption({
                    yAxis:{
                        max: 200,
                        interval: 40,
                        splitNumber:5
                    }
                });
            }
            myChart.setOption({
                series:[{
                    data: data
                }]
            });

        }

        //停止，清空数据
        // if(!nextProps.measurestatus){
        //     data=[];
        //     myChart.setOption({
        //         series: [{
        //             data: data
        //         }]
        //     });
        // }
    },
    componentDidMount(){
        echartsDOM =document.querySelector('#air-curve');
        myChart = echarts.init(echartsDOM);
        myChart.setOption(option);
    },
    render() {
        return (
            <aside className="heart-echarts">
                <div id="air-curve" ref="airCurve" style={{height:'200px'}}></div>
            </aside>
        )
    }
});



