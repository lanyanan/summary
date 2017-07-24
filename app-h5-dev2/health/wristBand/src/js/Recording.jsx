const {Link} = ReactRouter;
export const Recording = React.createClass({
    handleRouter(){
        window.location.href= '#/PageSleep';
    },
    render(){
        let data = this.props.data,
            deepSleep = data.deepSleep,
            shallowSleep = data.shallowSleep,
            empty = <h5>暂无数据</h5>;
        return (
            <section className="recording">
                <Link to="PageHeart" className="flex">
                    <div className="left"><img src="../static/img/layout/i-heartrate.png" /></div>
                    <div className="mid"><h2>心率</h2><h5>测量心率</h5></div>
                    <div to="PageHeart" className="right arrow"></div>
                </Link>
                <Link to="PageSleep" className="flex" onTouchStart={this.handleRouter}>
                    <div className="left"><img src="../static/img/layout/i-sleep.png" /></div>
                    <div className="mid">
                        <h2>睡眠</h2>
                        {
                            deepSleep ?
                            <h5>深睡<span className="light">{parseInt(deepSleep.substring(0,2))}</span>时<span className="light">{parseInt(deepSleep.substring(3,5))}</span>分</h5>
                            :
                            empty
                        }
                    </div>
                    <div className="right">
                        <h2 className="blue">{ data.sleepQuality?data.sleepQuality:'暂无数据' }</h2>
                        {
                            shallowSleep ?
                            <h5>浅睡<span className="light">{parseInt(shallowSleep.substring(0,2))}</span>时<span className="light">{parseInt(shallowSleep.substring(3,5))}</span>分</h5>
                            :
                            empty
                        }
                    </div>
                </Link>
            </section>
        )
    }
});