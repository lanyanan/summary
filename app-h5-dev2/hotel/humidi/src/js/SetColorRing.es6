import {ComfirmBar} from './CommonView.es6';
import {Base64Img} from './RingImgBase64.es6';

export class SetColorRing extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentColor:props.currentColor || "#ff7b7c"};

    }
    touchBtn1(e){
        e.preventDefault();
        e.stopPropagation();
        if(typeof this.props.cancleHandle === "function"){
            this.props.cancleHandle();
        }
    }
    touchBtn2(e){
        e.preventDefault();
        e.stopPropagation();
        if(typeof this.props.comfirmHandle === "function"){
            this.props.comfirmHandle(this.state.currentColor);
        }
    }

    selectColorHandle(color){
    }
    submitColorHandle(color){
        this.setState({currentColor:color});
    }

    render(){
        return(
            <div className="setColorRing" key="setColorRingKey">
                <ComfirmBar touchBtn1={this.touchBtn1.bind(this)}
                touchBtn2={this.touchBtn2.bind(this)}/>
                <div style={{marginLeft:'16px',marginTop:'8px',marginBottom:'8px',color:'#9693b2',fontSize:'16px'}}>最近使用的颜色</div>
                <SetColorSelect currentColor={this.state.currentColor}
                changeColorHandle={(color)=>{this.setState({currentColor:color})}}/>

                <SetColorRingView selectColor={this.selectColorHandle.bind(this)} submitColor={this.submitColorHandle.bind(this)}/>
            </div>
        )
    }

}

class SetColorSelect extends React.Component{
    constructor(){
        super();
        this.colors = ['rgb(255,123,124)', 'rgb(255,255,255)', 'rgb(252,170,107)', 'rgb(252,218,111)', 
        'rgb(160,230,116)', 'rgb(89,189,239)'];
        this.index = 0;
    }
    changeColorHandle(e){
        let index = e.currentTarget.getAttribute('data-val');
        index = parseInt(index);
        if(index == this.index) return;
            if(typeof this.props.changeColorHandle === 'function'){
                this.props.changeColorHandle(this.colors[index]);
            }
    }

    render(){
        let seekIndex = 0;
        for (let i = 0; i < 6; i++){
            if(this.props.currentColor === this.colors[i]){
                seekIndex = i;
                break;
            }
        }
        if(seekIndex == 0){
            this.colors[0] = this.props.currentColor || "#ff7b7c";
        }

        this.index = seekIndex;
        return(
        <div>
        <section className="colorSelectView" style={{borderBottom: '1px solid #9693b2'}}>
            {this.colors.map((value,index)=>{
                    return <div style={{backgroundColor:value}} key={index} onTouchEnd={this.changeColorHandle.bind(this)} data-val={index}>
                            <img src={index==1?"../static/img/pic-11@2x.png":"../static/img/pic-08@2x.png"} alt="" style={{visibility:seekIndex===index?'visible':'hidden',with:index==1?'14px':'28px',height:index==1?'14px':'28px'}}/>
                            </div>;
            })}
        </section>
    </div>);
    }
}



class SetColorRingView extends React.Component{
    constructor(props){
        super(props);
        //颜色选择框的宽度
        this.width = document.body.clientWidth * 0.6;
        this.state = {currentColor:(props.currentColor||"ff7b7c")};

    }
    componentDidMount() {
        let imgData = require('url-loader?limit=53000!../../static/img/colorBar.png');
        let c = ReactDOM.findDOMNode(this.refs.canvas);
        c.width = this.width;
        c.height = this.width;
        let cxt=c.getContext('2d');
        let img=new Image();
        img.onload = ()=>{
            cxt.drawImage(img, 0, 0, this.width, this.width);
        };
        img.src = Base64Img;
        // cxt.fillRect(10,10,150,150);
    }

    moveHandle(e){
        e.preventDefault();
        e.stopPropagation();

        let colorStr = this.caculateColor(e);
        if(colorStr){
            this.setState({currentColor:colorStr});
        }

    }
    caculateColor(e){
        let c = ReactDOM.findDOMNode(this.refs.canvas);
        let cxt=c.getContext('2d');
        //通过这种方式算出的y是错误的
        let offset = this.getOffset(c.parentNode);
        offset.y = window.screen.height - 20 - this.width;
        let x = e.targetTouches[0].pageX - offset.x;
        let y = e.targetTouches[0].pageY - offset.y;
        let  tmpRedius = Math.sqrt(Math.pow(Math.abs(x-this.width/2.),2) + Math.pow(Math.abs(y-this.width/2.),2));
        if(tmpRedius >= this.width/2.){
            return;
        }
        let rgba = cxt.getImageData(x, y, 1, 1).data;
        let colorStr = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
        return colorStr;
    }
    getOffset(dom) {
        let xy = {x:0, y:0};
        while (dom.tagName!='BODY' && dom.tagName!='HTML') {
            xy.x += dom.offsetLeft;
            xy.y += dom.offsetTop;
            dom = dom.parentNode;
        }
        xy.y += document.body.scrollTop;
        return xy;
    }
    submitColorHandle(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.submitColor(this.state.currentColor);
    }
    stopBodyScroll(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        return(
            <div className="setColorRingViewContainer" onTouchStart={this.stopBodyScroll.bind(this)} onTouchMove={this.stopBodyScroll.bind(this)}>
                <a href="#" className="colorBar" style={{backgroundColor:this.state.currentColor}}></a>
                <div style={{width:this.width,height:this.width}} onTouchMove={this.moveHandle.bind(this)} onTouchStart={this.moveHandle.bind(this)}
                onTouchEnd={this.submitColorHandle.bind(this)}>
                    <canvas ref="canvas" style={{width:this.width,height:this.width}} />
                </div>
            </div>
        );
    }
}
