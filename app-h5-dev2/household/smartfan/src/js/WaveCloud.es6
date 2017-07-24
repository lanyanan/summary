'use strict';
/**
 * 波浪云动画
 */
export const WaveCloud = React.createClass({
    getInitialState: function(){
        return {
            seed:20,
            start_point: {x : -360, y : 70},
            control_point_1: {x : -200, y : 30},
            control_point_2: {x : -100, y : 50},
            control_point_3: {x : 100, y : 30},
            control_point_4: {x : 200, y : 50},
            end_point_1: {x : 0, y : 70},
            end_point_2: {x : 360, y : 70},
            start_points_x: [-300, -100, -200],
            control_points_x_1: [-200, 0, -100],
            control_points_x_2: [-100, 100, 0],
            control_points_x_3: [100, 300, 200],
            control_points_x_4: [200, 400, 300],
            height_number:[10,30,50],
            end_points_x_1: [0, 200, 100],
            end_points_x_2: [300, 500, 400],
            seeds: [0.5, -0.6, 0.3],
            opacitys: [0.7, 0.5, 0.3],
            dangerous_points: [0, 360, -360],
            cloud_size_w:[26,17,12,17,22],
            cloud_size_h:[17,12,8,12,14],
            cloud_start_x:[20,80,150,260,300],
            cloud_x:[20,80,150,260,300],
            cloud_end_x:[50,130,240,290,320],
            cloud_seeds:[0.3,0.5,0.6,0.3,0.2]
        };
    },
    componentDidMount: function() {
        //初始化所需canvas以及图片 设置定时器
        let drawing = document.querySelector('#wavecloud');
        drawing.width = window.screen.width;//重置canvas宽度为百分百
        let context = drawing.getContext('2d');
        let arr = [];
        for(let i=1;i<6;i++){
            let img = new Image();
            img.src="../static/img/smartFan/cloud"+i+".png";
            arr.push(img);
        }
        this.setState({
            cloud_img: arr,
            drawing : drawing,
            context : context
        });
        let _this=this;
        this.tanimation = setInterval(function(){
            _this.drawWave();
        },1000/60);
    },
    drawWave:function(){
        //画波浪 2段贝塞尔弧线4个控制点 设置曲线参数
        let start_point = this.state.start_point;
        let control_point_1 = this.state.control_point_1;
        let control_point_2 = this.state.control_point_2;
        let control_point_3 = this.state.control_point_3;
        let control_point_4 = this.state.control_point_4;
        let end_point_1 = this.state.end_point_1;
        let end_point_2 = this.state.end_point_2;

        let start_points_x = this.state.start_points_x;
        let control_points_x_1 = this.state.control_points_x_1;
        let control_points_x_2 = this.state.control_points_x_2;
        let control_points_x_3 = this.state.control_points_x_3;
        let control_points_x_4 = this.state.control_points_x_4;
        let end_points_x_1 = this.state.end_points_x_1;
        let end_points_x_2 = this.state.end_points_x_2;
        let seeds = this.state.seeds;
        let opacitys = this.state.opacitys;
        let dangerous_points = this.state.dangerous_points;
        for(let i = 0; i < seeds.length; i++) {
            let seed = seeds[i];
            let start_point_x = start_points_x[i];
            let end_point_x_1 = end_points_x_1[i];
            let end_point_x_2 = end_points_x_2[i];

            if(start_point_x >= (dangerous_points[0] - seed) || start_point_x <= (dangerous_points[2] - seed)) {
                seeds[i] = -seed;
            }

            start_points_x[i] += seed;
            control_points_x_1[i] += seed;
            control_points_x_2[i] += seed;
            control_points_x_3[i] += seed;
            control_points_x_4[i] += seed;
            end_points_x_1[i] += seed;
            end_points_x_2[i] += seed;
        }
        let drawing = this.state.drawing;
        let context = this.state.context;
        context.clearRect(0,0,drawing.width,drawing.height);
        let randomnumber = this.state.height_number;
        for(let j = 0; j < this.state.seeds.length; j++) {
            this.drawBezierCurveLine(start_points_x[j], control_points_x_1[j],
                control_points_x_2[j],control_points_x_3[j], control_points_x_4[j],
                end_points_x_1[j], end_points_x_2[j], opacitys[j],randomnumber[j]);
        }
        this.drawCloud();
    },
    drawCloud:function(){
        //画云 5片云朵 设置云朵移动参数
        let drawing = this.state.drawing;
        let context = this.state.context;
        let cloud_size_w = this.state.cloud_size_w;
        let cloud_size_h = this.state.cloud_size_h;
        let cloud_x = this.state.cloud_x;
        let cloud_start_x = this.state.cloud_start_x;
        let cloud_end_x = this.state.cloud_end_x;
        let seeds = this.state.cloud_seeds;
        for(let j=0;j<cloud_start_x.length;j++){
            let seed = seeds[j];
            if(cloud_x[j] >= (cloud_end_x[j]-seed) || cloud_x[j] <= (cloud_start_x[j]-seed)){
                seeds[j] = -seed;
            }
            cloud_x[j] += seed;
        }
        let img = this.state.cloud_img;
        for(let i=1;i<6;i++){
            context.drawImage(img[i-1],cloud_x[i-1],30-cloud_size_h[i-1],cloud_size_w[i-1],cloud_size_h[i-1]);
        }
    },
    drawBezierCurveLine:function(spx, cpx1, cpx2, cpx3, cpx4, epx1, epx2, opacity,hn){
        //根据传入的参数画贝塞尔曲线
        let drawing = this.state.drawing;
        let context = this.state.context;
        context.strokeStyle = 'rgba(255,255,255,'+opacity+')';
        context.fillStyle = 'rgba(255,255,255,'+opacity+')';
        context.save();
        context.beginPath();
        context.moveTo(spx, 70);
        context.bezierCurveTo(cpx1, 30+hn, cpx2, 50-hn, epx1, 70);
        context.bezierCurveTo(cpx3, 30+hn, cpx4, 50-hn, epx2, 70);
        context.closePath();
        context.restore();
        context.stroke();
        context.fill();
    },
    render : function() {
        return (
            <section className='animation'>
                <canvas id='wavecloud' width='360' height='70'>

                </canvas>
            </section>
        );
    }
});