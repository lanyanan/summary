import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import Funs from '../../libs/fun.js';


export class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.listenStore(Store);
    }
    componentDidMount() {
        let loginName = Funs.getCookie("loginName");
        if(loginName){
            this.setState({
                loginName: loginName
            });
        }
        Funs.setCookie("loginName","");
        window.addEventListener('keydown', this.handleKeyDown.bind(this))
    }
    handleLogin(){
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        if(username === ""){
            this.setState({
                ajaxErrorTips: "用户名不能为空"
            });
            return false;
        }
        if(password === ""){
            this.setState({
                ajaxErrorTips: "密码不能为空"
            });
            return false;
        }
        Actions.loginCheck(username,password);
    }
    handleKeyDown(e){
        if(e.keyCode === 13){
            this.handleLogin();
        }
    }
    render() {
        return  <div className="row-fluid login-wrapper">
                    <a href="#">
                        <img className="logo" src="./static/img/loginlogo.png" />
                    </a>
                    <div className="span4 box">
                        <div className="content-wrap">
                            <h6>Log in</h6>
                            <input className="span12" id="account" ref="username" type="text" defultValue={this.state.loginName&&this.state.loginName} placeholder="Your account" />
                            <input className="span12" id="devpassword" ref="password" type="password" placeholder="Your password" />
                            {
                               this.state.ajaxErrorTips &&  <p>{this.state.ajaxErrorTips}</p>
                            }
                            <a className="btn-glow primary login" href="javascript:;" onClick={this.handleLogin.bind(this)}>Log in</a>
                        </div>
                    </div>
                </div>
    }
}