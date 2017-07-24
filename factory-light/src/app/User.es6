import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Header,Menu,Pager,SureAutoCloseTips,Dialog,DeleteTips} from '../modules/Common/Common.es6';
import Funs from '../../libs/fun.js';

var {Router, Route, hashHistory,Link} = ReactRouter;
export class User extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    componentDidMount() {
        
    }
    render() {
        return  <div>
                    <Header />
                    <div className="wrap">
                        <Menu />
                        <div className="content company">
                            {this.props.children}
                        </div>
                    </div>
                </div>;
    }
}

export class UserInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this.listenStore(Store); 
    }
    componentDidMount() {
        Actions.initData();
        let pageIndex = this.props.params.id ? this.props.params.id : 1;
        Actions.getUserPageList(pageIndex,10);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            let pager = this.state.pager;
            pager.pageIndex = nextProps.params.id;
            this.setState({pager:pager,ajaxLoad: false},()=>{
                Actions.getUserPageList(nextProps.params.id,10);
            });
        }
        
    }
    handleDeleteUser(id,userId){
        this.setState({
            showDialog: true,
            deleteUserIndex: id,
            deleteUserId:userId,
        });
    }
    handleTipsDeleteUser(){
        this.state.user.userInfo.splice(this.state.deleteUserIndex,1); 
        Actions.deleteUser(this.state.deleteUserId);
        this.handleTipsCloseDialog();
    }
    handleTipsCancelUser(){
        this.handleTipsCloseDialog();
    }
    handleTipsCloseDialog(){
        this.setState({
            showDialog: false
        });
    }
    getPager(pageIndex){
        window.location = "#/user/userinfo/" + pageIndex;
        let pager = this.state.pager;
        pager.pageIndex = pageIndex;
        this.setState({pager: pager,ajaxLoad: false},()=>{
            
        });
    }
    gotoEdit(id,opt){
        hashHistory.push({
            pathname: "/user/edit/" + id,
            state: {
                userName:opt.userName,
                loginName:opt.loginName,
                password:opt.password,
                authorityName:opt.authorityName,
                telephone:opt.telephone,
                companyName:opt.companyName,
                companyId:opt.companyId,
                status:opt.status,
            }
        })
    }
    render() {
        let userObj = this.state.user;
        let ajaxError = this.state.ajaxError;
        let ajaxErrorTips = this.state.ajaxErrorTips;
        let ajaxLoad = this.state.ajaxLoad;
        let content = <tr className="ajax-loading"><td  colSpan='11' height="200"><em className='ajax-loading-img'></em></td></tr>; //默认loading
        
        if(ajaxError){
            content = <tr><td colSpan="11">{ajaxErrorTips}</td></tr>;
        }
        if(userObj&&userObj.userInfo){
            if(!userObj.userInfo.length){
                content = <tr><td colSpan="11">暂无数据</td></tr>
            }else{
                
                content = userObj.userInfo.map((item,index) => {

                            let opt = {
                                userName: item.userName,
                                loginName: item.loginName,
                                password: item.password,
                                authorityName: item.authorityName,
                                telephone: item.telephone,
                                companyName: item.companyName,
                                companyId: item.companyId,
                                status: item.status,
                            }
                            let t = item.modifyTime ? item.modifyTime : item.createTime;
                            return  <tr key={index}>
                                        <td width="40">&nbsp;</td>
                                        <td>{index + 1}</td>
                                        <td>{item.userId}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.loginName}</td>
                                        <td>{item.authorityName}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.companyName}</td>
                                        <td>{parseInt(item.status) ? "正常" : "停用"}</td>
                                        <td>{Funs.dateFormat(t,"yyyy-MM-dd hh:mm:ss", true)}</td>
                                        <td>
                                            <a href="javascript:;" onClick={this.gotoEdit.bind(this,item.userId,opt)} className="f14 edit">编辑</a>
                                            <a href="javascript:;" onClick={this.handleDeleteUser.bind(this,index,item.userId)} className="f14 delete">删除</a>
                                        </td>
                                    </tr>
                        })
            }        
        }
        if(!ajaxLoad){
            content = <tr className="ajax-loading"><td  colSpan='11' height="200"><em className='ajax-loading-img'></em></td></tr>; //默认loading
        }
        return  <div className="company-management">
                    <div className="content-title company-title">
                        <h1 className="f16">用户管理</h1>
                        <Link to="/user/edit/new" className="f14" >+&nbsp;新增用户</Link>
                    </div>
                    <div className="content-table company-table">
                        <table>
                            <thead>
                                 <tr>
                                    <th width="40">&nbsp;</th>
                                    <th>编号</th>
                                    <th>用户ID</th>
                                    <th>用户名称</th>
                                    <th>登陆用户名</th>
                                    <th>权限名称</th>
                                    <th>手机号</th>
                                    <th>公司名称</th>
                                    <th>状态</th>
                                    <th>编辑时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content}
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.showDialog  && <Dialog classes="delete-conform" titlees="删除用户" handleCloseDialog={this.handleTipsCloseDialog.bind(this)}>
                                                    <DeleteTips handleCancel={this.handleTipsCancelUser.bind(this)} handleDelete={this.handleTipsDeleteUser.bind(this)} />
                                                </Dialog>
                    }
                    {
                        this.state.pager&&<Pager pager={this.state.pager} getPager={this.getPager.bind(this)}/>
                    }
                </div>;
    }
}

export class EditUser extends BaseComponent {
    constructor(props) {
        super(props);
        let stateObj = this.props.location.state;
        if(stateObj){
            this.state = {
                authorityId: "",
                authorityArr: [],
                companyArr: [],
                authorityName: stateObj.authorityName ? stateObj.authorityName : "",
                companyName:stateObj.companyName ? stateObj.companyName : "",
                companyId:stateObj.companyId ? stateObj.companyId : "",
                loginName:stateObj.loginName ? stateObj.loginName : "",
                password:stateObj.password ? stateObj.password : "",
                status:stateObj.status ? stateObj.status : "",
                telephone:stateObj.telephone ? stateObj.telephone : "",
                userName:stateObj.userName ? stateObj.userName : "",
            }; 
        }else{
            this.state = {
                authorityId: "",
                authority: [],
                companyId: "",
                companyArr: [],
                authorityName: "",
                companyName: "",
                loginName: "",
                password: "",
                status: "",
                telephone: "",
                userName: "",
            }; 
        }

        this.listenStore(Store); 
    }
    componentDidMount() {
        Actions.initData(); 
        Actions.getCompanyList(function(){
            this.setCompanySelect();
            Actions.getAuthorityList(function(){
                this.setAuthoritySelect();
            }.bind(this));
        }.bind(this));
        
    }
    handleSave(){
        let opt = {
            companyId: this.refs.companyId.value,
            authorityId: this.refs.authorityId.value,
            loginName: this.refs.loginName.value,
            status: this.refs.status.value
        }
        let userTel = this.refs.userTel.value;
        let userName = this.refs.userName.value;
        let loginName = this.refs.loginName.value;
        let password = this.refs.password.value;
        let authority = this.refs.authorityId.value;

        this.setState({
            ajaxErrorTips: false
        });
        let timeer = setTimeout(function(){
            if(authority === "没有权限数据"){

                this.setState({
                    ajaxErrorTips: "保存失败，请先设置权限"
                });
                return false;
            }

            if(/^[\u4e00-\u9fa50-9a-zA-Z_]{1,50}$/.test(userName)){
                opt.userName = userName;
            }else{
                this.setState({
                    ajaxErrorTips: "用户名称为中文字母数字下划线，不能为空，不能超过50个字符"
                });
                return false;
            }

            if(/^[0-9a-zA-Z_]{1,50}$/.test(loginName)){
                opt.loginName = loginName;
            }else{
                this.setState({
                    ajaxErrorTips: "登陆名称为字母数字下划线，不能为空，不能超过50个字符"
                });
                return false;
            }

            if(/\w{6,20}/.test(password)){
                opt.password = password;
            }else{
                this.setState({
                    ajaxErrorTips: "用户密码不能为空，6-20位，只能输入字母、数字和符号，明文显示"
                });
                return false;
            }

            if(/^\s*$|1\d{10}/.test(userTel)){
                opt.telephone = userTel;
            }else{
                this.setState({
                    ajaxErrorTips: "请输入正确的手机格式"
                });
                return false;
            }


            if(this.props.params.id === "new"){
                Actions.addUser(opt);
            }else{
                opt.userId = this.props.params.id;
                Actions.updateUser(opt);
            }
            clearTimeout(timeer);
        }.bind(this),0);
    }
    setCompanySelect(){
        //公司列表
        let companyObj = this.state.company;
        let companySelect = "";
        let companyName = this.state.companyName;
        let companyId = "";

        if(companyObj&&companyObj.companyInfo){
            let companySelectOptions = companyObj.companyInfo.map((item,index) => {
                return  <option key={index} value={item.companyId}>{item.companyName}</option>    
            }); 

            this.setState({
                companyArr: companySelectOptions
            });
        }
    }
    setAuthoritySelect(){
        let authorityObj = this.state.authority;
        let authoritySelect = "";
        let authorityName = this.state.authorityName;
        let authorityId = "";
        let companyId = this.state.companyId;
        let companyObj = this.state.company;
        if(authorityObj&&authorityObj.authorityInfo){
            authorityObj.authorityInfo.forEach((item,index) => {
                if(item.authorityName === authorityName){
                    authorityId = item.authorityId;
                    return;
                }
            });
            let authoritySelectOptions = "";
            if(companyId === ""){
                authoritySelectOptions = authorityObj.authorityInfo.map((item,index) => {
                    return  <option key={index} value={item.authorityId}>{item.authorityName}</option>    
                }); 

            }else{
                authoritySelectOptions = authorityObj.authorityInfo.map((item,index) => {
                    if(parseInt(companyId) === parseInt(item.companyId)){
                        return  <option key={index} value={item.authorityId}>{item.authorityName}</option>    
                    }
                });
                for(var i=0;i<authoritySelectOptions.length; i++){
                    if(authoritySelectOptions[i] == "" || typeof(authoritySelectOptions[i]) == "undefined"){
                        authoritySelectOptions.splice(i,1);
                        i= i-1;
                    }
                }
            }
            if(authoritySelectOptions.length === 0){
                    authoritySelectOptions.push(<option key="0" value="没有权限数据" >没有权限数据</option>);
            }
            
            this.setState({
                authorityId: authorityId,
                authorityArr: authoritySelectOptions
            });
        }
    }
    handleChangeCompany(ev){
        this.setState({
            companyId:this.refs.companyId.value
        },function(){
            this.setAuthoritySelect();
        }.bind(this));
        
    }
    handleCancel(){
        hashHistory.goBack();
    }
    getPager(){

    }
    render() {
        return  <div className="user-new">
                    <div className="content-title user-title">
                        <h1 className="f16">{this.props.params.id === "new" ? "新增用户" : "编辑用户"}</h1>
                    </div>
                    <div className="content-form user-new-form">
                        <div>
                            <label className="f14">公司名称：</label>
                            <select ref="companyId" value={this.state.companyId} onChange={this.handleChangeCompany.bind(this)}>
                                {this.state.companyArr}
                            </select>
                        </div>
                        <div>
                            <label  className="f14">权限名称：</label>
                            <select ref="authorityId" defaultValue={this.state.authorityId}>
                                {this.state.authorityArr}
                            </select>
                        </div>
                        <div>
                            <label className="f14">用户名称：</label>
                            <input type="text" ref="userName" defaultValue={this.state.userName} placeholder="中文字母数字下划线，不能为空，不能超过50个字符" maxLength="50" />
                        </div>
                        <div>
                            <label className="f14">登陆用户名称：</label>
                            <input type="text" ref="loginName" defaultValue={this.state.loginName} placeholder="字母数字下划线，不能为空，不能超过50个字符" maxLength="50" />
                        </div>
                        <div>
                            <label className="f14">用户密码：</label>
                            <input type="text" ref="password" defaultValue={this.state.password}  placeholder="用户密码不能为空，6-20位，只能输入字母、数字和符号，明文显示" maxLength="20" minLength="6" />
                        </div>
                        <div>
                            <label className="f14">联系手机：</label>
                            <input type="text" defaultValue={this.state.telephone} ref="userTel" placeholder="请输入手机号码" />
                        </div>
                        <div>
                            <label  className="f14">使用状态：</label>
                            <select ref="status" defaultValue={this.state.status}>
                                <option value="1">正常</option>
                                <option value="0">停用</option>
                            </select>
                        </div>
                        {
                            <div className={this.state.ajaxErrorTips? "error-tips opin" : "error-tips op0"}>
                                <p>{this.state.ajaxErrorTips}</p>
                            </div>
                        }
                        <div>
                            <span className="f14 save" onClick={this.handleSave.bind(this)}>保存</span>
                            <span className="f14 cancel" onClick={this.handleCancel.bind(this)}>取消</span>
                        </div>
                    </div>
                    {
                        this.state.SureAutoCloseTipsShow && <SureAutoCloseTips tips="保存成功" />        
                    }
                </div>;
    }
}
