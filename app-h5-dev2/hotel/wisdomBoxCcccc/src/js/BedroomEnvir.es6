'use strict';
/**
 *灯开关控制
 *
 */

import {Actions} from './Actions.es6';
import {HistoryData} from './HistoryData.es6';
import {EchartsData} from './EchartsData.es6';






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
                      <a href="History.html"  id="test"><span>&gt;</span></a>
                
                    </div>
                        <EchartsData />
                </section>
            </div>
        );
    }


  
});








