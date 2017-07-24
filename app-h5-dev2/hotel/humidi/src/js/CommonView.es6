//公共的view

//backgroundView
export class MaskView extends React.Component{
    constructor(props){
        super(props);
    }
    stopDeliveryEvent(e){
        e.preventDefault();
        e.stopPropagation();
    }

    touchEndHandle(e){
        this.stopDeliveryEvent(e);
        if((typeof this.props.touchMaskView) === "function"){
            this.props.touchMaskView();
        }

    }
    render(){

        return(
            <div className="maskView" key="maskViewkey" onTouchStart={(e)=>{this.stopDeliveryEvent(e)}}
                onTouchEnd={this.touchEndHandle.bind(this)}
                onTouchMove={(e)=>{this.stopDeliveryEvent(e)}}>
            </div>
        );
    }
}

//请给props.touchBtn1和props.touchBtn2赋值，否则报错
export class ComfirmBar extends React.Component{
    constructor(props){
        super(props);
        this.containerStyle = props.containerStyle || {};
    }
    render(){
        return(
                <div className="comfirmBar" style={this.containerStyle}>
                    <span className="item" onTouchEnd={this.props.touchBtn1}>取消</span>
                    <span className="item" onTouchEnd={this.props.touchBtn2}>确定</span>
                </div>

        )
    }
}
