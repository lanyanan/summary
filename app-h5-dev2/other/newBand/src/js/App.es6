import {deviceAction} from './Actions/deviceAction.es6';
import {deviceStore} from './Stores/deviceStore.es6';

export default class App extends React.Component{
    state = {
        deviceName:'',
        rawData:{}
    }

    componentDidMount(){
        this.removeListener = deviceStore.listen((data)=>this.setState(data));

        // 获取设备名称
        deviceAction.getDeviceInfo();

        // 循环获取设备信息(电量、连接状态)和睡眠数据(...)
        deviceAction.getRaw();
        this.tclock = setInterval(()=>deviceAction.getRaw(), 5000);
    }

    componentWillUnmount(){
        this.removeListener();
        clearInterval(this.tclock);
    }

    render(){
        return React.cloneElement(this.props.children, this.state);
    }
}
