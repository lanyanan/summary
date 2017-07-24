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

/**
 * Toast提示
 * @param    {String}      msg提示信息
 */
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

function getUrlParam(sName){
    var reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]); // (r[2]);
    return "";
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
export class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            brandName: '',
            brandIdentify: '',
            changeColor: false
        };
        het.setTitle('测肤仪');
        setDocumentTitle('测肤仪');
        this.listenStore(Store); // 监听Store 
        if(getCookie('refreshToken')){
            let url = '#/brandShow?openid=' + getCookie('openid')||getQueryString('openid'); 
            window.location.replace (url);
        }
    }
    componentDidMount(){
        Actions.getBrandList();
        
    }
    selectBrand(e){
        let value1 = ReactDOM.findDOMNode(this.refs._access);
        let value2 = ReactDOM.findDOMNode(this.refs._account);
        let value3 = ReactDOM.findDOMNode(this.refs._password);
        value1.blur();
        value2.blur();
        value3.blur();
        this.setState({showBrand: true})
    }
    cancelSelect(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({showBrand: false})
    }
    confirmBrand(e){
        e.preventDefault();
        e.stopPropagation();
        let name = e.currentTarget.getAttribute('data-name');
        let id = e.currentTarget.getAttribute('data-id');
        this.setState({
            showBrand: false,
            brandName: name,
            brandIdentify: id
        });
    }
    handleFoucs(e){
        let value = e.currentTarget.value;
        let id = e.currentTarget.getAttribute('data-ipt');
        let btn = ReactDOM.findDOMNode(this.refs[id]);
        if(value!==''){
            btn.style.display = 'block';
        }
    }
    hideCloseBtn(e){
        let id = e.currentTarget.getAttribute('data-ipt');
        let btn = ReactDOM.findDOMNode(this.refs[id]);
        btn.style.display = 'none';
    }
    clearValue(e){
        e.preventDefault();
        e.stopPropagation();
        let img = e.currentTarget.getAttribute('data-img');
        let ipt = ReactDOM.findDOMNode(this.refs[img]);
        ipt.value = '';
        e.currentTarget.style.display = 'none';
        let value1 = ReactDOM.findDOMNode(this.refs._access).value;
        let value2 = ReactDOM.findDOMNode(this.refs._account).value;
        let value3 = ReactDOM.findDOMNode(this.refs._password).value;
        if(value1!==''&&value2!==''&&value3!==''){
            this.setState({changeColor: true});
        }else{
            this.setState({changeColor: false});
        }
    }
    handleKeyUp(e){
        let value = e.currentTarget.value;
        let id = e.currentTarget.getAttribute('data-ipt');
        let btn = ReactDOM.findDOMNode(this.refs[id]);
        if(value===''){
            btn.style.display = 'none';
        }else{
            btn.style.display = 'block';
        }
        let value1 = ReactDOM.findDOMNode(this.refs._access).value;
        let value2 = ReactDOM.findDOMNode(this.refs._account).value;
        let value3 = ReactDOM.findDOMNode(this.refs._password).value;
        if(value1!==''&&value2!==''&&value3!==''){
            this.setState({changeColor: true});
        }else{
            this.setState({changeColor: false});
        }
    }
    confirmLogin(){
        if(this.state.changeColor){
            let access = ReactDOM.findDOMNode(this.refs._access).value;
            let account = ReactDOM.findDOMNode(this.refs._account).value;
            let password = ReactDOM.findDOMNode(this.refs._password).value;
            let brandId = this.state.brandIdentify;
            let reg1 = /^[0-9A-Za-z]{6,10}$/;
            let reg2 = /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
            if(this.state.brandName===''){
                showToast('请选择一个品牌');
                return;
            }else if(!reg1.test(access)){
                showToast('授权码为6~10位数字或字母');
                return;
            }else if(!reg2.test(account)){
                showToast('账号为11位手机号或邮箱');
                return;
            }
            let openid = getUrlParam('openid') || getQueryString('openid');
            Actions.confirmLogin(account,password,access,brandId,openid);
        }
    }
    render() {
        let list = this.state.list;
        let items = null;
        if(isArrayFn(list)){
            items = list.map((item,index)=>{

                return (
                        <li key={index} data-id={item.brandIdentify} data-name={item.brandName} onTouchTap={this.confirmBrand.bind(this)}>
                            <span>{item.brandName}</span>
                            <img src='../static/img/gou.png' style={{display: `${this.state.brandName===item.brandName?'':'none'}`}}/>
                        </li>
                    )
            })
        }
        return (
                <div>
                    
                    <div className='m-logo flex'>
                        <img src='../static/img/logo.png'/>
                    </div>
                    <div className='m-main flex'>
                        
                        <div className='main-con'>
                            
                            <div className='u-ipt flex first'>
                                <h2>品牌</h2>
                                <p onTouchTap={this.selectBrand.bind(this)}>{this.state.brandName||'请选择护肤品品牌'}</p>
                                <img src='../static/img/right1.png'/>
                            </div>
                            <div className='u-ipt flex'>
                                <h2>授权码</h2>
                                <input type='text' placeholder='请输入授权码' data-ipt='access' ref='_access' onFocus={this.handleFoucs.bind(this)} onBlur={this.hideCloseBtn.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                                <img src='../static/img/close.png' style={{display: 'none'}} ref='access' data-img='_access' onTouchTap={this.clearValue.bind(this)}/>
                            </div>
                            <div className='u-ipt flex'>
                                <h2>账号</h2>
                                <input type='text' placeholder='请输入C-Life账号' data-ipt='account' ref='_account' onFocus={this.handleFoucs.bind(this)} onBlur={this.hideCloseBtn.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                                <img src='../static/img/close.png' style={{display: 'none'}} ref='account' data-img='_account' onTouchTap={this.clearValue.bind(this)}/>
                            </div>
                            <div className='u-ipt flex'>
                                <h2>密码</h2>
                                <input type='password' placeholder='请输入C-Life密码' data-ipt='password' ref='_password' onFocus={this.handleFoucs.bind(this)} onBlur={this.hideCloseBtn.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
                                <img src='../static/img/close.png' style={{display: 'none'}} ref='password' data-img='_password' onTouchTap={this.clearValue.bind(this)}/> 
                            </div>
                            <button style={{color: `${this.state.changeColor?'#fff':'#ffa6a0'}`}} onTouchTap={this.confirmLogin.bind(this)}>登录</button>

                        </div>
                        
                    </div>

                    <div className='brand-select' style={{display: `${this.state.showBrand?'':'none'}`}}>
                        <div className='brand-shade' onTouchStart={this.cancelSelect.bind(this)}></div>
                        <div className='brand-item' style={{bottom:this.state.showBrand? 0 :"-24rem"}}>
                            {items}
                        </div>
                    </div>

                    <div className='m-toast' id='toast' style={{display: 'none'}}></div>
                
                </div>
            )
    }
}