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

function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);
}

function getCookie(c_name) {
    if (document.cookie.length>0) {
        let c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) { 
            c_start=c_start + c_name.length+1 ;
            let c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

function setCookie(c_name,value,expireSeconds,path) {
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireSeconds*1000);
    document.cookie=c_name+ "=" +escape(value)+ ((expireSeconds==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
}

function getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let hash = window.location.hash;
     let r = hash.substr(hash.indexOf('?')+1).match(reg);
     if(r!=null) return decodeURI(r[2]);
     return '';
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
export class brandShow extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPop: false,
            showPop2: false,
            deviceList: null,
        };
        het.setTitle('测肤仪');
        setDocumentTitle('测肤仪');
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let oid = getCookie('openid');
        Actions.getSkinDevice();
        Actions.getBrandLogo(oid);
    }
    handleTap(e){
        e.preventDefault();
        e.stopPropagation();
        let type = e.currentTarget.getAttribute('data-type');
        if(type==='singleTest'){
            if(this.state.deviceList===null) return false;
            if(isArrayFn(this.state.deviceList)&&this.state.deviceList.length===0){
                showToast('暂无设备！');
                return false;
            }
            if(isArrayFn(this.state.deviceList)&&this.state.deviceList.length>1){
                this.setState({showPop: true});
                return false;
            }
            window.location.href = '#/measureSkin?openid='+ getQueryString('openid')||getCookie('openid');


        }else if(type==='careTest'){
            if(this.state.deviceList===null) return false;
            if(isArrayFn(this.state.deviceList)&&this.state.deviceList.length===0){
                showToast('暂无设备！');
                return false;
            }
            if(isArrayFn(this.state.deviceList)&&this.state.deviceList.length>1){
                this.setState({showPop2: true});
                return false;
            }
            window.location.href = '#/skinCareTest?openid='+ getQueryString('openid')||getCookie('openid');

        }else if(type==='deviceList'){
            window.location.hash = '/deviceList?openid='+ getQueryString('openid')||getCookie('openid');
        }
    }
    cancelSelect(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showPop: false});
    }
    cancelSelect2(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showPop2: false});
    }
    toDevice(e){
        e.preventDefault();
        e.stopPropagation();
        let id = e.currentTarget.getAttribute('data-id');
        setCookie('deviceId',id);
        this.setState({showPop: false});
        window.location.href = '#/measureSkin?openid='+ getQueryString('openid')||getCookie('openid');
    }
    toDevice2(e){
        e.preventDefault();
        e.stopPropagation();
        let id = e.currentTarget.getAttribute('data-id');
        setCookie('deviceId',id);
        this.setState({showPop2: false});
        window.location.href = '#/skinCareTest?openid='+ getQueryString('openid')||getCookie('openid');
    }
    render() {
        let list = this.state.deviceList;
        let item = null;
        let item2 = null;
        let _this = this;
        if(isArrayFn(list)){
            item = list.map((item,index)=>{
                let colorStyle = {};
                if(item.onlineStatus===2) colorStyle={color: '#F78D85'};
                return (
                        <div className='deviceItem flex' key={index} data-id={item.deviceId} onTouchTap={_this.toDevice.bind(this)}>
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
        if(isArrayFn(list)){
            item2 = list.map((item,index)=>{
                let colorStyle = {};
                if(item.onlineStatus===2) colorStyle={color: '#F78D85'};
                return (
                        <div className='deviceItem flex' key={index} data-id={item.deviceId} onTouchTap={_this.toDevice2.bind(this)}>
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
                <div className='m-brandShow'>
                    
                    <div className='brand-logo flex'>
                        <img src={this.state.logoSrc||''} />
                    </div>

                    <div className='brand-btn'>
                        <div className='single-test flex img-con'>
                            <div className='tapShade' data-type='singleTest' onTouchTap={this.handleTap.bind(this)}></div>
                        </div>
                        <div className='care-test flex img-con'>
                            <div className='tapShade' data-type='careTest' onTouchTap={this.handleTap.bind(this)}></div>
                        </div>
                        <div className='device-list flex img-con'>
                            <div className='tapShade' data-type='deviceList' onTouchTap={this.handleTap.bind(this)}></div>
                        </div>
                    </div>

                    <div className='brand-device' style={{display: `${this.state.showPop?'':'none'}`}}>
                        <div className='device-shade' onTouchStart={this.cancelSelect.bind(this)}></div>
                        <div className='device-items' style={{bottom:this.state.showPop? 0 :"-31rem"}}> 
                            {item}
                        </div>
                    </div>
                    <div className='brand-device' style={{display: `${this.state.showPop2?'':'none'}`}}>
                        <div className='device-shade' onTouchStart={this.cancelSelect2.bind(this)}></div>
                        <div className='device-items' style={{bottom:this.state.showPop2? 0 :"-31rem"}}> 
                            {item2}
                        </div>
                    </div>

                     <div className='m-toast' id='toast' style={{display: 'none'}}></div>
                </div>
            )
    }
}