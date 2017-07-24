/**
 * @param {[String]} [result] [测试结果]
 * @param {[Integer]} [mode] [选择模式索引]
 * @param {[Integer]} [gear] [选择档位索引]
 * @param {[Integer]} [type] [当前类型]
 * @param {[Integer]} [offline] [设备离线状态 1表示在线，2表示离线]
 * @param {[Integer]} [battery] [电量类型（1-电量5%及以下，2-电量10%及以下，3-电量20%及以下，4-电量大于20%小于30%，5-电量大于30%小于40%，6-电量40%小于50%，7-电量大于50%小于60%，8-电量大于60%小于70%，9-电量70%小于80%，10-电量大于80%小于90%，11-电量大于90%小于100%，12-电量100%，16-电池电压过高）]
 * @return {[html]}
 */
var DeviceConfig = React.createClass({
    // 基本数据
    baseData: {
        modes : ["C提拉紧致模式", "M粉刺导出模式", "N营养导入模式", "L轻松按摩模式"],
        gears : ["低", "高"]
    },
    componentDidMount: function(){
    },
    handlerTouchMove : function(e){
        if (e.target.type!=="range") {
            e.preventDefault(); // 修复touchmove无效的BUG
        }
    },
    handleClick : function(e){
        e.preventDefault();
    },
    handlerMode : function(e) {
        var value = this.props.mode;
        value = (value+1) % this.baseData.modes.length;
        this.setState({mode:(value+1)});
        AppActions.select({mode:(value+1)});
    },
    handlerGear : function(e) {
        var value = this.props.gear;
        value = (value+1) % this.baseData.gears.length;
        this.setState({gear:(value+1)});
        AppActions.select({gear:(value+1)});
    },
    render: function() {
        var type = this.props.type; //取得类型
        var mode = this.props.mode; // 取得模式
        var gear = this.props.gear; //取得档位
        var battery = this.props.battery; //取得电量
        var offline = this.props.offline; //取得设备状态
        return (
            <section>
                <div className="config">
                    {
                        type <= 1 ? (
                                <div className="prompt">
                                    <label>为使提拉嫩肤仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...</label>
                                    <a href="cbeauty://cbeauty_skintest">去测试肌肤&gt;&gt;</a>
                                </div>
                            ) : (
                                <div className="prompt"><label>{this.props.result}</label></div>
                            )
                    }
                </div>
                <div className="select-wrap flex" onTouchMove={this.handlerTouchMove}>
                    <div onTouchEnd={this.props.busiSwitch == 0 ? this.handlerMode : ""} onTouchStart={this.props.busiSwitch == 1 ? this.handleClick : ""} className="tap config flex-cell">
                        <div className="tap describe flex-column">{this.baseData.modes[mode]}</div>
                        <div className="tap prompt flex-column">模式选择</div>
                    </div>
                    <div onTouchEnd={this.props.busiSwitch == 0 ? this.handlerGear : ""} onTouchStart={this.props.busiSwitch == 1 ? this.handleClick : ""} className="tap config flex-cell">
                        <div className="tap describe flex-column">{this.baseData.gears[gear]}</div>
                        <div className="tap prompt flex-column">档位选择</div>
                    </div>
                </div>
                {battery <= 4 && offline == 1 ? (<div className="config battery"><label>电量不足，请充电！</label></div>) : ""}
            </section>
        );
    }
});

module.exports = DeviceConfig;