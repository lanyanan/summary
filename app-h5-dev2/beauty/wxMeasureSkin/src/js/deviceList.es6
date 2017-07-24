import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

/* 
 判断是否为数组
 */ 
function isArrayFn(value){ 
    if (typeof Array.isArray === "function") { 
        return Array.isArray(value); 
    }else{ 
        return Object.prototype.toString.call(value) === "[object Array]"; 
    } 
} 

function setCookie(c_name,value,expireSeconds,path) {
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireSeconds);
    document.cookie=c_name+ "=" +escape(value)+ ((expireSeconds==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
}

function setDocumentTitle (title) {
     document.title = title;
     if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
         var i = document.createElement('iframe');
         i.src = '/favicon.ico';
         i.style.display = 'none';
         i.onload = function() {
             setTimeout(function(){
                  i.remove();
             }, 9)
         }
         document.body.appendChild(i);
     }
 }

// 创建React组件
export class deviceList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        het.setTitle('设备');
        setDocumentTitle('设备');
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        Actions.getDeviceList();
    }
    handleTap(e){
        e.preventDefault();
        e.stopPropagation();
        let deviceId = e.currentTarget.getAttribute('data-deviceId');
        setCookie('deviceId',deviceId);
        window.location.href = '#/measureSkin';
    }
    render() {
        let list = this.state.deviceList;
        let item = null;
        if(isArrayFn(list)){
            item = list.map((item,index)=>{
                let colorStyle = {};
                if(item.onlineStatus===2) colorStyle={color: '#F78D85'};
                return (
                        <div className='deviceItem flex' key={index} onTouchTap={this.handleTap.bind(this)} data-deviceId={item.deviceId}>
                            <div className='device-logo flex'>
                                <img src={item.deviceIcon}/>
                            </div>
                            <p className='device-title flex'>
                                {item.deviceName}
                            </p>
                            <p className='device-status flex' style={colorStyle}>
                                {item.onlineStatus-1?'离线':'在线'}
                            </p>
                            <img src='../static/img/right1.png'/>

                        </div>
                    )
            })
        }
        return (
                <div className='m-deviceList'>

                    {item}

                    <div className='downloadApp flex'>
                        <div className='erweima'></div>
                        <p>下载<strong>C-Life美容</strong>绑定设备</p>
                    </div>

                </div>
            )
    }
}