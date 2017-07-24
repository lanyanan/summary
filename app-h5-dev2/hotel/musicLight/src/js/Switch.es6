/*
 	表单控件  开关
 	参数：
 	changeState： function类型  点击开关的回调函数；
*/

//定义样式表

let styleAll = {
    timingAwakenRight:{
        width:"4.25rem",
        height:"2.5rem",
    },
    trunOffBgColor:{
        width:" 4.25rem",
        height:"2.5rem",
        border:"1px solid #e2e2e2",
        borderRadius:" 2.5rem ",
        position:" relative",
        background:" #F3F3F3",
    },
    timingAwakenOff:{
        position:" absolute",
        left:" -1px",
        top:"0px",
        display:" block",
        width:" 2.4rem",
        height:"2.4rem",
        border:"1px solid #e2e2e2",
        borderRadius:" 2.5rem",
        background:" #fff",
    },
    trunOnBgColor:{
        width:" 4.25rem",
        height:"2.5rem",
        border:"1px solid #e2e2e2",
        borderRadius:" 2.5rem ",
        position:" relative",
        background:" #9C7BDF",
    },
    timingAwakenOn:{
        position:" absolute",
        right:" -1px",
        top:"0px",
        display:" block",
        width:" 2.4rem",
        height:"2.4rem",
        border:"1px solid #e2e2e2",
        borderRadius:" 2.5rem",
        background:" #fff",
    },
}

export class Switch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    changeState() {
        if(typeof this.props.changeState=== 'function'){
            this.props.changeState()
        }else{
            console.log('error:the changeState callback is not a function');
        }
    }
    render() {
        let openPClass = this.props.on == true ? styleAll.trunOnBgColor:styleAll.trunOffBgColor;
        let openSClass = this.props.on == true ? styleAll.timingAwakenOn:styleAll.timingAwakenOff;
        return  <div style={styleAll.timingAwakenRight}>
                    <p style={openPClass} onTouchEnd={this.changeState.bind(this)}>
                        <span style={openSClass}></span>
                    </p>
                </div>
    }
}
