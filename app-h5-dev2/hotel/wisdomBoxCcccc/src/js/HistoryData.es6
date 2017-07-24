'use strict';
/**
 *灯开关控制
 *
 */

import {Actions} from './Actions.es6';


export const BedroomEnvir = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){
        return (
            <div>
                <section className="BedroomEnvir-sec">
                    <div className="BedroomTitle">
                      <span>卧室环境</span>
                      <a href="https://www.baidu.com"><span>&gt;</span></a>
                    </div>
                    <div className="echarts">

                    </div>
                </section>
            </div>
        );
    }
  
});