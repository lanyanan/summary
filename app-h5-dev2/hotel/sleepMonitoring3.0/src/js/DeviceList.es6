import {Funs} from '../../../common/src/fun.es6';
import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class DeviceList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            sceneList:[],
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.login();
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl);
        Actions.getDeviceList();
    }
    render() {
        let d = this.state.dataList?this.state.dataList:[];
        console.log(d)
        return  <div className="devices"> 
                    {d.map((item,index)=>{
                        let arr =  [6001,6002,28001,14003,43001,11001,5003,21001,6006,14006];
                        let show = arr.indexOf(item.deviceSubTypeId)>-1?{}:{display:'none'}
                        return  <a href={item.url} className="devices-list" key={index} style={show}>
                                    <div className="device-logo">
                                        <img src={item.productIcon} />
                                    </div>
                                    <div className="device-info flex-column">
                                        <h2>{item.deviceName}</h2>
                                        <p style={item.status?{color: '#919191'}:{color: '#8458DD'}}>{item.status?'离线':'在线'}</p>
                                    </div>
                                    <img src="../static/img/rightarrow.png" className="next-arrow"/>
                                </a>
                    })}                 
                </div>;
    }
}