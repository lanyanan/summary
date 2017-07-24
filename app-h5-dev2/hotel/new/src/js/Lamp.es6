import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ColorPicker} from './ColorPicker.es6';
import {Toast} from './toast.es6';
import Range from './../../../common/src/lib/range.jsx';

var {Router, Route, hashHistory,Link} = ReactRouter;

window.dataTimer = 0;

export class Lamp extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            lightImg:"../static/img/pic-08xxhdpi.png",
            sceneImg:"../static/img/pic-13xxhdpi.png",
            lightColor:"#919191",
            sceneColor:"#1bb1e4",
            colorPickerShow:false,
            rotate:0,
            lightColorR: 94,
            lightColorG: 245,
            lightColorB: 132,
            a: 1,
            colorListShow:true,
            settingShow:false,
            abc:-45,
            lightness:0,
            alarmClock1Hour:'--',
            alarmClock1Minute:'--',
            titleShow:false,
            colorArray:['#ff7c7c', '#ffd376', '#a0e674', '#5be6bd', '#88a1fe'],
            colorChange:false,
        }
        this.listenStore(Store)
    }
    componentDidMount() {
        let btn = document.getElementById("btn");
        let xingyue = document.getElementById("xingyue");
        let top = document.getElementById("lampTop");
        let lampSpace = document.getElementById("lampSpace");
        let lampTop = top.clientHeight+lampSpace.clientHeight;
        let xingyueWidth = xingyue.clientHeight;
        let preLeft = xingyue.offsetLeft;
        let preTop = xingyue.offsetTop;
        //圆心坐标
        window.R = parseInt(xingyueWidth/2);
        window.x = preLeft + parseInt(xingyueWidth/2);
        window.y = preTop + lampTop + parseInt(xingyueWidth/2);
        Actions.login();
        Actions.getData();
        this.reGetData();
    }
    reGetData() {
        clearInterval(window.dataTimer);
        window.dataTimer = setInterval(Actions.getData, 6000);
    }
    startMove(e) {
        e.preventDefault();
        e.stopPropagation();
        this.clientX = e.touches[0].clientX;
        this.clientY = e.touches[0].clientY;
        console.log(this.clientX)
    }
    moveIng(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(2)
        let distance = Math.pow(e.touches[0].clientX - window.x, 2) + Math.pow(e.touches[0].clientY - window.y, 2);
        let radius = Math.pow(window.R, 2);
        // console.log(distance,radius);
        if ((distance - radius) < 6400 && (distance - radius) > -6400) {
            let sin = (e.touches[0].clientY - window.y) / Math.sqrt(distance);
            let rotuer = Math.asin(sin) * 180 / Math.PI;
            if (e.touches[0].clientX > window.x && e.touches[0].clientY < window.y) rotuer = 180 - Math.abs(rotuer);
            if (e.touches[0].clientX > window.x && e.touches[0].clientY >= window.y) rotuer = 180 + Math.abs(rotuer);
            if (e.touches[0].clientX <= window.x && e.touches[0].clientY < window.y) rotuer = Math.abs(rotuer);
            if (e.touches[0].clientX <= window.x && e.touches[0].clientY >= window.y) rotuer = -Math.abs(rotuer);
            // console.log(e.touches[0].clientX,e.touches[0].clientY,rotuer)
            this.setState({
                abc: rotuer,
                lightness:parseInt((rotuer+45)/2.27) < 0 ? 0 : (parseInt((rotuer+45)/2.27) > 120 ? 120 : parseInt((rotuer+45)/2.27))
            });
        }
    }
    endMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if(this.state.lightSwitch==1){
            Actions.changeLight(this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,this.state.lightness,this.state.colorIndex,this.state.lightingPatternNumber)
        }    
    }
    startChange(e) {
        console.log(3)
        e.preventDefault();
        e.stopPropagation();
        this.initX = e.touches[0].clientX;
        this.initY = e.touches[0].clientY;
    }
    endChange(e) {
        e.preventDefault();
        e.stopPropagation();
        let distance = Math.pow(this.initX - window.x, 2) + Math.pow(this.initY - window.y, 2);
        let radius = Math.pow(window.R, 2);
        // console.log(distance,radius);
        if ((distance - radius) < 2500 && (distance - radius) > -2500) {
            let sin = (this.initY - window.y) / Math.sqrt(distance);
            let rotuer = Math.asin(sin) * 180 / Math.PI;
            if (this.initX > window.x && this.initY < window.y) rotuer = 180 - Math.abs(rotuer);
            if (this.initX > window.x && this.initY >= window.y) rotuer = 180 + Math.abs(rotuer);
            if (this.initX <= window.x && this.initY < window.y) rotuer = Math.abs(rotuer);
            if (this.initX <= window.x && this.initY >= window.y) rotuer = -Math.abs(rotuer);
            this.setState({
                abc: rotuer,
                lightness:parseInt((rotuer+45)/2.27) < 0 ? 0 : (parseInt((rotuer+45)/2.27) > 120 ? 120 : parseInt((rotuer+45)/2.27))
            });
            let lightness = parseInt((rotuer + 45) / 2.27) < 0 ? 0 : (parseInt((rotuer + 45) / 2.27) > 120 ? 120:(parseInt((rotuer + 45) / 2.27)))
            if(this.state.lightSwitch==1){
                Actions.changeLight(this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,lightness,this.state.colorIndex,this.state.lightingPatternNumber)
            }
        }
    }
    addBackground(e) {
        let colorArr= $(".lamp-color").find("i")
        let Dom = e.target;
        let index = colorArr.indexOf(Dom);
        let DomPre = Dom.parentNode;
        let computedStyle = document.defaultView.getComputedStyle(DomPre, null);
        let rgbaString = computedStyle.backgroundColor;
        let rgbArr = (rgbaString.substring(4,rgbaString.length-1)).split(",");
        Actions.changeColor(1,rgbArr[0],rgbArr[1],rgbArr[2],index,this.state.lightness,this.state.lightingPatternNumber);
        console.log(index)
    }
    changeLightImg() {
        Actions.changeColor(0,this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,this.state.colorIndex,this.state.lightness,0) 
    }
    changeSceneImg() {
        Actions.changeColor(1,this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,this.state.colorIndex,this.state.lightness,1)  
    }
    close() {
        if(this.state.lightSwitch==0){ 
            Actions.changeSwitch(1,this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,this.state.colorIndex,this.state.lightness,this.state.lightingPatternNumber)
        }else {
            Actions.changeSwitch(0,this.state.lightColorR,this.state.lightColorG,this.state.lightColorB,this.state.colorIndex,this.state.lightness,this.state.lightingPatternNumber)
        }  
    }
    selectColor() {
        this.setState({
            colorPickerShow:true
        })
    }
    cancleColorPicker() {
        this.setState({
            colorPickerShow:false
        })
    }
    changeLampColor(data) {
        Actions.changeColor(1,data.r,data.g,data.b,-1,this.state.lightness,this.state.lightingPatternNumber);
        let colorArr = this.state.colorArray;
        let item = 'rgb('+data.r+","+data.g+","+data.b+")";
        let color = '#' + pad0((data.r).toString(16)) + pad0((data.g).toString(16)) + pad0((data.b).toString(16));
        function pad0(hex) {
            return hex.replace(/^\b(?=.$)/, '0');
        }
        colorArr.unshift(color)
        this.setState({
            colorArray:colorArr,
        })
    }
    settingShow() {
        if(this.state.settingShow==false){
            this.setState({
                settingShow:true
            })
        }else{
            this.setState({
                settingShow:false
            })
        }
    }
    getRGBColorIndex(r='', g='', b='') {
        let colors = this.state.colorArray;
        let color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
        function pad0(hex) {
            return hex.replace(/^\b(?=.$)/, '0');
        }
        return (colors.indexOf(color) || 0) ;
    }
    setSt() {
        this.setState({
            toastShow:false,
        })
    }
    render() {
        console.log(this.state.tips+":::"+this.state.toastShow)
        let colorIndex = this.getRGBColorIndex(this.state.lightColorR,this.state.lightColorG,this.state.lightColorB)
        let titleShow = (this.state.alarmClock1Switch==1||this.state.alarmClock2Switch==1)?"visible":"hidden"
        let timing = this.state.alarmClock1Switch==1?(this.state.alarmClock1Hour + ":" + this.state.alarmClock1Minute):(this.state.alarmClock2Switch==1?(this.state.alarmClock2Hour + ":" + this.state.alarmClock2Minute):0);
        let lightImg = this.state.lightingPatternNumber == 0 ? "../static/img/pic-09xxhdpi.png":"../static/img/pic-08xxhdpi.png";
        let sceneImg = this.state.lightingPatternNumber == 0 ? "../static/img/pic-12xxhdpi.png":"../static/img/pic-13xxhdpi.png";
        let lightColor = this.state.lightingPatternNumber == 0 ? "#1bb1e4":"#919191";
        let sceneColor = this.state.lightingPatternNumber == 0 ? "#919191":"#1bb1e4";
        let rotate = (this.state.lightness*2.27) < 0 ? 0 : (this.state.lightness*2.27);
        rotate = rotate > 273 ? 273 : rotate;
        let rotateZ = "rotateZ("+rotate+"deg)";
        let lightness = this.state.lightness < 0 ? 0 :parseInt((this.state.lightness > 120 ? 120 : this.state.lightness)/1.2);
        let rgba =this.state.lightingPatternNumber == 0 ? `rgba(210,210,225,1)`:`rgba(${this.state.lightColorR}, ${this.state.lightColorG}, ${this.state.lightColorB}, ${this.state.a})`;
        let lampColor = [{pName:"lamp-color-one"},{pName:"lamp-color-two"},{pName:"lamp-color-three"},{pName:"lamp-color-four"},{pName:"lamp-color-five"}]
        return  <div className="lamp">
                    <div id="lampTop" className = "lamp-btn" style={{height:this.state.lightSwitch==0?"30%":"9.9166666rem"}}>
                        <div className = "home-btn-timing">
                        <Link to="/list">
                            <img src = "../static/img/pic-04xxhdpi.png"/>
                            <h3>闹铃</h3>
                        </Link>    
                        </div>
                        <div className = "home-btn-title" style={{visibility:titleShow}}>
                            <div className = "timing-title">
                            {timing}
                            </div>
                        </div>
                        <div className = "home-btn-music">
                                <img src = "../static/img/pic-05xxhdpi.png"/>
                                <h3>音乐</h3> 
                        </div>
                    </div>
                    <div id="lampSpace" style={{width:"100%",height:"2.666667rem"}}></div>
                    <div id="lampChart" className="lamp-chart">
                        <img className="lamp-pic-four" src="../static/img/pic-2.png"/>
                        <img className="lamp-pic-one" style={{display:rotate<=135?"block":"none",transform:rotate<=135?rotateZ:"rotateZ("+ 0+"deg)"}} src="../static/img/pic-4.png"/>
                        <img className="lamp-pic-two" style={{display:( rotate >=0 ) && ( rotate <= 225 ) ?"block":"none",transform:( rotate > 135 ) && ( rotate <= 225 )?("rotateZ("+(rotate-135)+"deg)"):("rotateZ("+ 0 +"deg)")}}  src="../static/img/pic-5.png"/>
                        <img className="lamp-pic-three" style={{display:( rotate >=0 ) && ( rotate <= 270 ) ?"block":"none",transform:( rotate > 225 ) && ( rotate <= 270 )?("rotateZ("+(rotate-225)+"deg)"):("rotateZ("+ 0 +"deg)")}} src="../static/img/pic-6.png"/>
                        <img style={{transform:rotateZ}} className="lamp-pic-five" src="../static/img/pic-3.png"/>
                        <div id="xingyue" className="lamp-xingyue">
                            <div className="lamp-xingyue-pic" style={{background:rgba}}>
                                <img className="lamp-xingyue-bg" src="../static/img/lamp.png"/>
                                <img className="lamp-xingyue-opacity" src="../static/img/lamp.png"/>
                            </div>
                            <h3 className="lamp-xingyue-tips" style={{color:"#2ccaff"}}>{lightness==null?"--":lightness}</h3>
                        </div>
                        <div className="lamp-pic" style={{transform:rotateZ}} >
                            <div className="lamp-pic-logo" onTouchStart={this.startChange.bind(this)} onTouchEnd={this.endChange.bind(this)}></div>
                            <span id="btn" className="lamp-pic-btn" onTouchStart={this.startMove.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.endMove.bind(this)} style={{display:"block",width:"2.5rem",height:"2.5rem",borderRadius:"2.5rem",position:"absolute",left:"50%",bottom:"1.6rem",marginLeft:"-7.0rem"}}>    
                            </span>
                        </div>
                        <span className="lamp-hidden"></span>
                        <span className="close-btn" onTouchStart={this.close.bind(this)}>
                        </span>
                        <span className="setting-btn" onTouchStart={this.settingShow.bind(this)}>
                        </span>                              
                    </div>
                    <div className="lamp-color" style={{visibility:this.state.lightingPatternNumber==1?"visible":"hidden"}}>
                        {lampColor.map((item,index)=>{
                            if(index==colorIndex){
                                return  <div key={index} className={item.pName} onTouchStart={this.addBackground.bind(this)} style={{background:(this.state.colorArray)[index]}}>
                                            <i className="lamp-color-selected"></i>
                                        </div>
                            }else{
                                return  <div key={index} className={item.pName} onTouchStart={this.addBackground.bind(this)} style={{background:(this.state.colorArray)[index]}}>
                                            <i></i>
                                        </div>
                            }  
                        })}
                        <span className="lamp-color-select" onTouchStart={this.selectColor.bind(this)}><img src="../static/img/pic-25xxhdpi.png"/></span>
                    </div>
                    <div className="lamp-scene" >
                        <div className="lamp-scene-light lamp-scene-style" onTouchStart={this.changeLightImg.bind(this)}>
                            <img src={lightImg}/>
                            <h3 style={{color:lightColor}}>照明</h3>    
                        </div>
                        <div className="lamp-scene-space"></div>
                        <div className="lamp-scene-air lamp-scene-style" onTouchStart={this.changeSceneImg.bind(this)}>
                            <img src={sceneImg}/>
                            <h3 style={{color:sceneColor}}>氛围</h3>        
                        </div>
                    </div>
                    <div className ="home-on"  style={{bottom:this.state.lightSwitch==0?"0":"-70%"}}>
                        <img src = "../static/img/pic-03xxhdpi.png" onTouchStart={this.close.bind(this)}/>
                        <h3 onTouchStart={this.close.bind(this)}>开启智能灯</h3>      
                    </div>
                    <ColorPicker show={this.state.colorPickerShow} cancle={this.cancleColorPicker.bind(this)} close={this.changeLampColor.bind(this)}/>
                    <div className="lamp-setting" style={{visibility:this.state.settingShow==true?"visible":"hidden"}}>
                        <div className="lamp-setting-space" onTouchStart={this.settingShow.bind(this)}></div>
                        <div className="lamp-setting-lists">
                            <Link to="/reseting"><div className="lamp-setting-list">设备</div></Link>
                            <div className="lamp-setting-list">设备详情</div>
                        </div>
                    </div>
                    <Toast show={this.state.toastShow} tips={this.state.tips}/>
                </div>
    }
}