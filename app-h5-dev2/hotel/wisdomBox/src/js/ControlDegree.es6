'use strict';
/**
 *灯开关控制
 *
 */

import {Actions} from './Actions.es6';

let AppData = {};

export const ControlDegree = React.createClass({
    getInitialState: function(){
        return {};
    },



componentWillReceiveProps(next){
    console.log("next",next);
    let oldTemperature = this.props.temperature?this.props.temperature:'';
    let newTemperature = next.temperature?next.temperature:"";

    let oldhumidity = this.props.humidity?this.props.humidity:'';
    let newhumidity = next.humidity?next.humidity:"";

    AppData.temperature = newTemperature;
    AppData.newhumidity = newhumidity;

    // console.log("123",newTemperature,"+++",oldTemperature);
    if(newTemperature > oldTemperature){
        AppData.change = 1;
    }else if(newTemperature < oldTemperature){
        AppData.change = 2;
    }else{
        AppData.change = 3;
    }

    if(newhumidity > oldhumidity){
        AppData.change2 = 1;
    }else if(newhumidity < oldhumidity){
        AppData.change2 = 2;
    }else {
        AppData.change2 =3;
    }

},


    render :function(){
        // console.log(' 每隔8秒获取设备运行数据+++');
        return (
            <div>
                <section className="ControlDegree-sec">
                  <div className="temperature">
                    <img  className="temImg" src="./../static/img/temperature.png" />
                    <span className="temtrue">温度</span>
                     <span><b>{AppData.temperature}°c</b></span>
                     <img  className="arrowImg" style= {{visibility:AppData.change==3?'hidden':'visible'}} src={ AppData.change==1?"./../static/img/1.png":(AppData.change==2?"./../static/img/2.png":"")    }    />
                  </div>
                  <div className="dampness">
                    <img  className="temImg" src="./../static/img/dampness.png" />
                    <span className="temtrue">湿度</span>
                    <span><b>{AppData.newhumidity}%</b></span>
                    <img  className="arrowImg"  style={{visibility:AppData.change2==3?'hidden':'visible'}} src={ AppData.change2==1?"./../static/img/1.png":(AppData.change2==2?"./../static/img/2.png":"")    }  />
                  </div>
                </section>
            </div>
        );
    }
  
});