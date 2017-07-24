/**
 * 颜色拾取组件
 * @prop {string}  id       图表id
 * @prop {string}  data     渲染的数据
 * @prop {string}  x        x轴的坐标
 * @prop {string}  max      y轴的最大值
 * @prop {string}  offset   栅格的位置
 * @prop {string}  monitoringName  监测图表名字
 * @prop {string}  monitoringNum   监测图表的当前值
 */

export class SleepChart extends React.Component{
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
        
    }
    // 阻止页面滚动
    stopBodyScroll(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    echartInit(id,x,max,data,offset) {
            let dom = document.getElementById(id);
            let myChart = echarts.init(dom);
            let app = {};
            let option = null; 
            option = {
                animation:false,
                tooltip: {},
                legend: {data:['']},
                grid:{
                    show:false,
                    left:offset.left,
                    top:offset.top,
                    bottom:offset.bottom,
                    right:offset.right,
                },
                xAxis: {
                    show:false,
                    boundaryGap: true,
                    data: x
                    } ,
                yAxis: {
                    show:false,
                    type:'value',
                    max:max,
                },
                series: {
                    symbol:"none",
                    name:'',
                    type:'line',
                    data:data,
                    lineStyle:{
                        normal:{
                            width:'2',
                            color:'#fff'
                            }
                        }
                    }
            };
            myChart.setOption(option);
    }
    resetChart() {
        let id = this.props.id;
        let data = this.props.data;
        let x = this.props.x;
        let max = this.props.max;
        let offset = this.props.offset;
        this.echartInit(id,x,max,data,offset)
    }
    render() {
        this.resetChart();
        return  <div className="monitering">
                    <div className="moniter-chart moniter-heart-beat">
                         <div className="chart-left">
                            <div className="data-name">{this.props.monitoringName}</div>
                            <div className="data-number">
                                <h3>{this.props.monitoringNum}</h3>
                                <i>次/分</i>
                            </div>
                         </div>
                         <div id="heartBeat" className="chart-right grid"></div>
                         <div id={this.props.id} className="line" style={{left:'32%'}}></div>
                    </div>
                </div>;
    }
};

