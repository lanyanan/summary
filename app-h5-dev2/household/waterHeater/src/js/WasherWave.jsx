/**
 * Created by yuanyunlong on 2017/1/3.
 */

import React , {Component} from 'react';

const wave_width = 140;
const wave_angle = 10;
const wave_height = 10; // 浪的峰值
export class WasherWave extends Component {
    constructor(props){
        super(props);
        this.status = {
            flag: 0,
            step: 0,
            lines: ['rgba(255,255,255,0.2)',
                    'rgba(255,255,255,0.2)',
                    ]
        };
        console.log("child constructor");
    }

    defaultProps(){

    }



    componentDidMount() {

        let drawing = document.querySelector('#washerCanvas');

        let context = drawing.getContext('2d');

        this.setState({
            drawing: drawing,
            context: context,
        });

        let _this = this;

        // setTimeout(function () {
        //     _this.draw();
        // }, 1000);

        setInterval(function () {
            _this.init();
        },1000/60);

    }

    init(){
        this.draw();

    }
    draw(){

        let ctx = this.state.context;
        let lines = this.status.lines;
        let step = this.status.step;

        ctx.clearRect(0,0,wave_width+1,wave_width+1);
        step++;

        this.status.step = step;

        let circleRadius = wave_width/2;
        let circleDistance = wave_width;

        for (let j = lines.length - 1; j >= 0; j--){

            //转化为弧度
            var stepAngle = (step+j*90)*Math.PI/180;
            var  deltaHeight = Math.sin(stepAngle)*wave_angle;

            var deltaHeightRight = Math.cos(stepAngle)*wave_angle;

            var y = circleRadius + deltaHeight;

            //计算在左半圆上随着y值上下移动，对应的x值
            // 90*90
            var expression = circleRadius*circleRadius - Math.pow((circleRadius-y),2);
            var x = circleRadius - Math.sqrt(expression) ;


            var rightY = circleRadius + deltaHeightRight;
            var expressionRight = circleRadius*circleRadius - Math.pow((circleRadius-rightY),2);
            //取右侧的X坐标（同一个y值会有两个x坐标）
            var rightX = circleDistance - (circleRadius - Math.sqrt(expressionRight));
            // alert("rightX:"+rightX+" rightY:"+rightY+" x:"+x+" y:"+y);

            ctx.lineWidth = 0.1;
            ctx.strokeStyle = lines[j];
            ctx.fillStyle = lines[j];
            ctx.beginPath();
            ctx.moveTo(x,y);

            ctx.bezierCurveTo(circleRadius, y-wave_height, circleRadius, rightY-wave_height, rightX,rightY);
            //计算圆起始点（与X轴平行的直径的右侧端点）与圆左侧给定Y坐标的点


            var distance = Math.sqrt(Math.pow((circleDistance-x),2)+Math.pow((circleRadius-y),2));
            //sina=d/2r   a为夹角的一半  2a为两点的圆心角   Math.asin最终结果为弧度 如asin(1)=1/2*PI
            var angle = Math.asin(distance/circleDistance)*2;


            var distanceRight = Math.sqrt(Math.pow((circleDistance-rightX),2)+Math.pow((circleRadius-rightY),2));
            var angleRight = Math.asin(distanceRight/circleDistance)*2;
            //如果在左侧上半圆则用2PI-弧度
            if(y<circleRadius){
                angle = 2*Math.PI - angle;
            }

            if(rightY < circleRadius){
                angleRight = -angleRight;
            }

            ctx.arc(circleRadius,circleRadius,circleRadius,angleRight,angle,false);

            ctx.stroke();
            ctx.fill();
        }


    }



    render(){

        return  (<div className="washerAnimation">
                    <canvas id="washerCanvas" width={wave_width} height={wave_width}>

                    </canvas>
                     <div className="washerClothes">
                        <img src="../static/image/washer/clothes_logo_2.png" width='85' height='85'/>
                    </div>
        </div>);
    }
};

