//香薰机的倒计时选择和雾化选择的样式的pickerview
//如果使用这个控件，
export class PickerView1  extends React.Component{
    constructor(props){
        super(props);
         this.data = props.data || ["row0","row1","row2","row4","row5"];
        //从props传入各种颜色设置，如果props不设置，那用默认的
        this.highlightColor = props.highlightColor || '#ffffff';
        this.backgroundColor = props.backgroundColor || '#282639';
        this.lineColor = props.lineColor || '#4b4a60';
        this.defaultColor = props.defaultColor || '#9693b2';
        this.containerStyle = props.style || {};
        this.state = {index:props.index || Number(0)};
        this.dy = 0;
        this.originY = 0;
    }

    componentWillReceiveProps(props){
        this.data = props.data || ["row0","row1","row2","row4"];
        this.containerStyle = props.style || {};
        this.setState({index:props.index||Number(0)});
    }

    componentDidMount(){
        //frame修正
        $(".table").css("height",$.lengthSub("pickerView1","height","header","height"));

        let height = $.lengthSub("table","height","line","height");
        height = parseInt(height)/2 + "px";
        $(".maskUpView").css("height",height);

        $(".maskDownView").css("top",$.lengthAdd("maskUpView","height","line","height"));
        $(".maskDownView").css("height",height);
    }
    touchStartHandle(e){
        e.preventDefault();
        e.stopPropagation();
        let dom = this.refs.table;
        this.originY = window.screen.height - e.targetTouches[0].clientY;
    }
    moveHanle(e){
        e.preventDefault();
        e.stopPropagation();
        // debugger;

        let dom = this.refs.table;
        let y = window.screen.height - e.targetTouches[0].clientY;
        this.dy = y - this.originY;
        //40px偏移一个index
        let dIndex = this.dy / 200;
        let index = this.state.index + dIndex;
        if(index < 0) index = 0;
        if(index > (this.data.length - 1)) index = (this.data.length - 1);
        this.setState({index:index});
    }
    touchEndHandle(e){
        e.preventDefault();
        e.stopPropagation();
        this.originY = 0;
        //修正Index
        let str = ""+(this.state.index+0.5);
        let index = parseInt(str);
        if(index < 0) index = 0;
        if(index > (this.data.length - 1)) index = (this.data.length - 1);
        this.setState({index:index});
    }

    comfirmHanlde(e){
        e.preventDefault();
        e.stopPropagation();
        let value = this.data[this.state.index];
        value = parseInt(value);
        value = isNaN(value)?0:value;
        this.props.closeTimeHandle(value);
    }
    render(){
        let containerStyle = $.extend({},this.containerStyle,styles.pickerView1);
        return (
        <section className="pickerView1" style={containerStyle}>
            <div className="header" style={$.extend({},styles.header,{borderBottom:`solid 1px ${this.defaultColor}`})}>
                <span className="item" style={$.extend({},{color:this.defaultColor},styles.itemBtn)} onTouchEnd={this.props.disMiss}>取消</span>
                <span className="item" style={$.extend({},{color:this.highlightColor},styles.itemBtn)} onTouchEnd={this.comfirmHanlde.bind(this)}>确定</span>
            </div>
            <div className="table" ref="table" style={styles.table} onTouchMove={this.moveHanle.bind(this)} onTouchEnd={this.touchEndHandle.bind(this)}
            onTouchStart={this.touchStartHandle.bind(this)}>
                <div className="line" style={$.extend({},{borderBottom:`solid 1px ${this.defaultColor}`,borderTop:`solid 1px ${this.defaultColor}`},styles.line)}>
                    {this.data.map(function(ele,i){
                        let value = this.state.index - i;
                        if(value >= -3 && value <= 3){
                            let scale = 1- 0.2*Math.abs(value)/3;
                            let translateYArr = [40,30,30,0]; //最后一个元素并不需要用到
                            let yIndex = Math.abs(parseInt(value));
                            let transY = 0;
                            for(let i = 0; i < yIndex; i++){
                                transY += translateYArr[i];
                            }
                            transY += (Math.abs(value) - yIndex)*translateYArr[yIndex];
                            if(value > 0){
                                transY = 0-transY;
                            }
                            transY = transY+'px';

                            let styleObj = {
                                position:  'absolute',
                                left:'0px',
                                top:'12px',
                                textAlign:'center',
                                width:'100%',
                                height: '24px',
                                lineHeight: '24px',
                                transform:`scaleY(${scale}) translateY(${transY})`,
                                WebkitTransform:`scaleY(${scale}) translateY(${transY})`,
                            };
                            return(
                            <span className="dataItem" style={styleObj} key={i}>{ele}</span>);
                        }
                    }.bind(this))}

                </div>
                <div className="maskUpView"></div>
                <div className="maskDownView"></div>

            </div>
        </section>);
    }
}

const styles = {
    pickerView1:{
        position:'relative',
        width:'100%',
        height: '100%',
    },
    header:{
    },
    itemBtn:{
        textAlign:  'center',
        width:  '60px',
        height: '48px',
        lineHeight: '48px',
    },
    table:{
    },
    line:{
        width:  '100%',
        height: '48px',
    }
};
