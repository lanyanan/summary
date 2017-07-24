'use strict';
/**
 *灯开关控制
 *
 */

import {Actions} from './Actions.es6';


export const DeviceData = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){
        return (
            <div>
                <section className="DeviceData-sec">
                    <div className="DeviceDataTitle">
                      <span>设备指数</span>
                    </div>
                    <div className="DeviceInfo">
                        <div className="DeviceInfo-t">
                          <div className="air-condition"><span>空调</span><span>26<b>°c</b></span></div>
                          <div className="sound"><span>音响</span><span>助眠音乐</span></div>
                        </div>

                        <div className="DeviceInfo-b">
                          <div className="sleep"><span>助眠灯</span><span>弱红光</span></div>
                          <div className="curtain"><span>窗帘</span><span>关闭</span></div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
  
});