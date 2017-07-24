import {Base64Img} from './RingImgBase64.es6';

export class ColorRingView extends React.Component{
    constructor(props){
        super(props);
        //颜色选择框的宽度
        this.width = document.body.clientWidth * 0.6;
        this.colorStr = "0xffffff";
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

    disMiss(e){
        e.preventDefault();
        e.stopPropagation();
        if(this.props.isShow == false){
            return;
        }
        if(typeof this.props.disMissRingView === 'function'){
            this.props.disMissRingView();
        }
    }

    moveHandle(e){
        e.preventDefault();
        e.stopPropagation();
        let colorStr = this.caculateColor(e);
        this.colorStr = colorStr;
        this.props.selectColor(colorStr);
    }
    caculateColor(e){
        let c = ReactDOM.findDOMNode(this.refs.canvas);
        let cxt=c.getContext('2d');
        let offset = this.getOffset(c.parentNode);
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
        while (dom.className!='colorpicker' && dom.tagName!='BODY' && dom.tagName!='HTML') {
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
        this.props.submitColor(this.colorStr);
    }
    stopBodyScroll(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        let classShow = this.props.isShow ? "colorRingView colorRingView_backShow" : "colorRingView colorRingView_backHidden";
        let ringClassName = this.props.isShow?"ringView ringViewShow":"ringView ringViewHidden"

        let width = document.body.clientWidth * 0.6;
        return(
        <section className={classShow} onTouchStart={this.disMiss.bind(this)} >
            <div className={ringClassName} onTouchStart={this.stopBodyScroll.bind(this)} onTouchMove={this.stopBodyScroll.bind(this)}>
                <a className="colorBar" style={{backgroundColor:this.props.colorBar}}></a>
                <div style={{width:this.width,height:this.width}} onTouchMove={this.moveHandle.bind(this)} onTouchStart={this.moveHandle.bind(this)}
                onTouchEnd={this.submitColorHandle.bind(this)}>
                    <canvas ref="canvas" style={{width:this.width,height:this.width}} />
                </div>
                <a className="closeBtn" onTouchEnd={this.disMiss.bind(this)}></a>
            </div>
        </section>);
    }
};
