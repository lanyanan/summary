/**
 仪表盘
 */

'use strict';
const AppData = {}
export class DashboardView extends React.Component {

    constructor(props) {
        super(props)
        this.drawDashboardView = this.drawDashboardView.bind(this)
    }

    drawDashboardView() {
        // console.log("View--> 绘制DashboardView-->drawDashboardView");
        // var canvas = ReactDOM.findDOMNode(this.refs.dashboard)

        var canvas = document.getElementById("dashboard");
        var currentIAQ = canvas.getAttribute('data-currentIAQ');
        var context = canvas.getContext("2d");

        AppData.currentIAQ = currentIAQ;
        context.clearRect(0, 0, canvas.width, canvas.height);

        var perIAQ = 3,
            maxIAQ = 360;

        var critical = 75 + (currentIAQ) / perIAQ;

        var TICK_WIDTH = 15,
            TICK_LONG_STROKE_STYLE = "rgba(255,255,255,1.0)",
            TICK_SHORT_STROKE_STYLE = "rgba(235,255,246,0.3)",
            TICK_NO_STROKE_STYLE = "rgba(235,55,246,0)";


        let diameter = canvas.width > canvas.height ? canvas.height : canvas.width;
        var circle = {
            x: canvas.width * 0.5,
            y: canvas.height * 0.5,
            radius: diameter * 0.35
        };

//Functions------------------------------------------------
        //绘制仪表刻度（包括长刻度，短刻度）
        function drawTicks() {
            var radius = circle.radius,
                ANGLE_MAX = Math.PI * 2,
                ANGLE_DELTA = Math.PI / 90,//每个2°
                tickWidth;
            //利用度数做循环
            //cnt用于计算数目
            for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle = angle + ANGLE_DELTA, cnt++) {
                drawTick(angle, radius, cnt);
            }
            //利用半径与半径与x轴夹角绘制单个刻度
            function drawTick(angle, radius, cnt) {
                var tickWidth;
                context.save();

                let isLongLine = (cnt - 15) % 30 === 0;

                tickWidth = isLongLine ? TICK_WIDTH : (TICK_WIDTH * 0.8);

                if (cnt > 23 && cnt < 68) {//正下方的不显示部分
                    context.strokeStyle = TICK_NO_STROKE_STYLE;
                } else if (currentIAQ < 50) {
                    perIAQ = 50 / 7.0;
                    critical = 68 + (currentIAQ / perIAQ);
                    context.strokeStyle = (cnt > 67 && cnt < critical) || ((cnt - 15) % 30 === 0) ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
                } else if (currentIAQ < 200) {
                    perIAQ = 150 / 90.0;
                    critical = 75 + ((currentIAQ - 50) / perIAQ);
                    context.strokeStyle = (cnt > 67 && cnt < critical) || ((cnt - 15) % 30 === 0) ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
                } else if (currentIAQ < 300) {
                    perIAQ = 100 / 30.0;
                    critical = 165 + ((currentIAQ - 200) / perIAQ);
                    context.strokeStyle = (cnt > 67 && cnt < critical) || ((cnt - 15) % 30 === 0) ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
                    if (currentIAQ > 249 && cnt < 23) {
                        let current = (currentIAQ - 249) / perIAQ;
                        context.strokeStyle = (cnt < current) || ((cnt - 15) % 30 === 0) ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
                    }
                } else if (currentIAQ < 450) {
                    perIAQ = 150 / 7.0;
                    context.strokeStyle = TICK_SHORT_STROKE_STYLE;
                    critical = 15 + ((currentIAQ - 300) / perIAQ);
                    if (cnt > 67 || cnt < critical) context.strokeStyle = TICK_LONG_STROKE_STYLE;
                } else {
                    critical = 23;
                    context.strokeStyle = TICK_LONG_STROKE_STYLE;
                }
                context.beginPath();
                context.moveTo(
                    circle.x + Math.cos(angle) * (radius + tickWidth),
                    circle.y + Math.sin(angle) * (radius + tickWidth)
                );
                context.lineTo(
                    circle.x + Math.cos(angle) * (radius + tickWidth * (isLongLine ? 0 : 0.2)),
                    circle.y + Math.sin(angle) * (radius + tickWidth * (isLongLine ? 0 : 0.2))
                );
                context.stroke();
                context.restore();
            }
        }

        //画三角形
        function drawTriangle() {
            context.save();
            context.beginPath();
            let sideLength = 10;
            let angle = Math.PI * (360 - (critical * 2)) / 180;
            let firstAngle = Math.PI * (60 / 2) / 180;
            let startPoint = {
                x: (circle.x + Math.cos(angle) * (circle.radius - 5)),
                y: (circle.y - Math.sin(angle) * (circle.radius - 5))
            };
            let leftPoint = {
                x: (startPoint.x - sideLength * Math.cos(firstAngle - angle)),
                y: (startPoint.y - sideLength * Math.sin(firstAngle - angle))
            };
            let rightPoint = {
                x: (startPoint.x - sideLength * Math.cos(firstAngle + angle)),
                y: (startPoint.y + sideLength * Math.sin(firstAngle + angle))
            };
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(leftPoint.x, leftPoint.y);
            context.lineTo(rightPoint.x, rightPoint.y);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
            context.restore();
        }
//Init-----------------------------------------------------
        drawTicks();
        drawTriangle();
    }
    // shouldComponentUpdate(){
    //     // console.log("View--> 绘制DashboardView-->shouldComponentUpdate");
    //     let currentIAQ = this.props.currentIAQ;
    //     if (AppData.currentIAQ != undefined && AppData.currentIAQ == currentIAQ){
    //         console.log("View--> 绘制DashboardView-->shouldComponentUpdate, don't need to refresh : currentIAQ : "+currentIAQ+", AppData.currentIAQ : "+AppData.currentIAQ);
    //         return false;
    //     }
    //     // console.log("View--> 绘制DashboardView-->shouldComponentUpdate, need to refresh : currentIAQ : "+currentIAQ+", AppData.currentIAQ : "+AppData.currentIAQ)
    //     return true;
    // }
    componentDidMount() {
        // console.log("View--> 绘制DashboardView-->componentDidMount");
        let currentIAQ = this.props.currentIAQ;
        if (AppData.currentIAQ != undefined && AppData.currentIAQ == currentIAQ){
            console.log("View--> 绘制DashboardView-->componentDidMount, don't need to refresh : currentIAQ : "+currentIAQ+", AppData.currentIAQ : "+AppData.currentIAQ);
            return;
        }
        this.drawDashboardView();
    }

    componentDidUpdate() {
        // console.log("View--> 绘制DashboardView-->componentDidUpdate");
        this.drawDashboardView();
    }

    render() {
        let currentIAQ = this.props.currentIAQ;

        return <canvas ref="dashboard" id="dashboard" width="400" height="400" data-currentIAQ={currentIAQ}
                       style={{width: 100 + "%", height: 100 + "%"}}></canvas>
    }
}