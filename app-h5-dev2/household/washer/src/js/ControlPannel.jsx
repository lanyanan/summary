/**
 * Created by yuanyunlong on 2016/12/29.
 */


import React, {Component} from 'react';
export class ControlPannel extends  Component
{
    constructor(props){
        super(props);
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps: " + this.props.count);
    }



    componentDidMount() {

        console.log("componentDidMount");
    }

    componentWillUpdate() {
        console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");

        return true;
    }

    render(){
        console.log("render");
        let switchOn = "../static/image/main/pic_modebutton_1_off.png";
        let switchTwo = "../static/image/main/pic_modebutton_2_off.png";
        let switchThree = "../static/image/main/pic_modebutton_3_off.png";
        let switchFour = "../static/image/main/pic_switch_off.png";

        return (<div className="ControlPannel">
            <div className="modeOne"><img src={switchOn} /></div>
            <div className="modeTwo"><img src={switchTwo} /></div>
            <div className="modeThree"><img src={switchThree} /></div>
            <div className="modeFour"><img src={switchFour} /></div>
        </div>);
    }
};