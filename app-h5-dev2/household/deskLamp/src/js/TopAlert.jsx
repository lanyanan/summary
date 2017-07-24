/**
 * Created by yuanyunlong on 16/11/22.
 */
//
// show            bool
// closeAction     function


import React from 'react';


export class TopAlert extends React.Component {

    constructor(props){
        super(props);

    }

    closeAction1(){
        if(typeof this.props.closeAction === 'function'){
            this.props.closeAction();
        }
    }

    render(){

        //console.log("TopAlert: " + this.props);
        let show = this.props.show || false ;
        let alertContent = this.props.alertContent || "";
        let alertClassName = show ? "TopAlert TopAlert_show" :"TopAlert TopAlert_hidden" ;


        return (<div className={alertClassName}>
            <div className=" alertContent">
                <img src="../static/img/pic_alert.png"/>
                <p>{alertContent}</p>
            </div>
            <div className=" alertCloseBtn" onTouchStart={this.closeAction1.bind(this)} style={{visibility:"hidden"}}>
                <img src="../static/img/pic_close.png"/>
            </div>
        </div>);
    }
}