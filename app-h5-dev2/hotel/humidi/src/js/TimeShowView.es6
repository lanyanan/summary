export class TimeShowView extends React.Component{

    render(){
        var dom = <span style={unSetStyle} >未设置</span>;

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
            <section className="timeShowView">
                <p className="tip1" style={{fontSize:'16px',color:'#fff'}}>定时开启</p>
                <div className="containerTime">
                    {dom}
                </div>
            </section>
        );
    }
}

var unSetStyle = {
    height: '44px',
    color:'#64627f',
    fontSize:'16px',
    lineHeight:'44px',
    marginRight:'16px',
    float:'right',
    marginLeft:'auto'
},

colorStyle = {
    width:'24px',
    height:'24px',
    display:'inline-block'
}