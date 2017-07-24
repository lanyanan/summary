
export class Slider extends React.Component{
    constructor(props){
        super(props);
        this.min = this.props.min || "0";
        this.max = this.props.max || "100";
        //默认显示xx%多少的文案
        this.showText = this.props.showText || true;

        this.textOriginLeftPos = 0;
        this.potOriginLeftPos = 0;
        this.sliderBarWidth = 0;

        this.sliderOrginX = 0;
    }
    valueChange(e){
        e.preventDefault();
        e.stopPropagation();
        var value = parseInt(e.currentTarget.value);
        console.log("input value: " + value);
        if(typeof this.props.changeValue === "function"){
            this.props.changeValue(value);
        }
    }
    touchTapHandle(e){
        let x = e.targetTouches[0].pageX - this.sliderOrginX;
        if(x > 0){
            let value = x/this.sliderBarWidth*100;
            value = value>100?100:value;
            console.log("touch value: " + value);
            if(typeof this.props.changeValue === "function"){
                this.props.changeValue(value);
            }
        }
    }
    ignore(e){
        e.preventDefault();
        e.stopPropagation();
    }
    componentDidMount(){

        let valueBarDom = this.refs.valueBar;
        let sliderPotDom = this.refs.sliderPot;

        //修正滑动按钮的位置
        // sliderPotDom.style.left = sliderPotDom.offsetLeft - sliderPotDom.offsetWidth/2 + "px";
        // this.potOriginLeftPos = sliderPotDom.offsetLeft - sliderPotDom.offsetWidth/2;
        // sliderPotDom.style.left = sliderPotDom.offsetLeft - sliderPotDom.offsetWidth/2 + "px";
        this.potOriginLeftPos = sliderPotDom.offsetLeft;
        if(this.props.showText){
            //修正文字的位置
            let textDom = this.refs.text;
            textDom.style.marginLeft = sliderPotDom.offsetWidth/2. -  textDom.offsetWidth/2 + "px";
            this.textOriginLeftPos = sliderPotDom.offsetWidth/2.-textDom.offsetWidth/2.;
        }
        this.sliderBarWidth = this.refs.sliderBar.offsetWidth - sliderPotDom.offsetWidth;
        let value = parseInt(this.props.value);
        this.pos(value);

        this.sliderOrginX = this.refs.sliderBar.offsetLeft+sliderPotDom.offsetWidth/2;
    }
    componentDidUpdate(){
        // console.log("x"+this.props.value);
        this.pos(this.props.value);
    }
    /**
     * 根据只算出左边进度条和原点的位置
     */
    pos(value){
        let valueBarDom = this.refs.valueBar;
        let sliderPotDom = this.refs.sliderPot;

        valueBarDom.style.width = value*this.sliderBarWidth/parseInt(this.max) + "px";

        sliderPotDom.style.left = this.potOriginLeftPos + parseInt(valueBarDom.style.width) + "px";

        if(this.props.showText){
            let textDom = this.refs.text;
            textDom.style.marginLeft = this.textOriginLeftPos + parseInt(valueBarDom.style.width) + "px";
        }

    }
    render(){

        let textDom;
        if(this.showText){
            textDom = <div className='sliderContainer_textContainer'><span ref="text">{this.props.value}%</span></div>;
        }else{
            textDom = "";
        }


        return(

            <div className="sliderContainer">
                {/* <div className="sliderContainer_text"></div> */}
                {textDom}
                <div className="sliderContainer_container">
                    <img className="smallLight" src="../static/img/pic-09@2x.png" alt=""/>
                    <div className="fakeBar"></div>
                    <img className="bigLight" src="../static/img/pic-10@2x.png" alt=""/>
                    <div className="touchTap" onTouchStart={this.touchTapHandle.bind(this)}>
                    <input type="range" min={this.min} max={this.max} onChange={this.valueChange.bind(this)}  className="sliderBar" ref="sliderBar"/>
                </div>

                    <div className="valueBar" ref="valueBar"></div>
                    <span className="sliderPot" ref="sliderPot"></span>
                </div>
            </div>
        );
    }
}
