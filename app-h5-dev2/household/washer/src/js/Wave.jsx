/**
 * Created by yuanyunlong on 2017/1/3.
 */

import React , {Component} from 'react';


const  yy_wave_num = 2;
var    yy_wave_width = 360;
const  height=60;

export class Wave extends Component {

  constructor(props){
      super(props);
      this.state = {

          yy_start_point:[-180, -180, -190],
          yy_seeds: [1.0, 0.6, 0.5],
          yy_wave_phase:[35, 35, 15],
          yy_wave_color:['rgba(42,204,250,0.2)',
              'rgba(42,204,250,0.4)',
              'rgba(42,204,250,1)',
          ],
          yy_wave_centers:[35, 28, 10],
          yy_wave_directions:[true, true, true],  // true up , false down
          yy_wave_dangerous_point:[0, 0, -10],

      };
  }

  componentDidMount() {
        let waveID = this.props.waveID || 'wave';
        let drawing = document.querySelector('#' + waveID);
        drawing.width = window.screen.width;
        yy_wave_width = window.screen.width;
        let context = drawing.getContext('2d');

        this.setState({
            drawing: drawing,
            context: context
        });

      let _this = this;

      setInterval(function () {

          _this.yyDrawWave();

      },  1000/60);
  }

  yyDrawWave(){

      let start_point = this.state.yy_start_point;
      let seeds = this.state.yy_seeds;
      let phases = this.state.yy_wave_phase;
      let colors = this.state.yy_wave_color;
      let directions = this.state.yy_wave_directions;
      let dangerous_point = this.state.yy_wave_dangerous_point;
      let centers = this.state.yy_wave_centers;
      let drawing = this.state.drawing;
      let context = this.state.context;
      context.clearRect(0,0,drawing.width,drawing.height);

      for(let index = 0; index < 3; index++){
          if(start_point[index] >= dangerous_point[index]){
              start_point[index] = -yy_wave_width;
          }
          start_point[index] += seeds[index];
          this.yyDrawBezierCurveLine(start_point[index], centers[index], phases[index],colors[index], directions[index]);
      }

  }

  yyDrawBezierCurveLine(spx, centerY ,hn, color, direction){

        let drawing = this.state.drawing;
        let context = this.state.context;
        let width = yy_wave_width/yy_wave_num;
        context.strokeStyle = color;
        context.fillStyle = color;
        context.save();
        context.beginPath();
        context.moveTo(spx,centerY);

        let controlP1 = 0;
        let endP1 = 0;
        for (let i = 0 ; i < yy_wave_num ; i++){
            controlP1 = spx + width + yy_wave_width*i;
            endP1 = spx + yy_wave_width*(i+1);
            let centerY1 = centerY-hn;
            let centerY2 = centerY+hn;
            context.bezierCurveTo(controlP1, centerY1, controlP1, centerY2, endP1, centerY);
        }
        if (direction){
            context.lineTo(endP1, 0);
            context.lineTo(0,0);
        }else{
            context.lineTo(endP1, height);
            context.lineTo(0,height);
        }

        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    }




  render(){
      let width = yy_wave_width;
      let waveID = this.props.waveID || 'wave';
      return (<div className="wave_animation" >
            <canvas id={waveID} width={width} height='60'>

            </canvas>
        </div>);
    }

};