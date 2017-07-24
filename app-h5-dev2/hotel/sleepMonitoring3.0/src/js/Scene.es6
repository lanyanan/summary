import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Toast} from './Toast.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

let sceneList = {addedStatus:1,pictureUrl:"http://200.200.200.58:8981/group1/M00/04/F5/yMjIOlgzrWOAbYUgAAMsKwN5dJg511.png",runStatus:0,sceneId:181,sceneName:"起床情景",summary:"居于7:00~9:00时间段， 轻柔唤醒用户，保持愉快心情的场景环境",validity:0}
export class Scene extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            sceneId:"177",
            sceneName:"酒店极致舒适睡眠体验",
            pictureUrl:"../static/img/scene.png",
            summary:"",
            runStatus:0,
            validity:1,
            upDown:true,
            upDownBtnImg:"../static/img/down.png",
            deviceList:[],
            btnTxt:"开启场景",
            error:false,
            tips:"",
            tipsClassName:"toast-hide",
            operate:"on",
            sceneList:[],
            
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.login();
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl);
        this.sceneName = this.props.location.query.sceneName?this.props.location.query.sceneName:this.state.sceneName;
        Actions.getSceneList();
        Actions.getData(this.sceneName);
    }
    showHide() {
    	if(this.state.upDown){
    		this.setState({
    			'upDown':false,
    			"upDownBtnImg":'../static/img/up.png'
    		})
    	}else{
    		this.setState({
    			'upDown':true,
    			"upDownBtnImg":'../static/img/down.png'
    		})
    	}    
    }
    onSwitchUserScene() {
        if(this.state.sceneId){
            console.log(9)
            Actions.switchUserScene(this.state.sceneId,this.state.operate);
        }else{
            console.log(10)
        }
    
    }
    render() {
        let arr = [6001,6002,28001,14003,43001,11001,5003,21001,6006,14006];
        let deviceList = [];
        (this.state.deviceList).map((item,index)=>{
            if(arr.indexOf(item.deviceSubTypeId)>=0){
                deviceList.push(item)
            }
        })
        this.state.sceneList.map((item,index)=>{
            if(this.sceneName === item.sceneName) {
                sceneList = item;
            }
        });
        return <div className='scene'>
                    <div className='scene-top'>
                        <div className="scene-img">
                            <img src={sceneList.pictureUrl}/>
                        </div>
                        <div className="scene-cont">
                            <div className="scene-title">{sceneList.sceneName}</div>
                            <div className="scene-details">{sceneList.summary}</div>
                        </div>
                        <div className="devices">
                            <h3>情景设备</h3>
                            <div className="scene-devices">
                            {deviceList.map((item,index)=>{
                                if(!this.state.upDown){
                                    return  <div key={index} className="device-list">
                                                <a href={item.url}>
                                                    <div className='device-list-circle'>
                                                        <img src={item.productIcon}/>
                                                    </div>
                                                </a>
                                                <h3>{item.deviceName}</h3>   
                                            </div>
                                }else{
                                    if(index<=3){
                                        return  <div key={index} className="device-list">
                                                    <a href={item.url}>
                                                        <div className='device-list-circle'>
                                                            <img src={item.productIcon}/>
                                                        </div>
                                                    </a> 
                                                    <h3>{item.deviceName}</h3>
                                                </div>
                                        }else{  
                                        }
                                }    
                            })}
                                <div className='upDown' onTouchStart={this.showHide.bind(this)}>
                                    <img id='upDown' src={this.state.upDownBtnImg} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="scene-state-space">
                        </div>
                    </div> 
                    <div id="toast" className={this.state.tipsClassName}>
                        <span>
                          {this.state.tips}
                        </span> 
                    </div>
                    <div className="scene-state">
                        <h3 onTouchEnd = {this.onSwitchUserScene.bind(this)}>
                            {this.state.btnTxt}
                        </h3>
                        <Link className="more-scene" to={path} >
                            更多场景
                        </Link>
                    </div>
               </div>;
    }
}