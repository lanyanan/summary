
export class DatePickView1 extends React.Component{
    constructor(props){
        super(props);
        //初始化数据源
        let hourArr = Array(24);
        let minArr = Array(60);
        for (let i = 0; i<24;i++){
            hourArr[i] = i.toString();
            if(i < 10){
                hourArr[i] = "0"+hourArr[i];
            }
        }
        for (let i = 0; i<60;i++){
            minArr[i] = i.toString();
            if(i < 10){
                minArr[i] = "0"+minArr[i];
            }
        }
        this.hourArr = hourArr;
        this.minArr = minArr;

        this.selectTime = {hour:props.hour||"9",min:props.min||"30"};
    }

    componentWillReceiveProps(props){

    }
    selectHour(index){
        this.selectTime.hour = this.hourArr[index];
        if(typeof this.props.dateChange === "function"){
            this.props.dateChange(this.selectTime.hour,this.selectTime.min);
        }
    }
    selectMin(index){
        this.selectTime.min = this.minArr[index];
        if(typeof this.props.dateChange === "function"){
            this.props.dateChange(this.selectTime.hour,this.selectTime.min);
        }
    }
    render(){
        return(
            <div className="datePickView1" style={{position:'relative',width:'100%',height:'176px',paddingTop:'64px',overflow:'hidden'}}>
                <PickView style={{height:'100%',width:'50%',float:'left'}} data={this.hourArr} index={parseInt(this.props.hour)} unit={"时"} selectIndex={this.selectHour.bind(this)}/>
                <PickView style={{height:'100%',width:'50%',float:'right'}} data={this.minArr} index={parseInt(this.props.min)} unit={"分"} selectIndex={this.selectMin.bind(this)}/>
            </div>
        );
    }
}

//单个的pickView
export class PickView extends React.Component{

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
        this.unit = props.unit || " ";
        this.dy = 0;
        this.originY = 0;
    }

    componentWillReceiveProps(props){
        this.data = props.data || ["row0","row1","row2","row4"];
        this.containerStyle = props.style || {};
        this.setState({index:props.index||Number(0)});
    }

    componentDidMount(){
        let height = $.lengthSub("table","height","line","height");
        height = parseInt(height)/2 + "px";
        $(".maskUpView").css("height",height);

        $(".maskDownView").css("top",$.lengthAdd("maskUpView","height","line","height"));
        $(".maskDownView").css("height",height);

        let trailOfBound = $(".table").css("width");
        trailOfBound = (parseInt(trailOfBound)/2 - 30)+"px";
        $(".unitClassName").css("right",trailOfBound);
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
        //200px偏移一个index
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

        if((typeof this.props.selectIndex) === "function"){
            this.props.selectIndex(index);
        }
    }

    render(){
        return (
        <section className="singlePick" style={this.containerStyle}>
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
                    <div className="unitClassName">{this.unit}</div>
                </div>
                <div className="maskUpView"></div>
                <div className="maskDownView"></div>

            </div>
        </section>);
    }
}


const styles = {

line:{
    width:  '100%',
    height: '48px',
},
table:{}
};
