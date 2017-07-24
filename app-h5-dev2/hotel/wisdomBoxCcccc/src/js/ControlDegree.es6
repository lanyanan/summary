'use strict';
/**
 *灯开关控制
 *
 */

import {Actions} from './Actions.es6';


export const ControlDegree = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){

        var getwisdom = this.props.wisdomJson;
        // console.log("gggggggggggggggggggggggggggggggggggggggggg",getwisdom);

        // var  changeData =  JSON.stringify(getwisdom);
        var getD = getwisdom;
        // let changeData2 = JSON.parse(getD);
            // var getddd = getD.data;
        // console.log("changeData:",changeData);
         // console.log("现获取传过来的值先----:",getD);
        // console.log("changeData222222222:",getddd);

        //由于第一次没值，故先判断，否则报错。
        // var chdata= getD.data ?getD.data:'';
        // console.log("修改获取过来的值",chdata);

        // let OutTem = this.state.wisdomSingle.data ?this.state.wisdomSingle.data:'2';
        let getdd = (this.props.wisdomJson?this.props.wisdomJson:'36');
        if(getdd === '36') {
            console.log('未取到值')
        }else{
            console.log('取到值了',getdd.recordTime);
                // var wd = getD.temperature;
                
                // var sd = getD.humidity;
                // console.log("wd+sd",wd,sd);
        }

        var wd = getD?getD.temperature:'';
        var sd = getD?getD.humidity:'' ;
        var boxSwitch = getD?getD.boxSwitch:'';

        console.log("这是controlDegree页面",getdd);                     
        console.log("这是看开关的",boxSwitch);

        // for(var i=0;i<getD.length;i++){
        //     console.log(getD[i]);
        // }

        // console.log(getwisdom.boxSwitch);
        // console.log(getwisdom.humidity);
        // console.log(getwisdom.lightSensation);
        // console.log(getwisdom.noise);
        // console.log(getwisdom.recordTime);
        // console.log(getwisdom.temperature);



        // let bb = this.state.wisdomAlter;
        // let temperature = OutTem.temperature;
       // var wd = getD.temperature;
       // console.log("wd",wd);
       // var sd = getD.humidity;


        // console.log("这里是defree页面:getdd",getdd);
        // console.log("-contorll页面：",bb);
         // console.log('这是controlDegree页面---this.state',this.state);
        // console.log("这里是defree页面:temperature",temperature);

        return (
            <div>
                <section className="ControlDegree-sec">
                  <div className="temperature">
                    <img  className="temImg" src="./../static/img/temperature.png" />
                    <span className="temtrue">温度</span>

                     <span>{wd}<b>°c</b></span>

                    <img  className="arrowImg" src="./../static/img/arrow.png"  />
                  </div>
                  <div className="dampness">
                    <img  className="temImg" src="./../static/img/dampness.png" />
                    <span className="temtrue">湿度</span>
                    <span>{sd}<b>%</b></span>
                    <img  className="arrowImg" src="./../static/img/arrow.png"  />
                  </div>
                </section>
            </div>
        );
    }
  
});