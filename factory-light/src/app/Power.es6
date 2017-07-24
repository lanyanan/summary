import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Header,Menu,Pager,SureAutoCloseTips,Dialog,DeleteTips} from '../modules/Common/Common.es6';
import Funs from '../../libs/fun.js';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class Power extends BaseComponent {
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

export class PowerInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store); 
    }
    componentDidMount() {
        Actions.initData();
        let pageIndex = this.props.params.id ? this.props.params.id : 1;
        Actions.getAuthorityPageList(pageIndex,10);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            let pager = this.state.pager;
            pager.pageIndex = nextProps.params.id;
            this.setState({pager:pager,ajaxLoad: false},()=>{
                Actions.getAuthorityPageList(nextProps.params.id,10);
            });
        }
    }
    handleDeleteAuthority(id,authorityId){
        this.setState({
            showDialog: true,
            deleteAuthorityIndex: id,
            deleteAuthorityId:authorityId,
        });
    }
    handleTipsDeleteAuthority(){
        this.state.authority.authorityInfo.splice(this.state.deleteAuthorityIndex,1); 
        Actions.deleteAuthority(this.state.deleteAuthorityId);
        this.handleTipsCloseDialog();
    }
    handleTipsCancelAuthority(){
        this.handleTipsCloseDialog();
    }
    handleTipsCloseDialog(){
        this.setState({
            showDialog: false
        });
    }
    getPager(pageIndex){
        window.location = "#/power/powerinfo/" + pageIndex;
        let pager = this.state.pager;
        pager.pageIndex = pageIndex;
        this.setState({pager: pager,ajaxLoad: false},()=>{
            
        });
    }
    render() {
        let authorityObj = this.state.authority;
        let ajaxError = this.state.ajaxError;
        let ajaxErrorTips = this.state.ajaxErrorTips;
        let ajaxLoad = this.state.ajaxLoad;
        let content = <tr className="ajax-loading"><td  colSpan='7' height="200"><em className='ajax-loading-img'></em></td></tr>;
        if(ajaxError){
            content = <tr><td colSpan="7">{ajaxErrorTips}</td></tr>;
        }
        if(authorityObj&&authorityObj.authorityInfo){
            if(!authorityObj.authorityInfo.length){
                content = <tr><td colSpan="7">暂无数据</td></tr>
            }else{
                content = authorityObj.authorityInfo.map((item,index) => {
                            let t = item.modifyTime ? item.modifyTime : item.createTime;
                            return  <tr key={index}>
                                        <td width="40">&nbsp;</td>
                                        <td>{index+1}</td>
                                        <td>{item.authorityId}</td>
                                        <td>{item.authorityName}</td>
                                        <td>{item.companyName}</td>
                                        <td>{parseInt(item.status) ? "正常" : "停用"}</td>
                                        <td>{Funs.dateFormat(t,"yyyy-MM-dd hh:mm:ss", true)}</td>
                                        <td>
                                            <Link to={{pathname: "/power/edit/" + item.authorityId, query:{companyName: encodeURIComponent(item.companyName),authorityName: encodeURIComponent(item.authorityName),status: item.status}}} className="f14 edit">编辑</Link>
                                            <a href="javascript:;" onClick={this.handleDeleteAuthority.bind(this,index,item.authorityId)} className="f14 delete">删除</a>
                                        </td>
                                    </tr>
                        }) 
            }
        }

        if(!ajaxLoad){
            content = <tr className="ajax-loading"><td  colSpan='7' height="200"><em className='ajax-loading-img'></em></td></tr>;
        }

        return  <div className="authority-management">
                    <div className="content-title authority-title">
                        <h1 className="f16">权限管理</h1>
                        <Link to="/power/edit/new" className="f14" >+&nbsp;新增权限</Link>
                    </div>
                    <div className="content-table authority-table">
                        <table>
                            <thead>
                                 <tr>
                                    <th width="40">&nbsp;</th>
                                    <th>编号</th>
                                    <th>权限ID</th>
                                    <th>权限名称</th>
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
                        this.state.showDialog  && <Dialog classes="delete-conform" titlees="删除权限" handleCloseDialog={this.handleTipsCloseDialog.bind(this)}>
                                                    <DeleteTips handleCancel={this.handleTipsCancelAuthority.bind(this)} handleDelete={this.handleTipsDeleteAuthority.bind(this)} />
                                                </Dialog>
                    }
                    {
                        this.state.pager&&<Pager pager={this.state.pager} getPager={this.getPager.bind(this)}/>
                    }
                </div>;
    }
}

export class EditPower extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            SureAutoCloseTipsShow: false,
            companyName: decodeURIComponent(this.props.location.query.companyName ? this.props.location.query.companyName : ""),
            authorityName: decodeURIComponent(this.props.location.query.authorityName ? this.props.location.query.authorityName : ""),
            status: decodeURIComponent(this.props.location.query.status ? this.props.location.query.status : ""),
        };
        this.listenStore(Store); 
    }
    componentDidMount() {
        Actions.initData();  
        Actions.getCompanyList();
    }
    handleSave(){
        let companyId = this.refs.companyId.value;
        let authorityName = this.refs.authorityName.value;
        let status = this.refs.status.value;
        
        this.setState({
            ajaxErrorTips: false
        });
        let timeer = setTimeout(function(){
            if(!/^[\u4e00-\u9fa50-9a-zA-Z_]{1,50}$/.test(authorityName)){
                this.setState({
                    ajaxErrorTips: "权限名称为中文字母数字下划线，不能为空，不能超过50个字符"
                });
                return false;
            }

            if(this.props.params.id === "new"){
                Actions.addAuthority(companyId,authorityName,status);
            }else{
                Actions.updateAuthority(this.props.params.id,companyId,authorityName,status);
            }

            clearTimeout(timeer);
        }.bind(this),0);


    }
    handleCancel(){
        hashHistory.goBack();
    }
    render() {
        let companyObj = this.state.company;
        let companySelect = "";
        let companyName = this.state.companyName;
        let companyId = "";
        if(companyObj&&companyObj.companyInfo){
            companyObj.companyInfo.forEach((item,index) => {
                if(item.companyName === companyName){
                    companyId = item.companyId;
                    return;
                }
            });

            let companySelectOptions = companyObj.companyInfo.map((item,index) => {
                return  <option key={index} value={item.companyId}>{item.companyName}</option>    
            });
            companySelect = <select ref="companyId" defaultValue={companyId}>
                                {companySelectOptions}
                            </select>
        }
        return  <div className="authority-new">
                    <div className="content-title authority-title">
                        <h1 className="f16">{this.props.params.id === "new" ? "新建权限" : "编辑权限"}</h1>
                    </div>
                    <div className="content-form authority-new-form">
                        <div>
                            <label className="f14">公司名称：</label>
                            {companySelect}
                        </div>
                        <div>
                            <label className="f14">权限名称：</label>
                            <input type="text" ref="authorityName" defaultValue={this.state.authorityName} placeholder="中文字母数字下划线，不能为空，不能超过50个字符" />
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