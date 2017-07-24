/**
 * Created by yuanyunlong on 2017/1/3.
 */

import React , {Component} from 'react';

export class WaveAnimation extends Component {
    constructor(props){
        super(props);
        this.state = {
            K:2,
            F:6,
            speed:0.05,
            noise:10,
            phase:1,
            height: 40,
            MAX:46
        };

        this.configPar = {
            colorS:['rgba(42,204,250,0.4)',
                'rgba(42,204,250,0.2)',
                'rgba(255,255,255,2)',
            ],
        }
    }

    componentDidMount() {
        let drawing = document.querySelector('#wavecanvas');
        drawing.width = window.screen.width;
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
            _this.draw();
        }, 1000/60);

    }

    globalAttenuationFn(x){
        let K = this.state.K;
        return Math.pow(K*4/(K*4+Math.pow(x,4)), K*2);
    }

    drawLine(attenuation){
        let context = this.state.context;
        let drawing = this.state.drawing;
        context.clearRect(0,0,drawing.width,drawing.height);

        context.moveTo(0,0);
        context.beginPath();
        context.strokeStyle = 'rgba(42,204,250,0.4)';
        context.fillStyle = 'rgba(42,204,250,0.4)';
        context.lineWidth =  0;

        let width = 640;
        let height = this.state.height;
        let noise = this.state.noise;
        let K = this.state.K;
        let F = this.state.F;
        let phase = this.state.phase;
        let x, y;
        for (let i = -K; i <= K ; i+= 0.1){
            x = width*((i+K)/(K*2));
            y = height/2 + noise  * (1/attenuation) * Math.sin(F*i-phase);
            context.lineTo(x, y);
        }
        context.lineTo(x, 0);
        context.lineTo(0,0);
        context.closePath();
        context.fill();
        context.stroke();
    }


    draw(){
        let phase = (this.state.phase+this.state.speed)%(Math.PI*64);
        this.setState({
            phase:phase
        });
        this.drawLine(1);
    }

    render(){

        return  (<div className="waveAnimation">
                <canvas id="wavecanvas">

                </canvas>
        </div>);
    }
};
