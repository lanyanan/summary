/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';
import {Link,IndexLink} from 'react-router';

let MeasurementReport = React.createClass({
    constructor(props) {
        //super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

    },
    handleSwitch() {
        console.log(JSON.stringify(this.state))
    },
    getAttr(){
        $('.measurementReport-ul').on('touchend', 'li', function () {
            $(this).addClass('measurementReport-active').siblings().removeClass('measurementReport-active');
        })
    },
    componentDidMount() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        }, false);


    },
    render() {
        let data =this.state;
        let newProp = React.cloneElement(this.props.children,{data});
        return (
            <div>
                <header className='get-no-data-header'>
                    <div></div>
                    <div className='get-no-data-header-flex'>
                        <span className='get-no-data-w'>体重</span>
                        <span className='get-no-data-w-data'>{this.state.weightData}<span
                            className='get-no-data-w-data-un'>kg</span></span>
                    </div>
                </header>
                <div className='measurementReport-main'>
                    <ul className='measurementReport-ul'>
                        <li onTouchEnd={this.getAttr} title='bmi' className='measurementReport-active'><Link to='/'>BMI</Link></li>
                        <li onTouchEnd={this.getAttr} title='fatRate'><Link to='/'>脂肪率</Link></li>
                        <li onTouchEnd={this.getAttr} title='waterPrc'><Link to='/'>水分比例</Link></li>
                        <li onTouchEnd={this.getAttr} title='musclePrc'><Link to='/'>肌肉比例</Link></li>
                        <li onTouchEnd={this.getAttr} title='dateMetal'><Link to='/'>基础代谢</Link></li>
                    </ul>
                    <div id='content'>
                        {newProp}
                    </div>
                </div>
            </div>
        )
    }
});

export default MeasurementReport;