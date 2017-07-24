export class CloseView extends React.Component{

    tapHandle(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        let dom = <div className="tip">设置定时开启</div>;

        if(this.props.planInfo){
            var {hour, minute, color, brightness, mist} = this.props.planInfo;

            colorStyle.backgroundColor = color;

            dom = (
                <div className="timeContainer1">
                    <div className="row">
                        <span>时间</span>
                        <span>{hour + ":" + minute}</span>
                    </div>
                    <div className="row">
                        <span>颜色</span>
                        <div style={colorStyle}></div>
                    </div>
                    <div className="row">
                        <span>亮度</span>
                        <span>{brightness}%</span>
                    </div>
                    <div className="row">
                        <span>雾化</span>
                        <span>{mist}</span>
                    </div>
                </div>
                );
        }

        return(
            <div className="closeViewBack">{dom}</div>
        );
    }   
}

var colorStyle = {
    width:'24px',
    height:'24px',
    display:'inline-block'
}