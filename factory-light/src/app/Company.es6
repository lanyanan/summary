import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Header,Menu,Pager,Dialog,DeleteTips,SureAutoCloseTips} from '../modules/Common/Common.es6';
import Funs from '../../libs/fun.js';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class Company extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.listenStore(Store); 
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

export class CompanyInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
        };
        this.listenStore(Store); 
    }
    componentWillMount(){
        Actions.initData();
        let pageIndex = this.props.params.id ? this.props.params.id : 1;
        Actions.getCompanyPageList(pageIndex,10); 
    }  
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            let pager = this.state.pager;
            pager.pageIndex = nextProps.params.id;
            this.setState({pager:pager,ajaxLoad: false},()=>{
                Actions.getCompanyPageList(nextProps.params.id,10);
            });
        }
    }
    handleDeleteCompany(i,companyId){
        this.setState({
            showDialog: true,
            deleteCompanyIndex: i,
            deleteCompanyId:companyId,
        });
        
    }
    handleTipsDeleteCompany(){
        this.state.company.companyInfo.splice(this.state.deleteCompanyIndex,1); 
        Actions.deleteCompany(this.state.deleteCompanyId);
        this.handleTipsCloseDialog();
    }
    handleTipsCancelCompany(){
        this.handleTipsCloseDialog();
    }
    handleTipsCloseDialog(){
        this.setState({
            showDialog: false
        });
    }
    getPager(pageIndex){
        window.location = "#/company/companyinfo/" + pageIndex;
        let pager = this.state.pager;
        pager.pageIndex = pageIndex;
        this.setState({pager: pager,ajaxLoad: false},()=>{
            
        });
    }
    render() {
        let companyObj = this.state.company;
        let ajaxError = this.state.ajaxError;
        let ajaxErrorTips = this.state.ajaxErrorTips;
        let ajaxLoad = this.state.ajaxLoad;
        let content = <tr className="ajax-loading"><td  colSpan='7' height="200"><em className='ajax-loading-img'></em></td></tr>; //默认loading
        if(ajaxError){
            content = <tr><td colSpan="7">{ajaxErrorTips}</td></tr>;
        }

        if(companyObj && companyObj.companyInfo){
            if(!companyObj.companyInfo.length){
                content = <tr><td colSpan="7">暂无数据</td></tr>
            }else{
                content = companyObj.companyInfo.map((item,index) => {
                            let t = item.modifyTime ? item.modifyTime : item.createTime;
                            
                            return  <tr key={index}>
                                        <td width="40">&nbsp;</td>
                                        <td>{index+1}</td>
                                        <td>{item.companyId}</td>
                                        <td>{item.companyName}</td>
                                        <td>{parseInt(item.status) ? "正常" : "停用"}</td>
                                        <td>{Funs.dateFormat(t,"yyyy-MM-dd hh:mm:ss", true)}</td>
                                        <td>
                                            <Link to={{pathname: "/company/edit/" + item.companyId, query:{company: encodeURIComponent(item.companyName),status: item.status}}} className="f14 edit">编辑</Link>
                                            <a href="javascript:;" onClick={this.handleDeleteCompany.bind(this,index,item.companyId)} className="f14 delete">删除</a>
                                        </td>
                                    </tr>
                        })
            }
        }
        if(!ajaxLoad){
            content = <tr className="ajax-loading"><td  colSpan='7' height="200"><em className='ajax-loading-img'></em></td></tr>; //默认loading
        }
        return  <div className="company-management">
                    <div className="content-title company-title">
                        <h1 className="f16">公司管理</h1>
                        <Link to="/company/edit/new" className="f14" >+&nbsp;新建公司</Link>
                    </div>
                    <div className="content-table company-table">
                        <table>
                            <thead>
                                 <tr>
                                    <th width="40">&nbsp;</th>
                                    <th>编号</th>
                                    <th>公司ID</th>
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
                        this.state.showDialog  && <Dialog classes="delete-conform" titlees="删除公司" handleCloseDialog={this.handleTipsCloseDialog.bind(this)}>
                                                    <DeleteTips handleCancel={this.handleTipsCancelCompany.bind(this)} handleDelete={this.handleTipsDeleteCompany.bind(this)} />
                                                </Dialog>
                    }
                    {
                        this.state.pager&&<Pager pager={this.state.pager} getPager={this.getPager.bind(this)}/>
                    }
                </div>;
    }
}

export class EditCompany extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            companyName: decodeURIComponent(this.props.location.query.company ? this.props.location.query.company : ""),
            status: decodeURIComponent(this.props.location.query.status ? this.props.location.query.status : ""),
            defultAllStatus: ["0","1"],
            companyNameTips: "账户名不超过16个字符"
        };
        this.listenStore(Store); 
    }
    componentWillMount(){
       
    } 
    componentDidMount() {
        Actions.initData(); 
    }
    handleSave(){
        let companyName = this.refs.companyName.value;
        let status = this.refs.status.value;
        this.setState({
            ajaxErrorTips: false
        });
        let timeer = setTimeout(function(){
            if(!/^[\u4e00-\u9fa50-9a-zA-Z_]{1,50}$/.test(companyName)){
                this.setState({
                    ajaxErrorTips: "公司名称为中文字母数字下划线，不能为空，不能超过50个字符"
                });
                return false;
            }
            if(this.props.params.id === "new"){
                Actions.addCompany(companyName,status);
            }else{
                Actions.updateCompany(this.props.params.id,companyName,status);
            }
            clearTimeout(timeer);
        }.bind(this),0);

        
    }
    handleCancel(){
        hashHistory.goBack();
    }
    render() {
        return  <div className="company-new">
                    <div className="content-title company-title">
                        <h1 className="f16">{this.props.params.id === "new" ? "新增公司" : "编辑公司"}</h1>
                    </div>
                    <div className="content-form company-new-form">
                        <div>
                            <label className="f14">公司名称：</label>
                            <input type="text" placeholder="中文字母数字下划线，不能为空，不能超过50个字符" defaultValue={this.state.companyName ? this.state.companyName : ""} ref="companyName" maxLength="50"/>
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


