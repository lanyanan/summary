import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Header,Menu,Pager,SureAutoCloseTips,Dialog,DeleteTips} from '../modules/Common/Common.es6';
import Funs from '../../libs/fun.js';
var {Router, Route, hashHistory,Link} = ReactRouter;

export class Area extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
     
    }
    render() {
        return  <div>
                    <Header />
                    <div className="wrap">
                        <Menu />
                        <div className="content area">
                            {this.props.children}
                        </div>
                    </div>
                </div>;
    }
}

export class AreaInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let pageIndex = this.props.params.id ? this.props.params.id : 1;
        Actions.initData();
        Actions.getRegionPageList(pageIndex,10);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            let pager = this.state.pager;
            pager.pageIndex = nextProps.params.id;
            this.setState({pager:pager,ajaxLoad: false},()=>{
                Actions.getRegionPageList(nextProps.params.id,10);
            });
        }
        
    }
    handleDeleteArea(id,regionId){
        this.setState({
            showDialog: true,
            deleteAreaIndex: id,
            deleteAreaId:regionId,
        });
    }
    handleTipsDeleteArea(){
        this.state.area.areaInfo.splice(this.state.deleteAreaIndex,1); 
        Actions.deleteRegion(this.state.deleteAreaId);
        this.handleTipsCloseDialog();
    }
    handleTipsCancelArea(){
        this.handleTipsCloseDialog();
    }
    handleTipsCloseDialog(){
        this.setState({
            showDialog: false
        });
    }
    getPager(pageIndex){
        window.location = "#/area/areainfo/" + pageIndex;
        let pager = this.state.pager;
        pager.pageIndex = pageIndex;
        this.setState({pager: pager,ajaxLoad: false},()=>{
            
        });
    }
    render() {
        let areaObj = this.state.area;
        let ajaxError = this.state.ajaxError;
        let ajaxErrorTips = this.state.ajaxErrorTips;
        let ajaxLoad = this.state.ajaxLoad;
        let content = <tr className="ajax-loading"><td  colSpan='8' height="200"><em className='ajax-loading-img'></em></td></tr>; 
        if(ajaxError){
            content = <tr><td colSpan="8">{ajaxErrorTips}</td></tr>;
        }

        if(areaObj&&areaObj.areaInfo){
            if(!areaObj.areaInfo.length){
                content = <tr><td colSpan="8">暂无数据</td></tr>
            }else{
                content = areaObj.areaInfo.map((item,index) => {
                            let t = item.modifyTime ? item.modifyTime : item.createTime;
                            return  <tr key={index}>
                                        <td width="40">&nbsp;</td>
                                        <td>{index + 1}</td>
                                        <td>{item.regionId}</td>
                                        <td>{item.regionName}</td>
                                        <td>{item.companyName}</td>
                                        <td>{item.status==1?'正常':'停用'}</td>
                                        <td>{Funs.dateFormat(t,"yyyy-MM-dd hh:mm:ss", true)}</td>
                                        <td>
                                            <Link to={{pathname: "/area/edit/" + item.regionId, query:{companyName: encodeURIComponent(item.companyName),areaName: encodeURIComponent(item.regionName),status: item.status}}}  className="f14 edit">编辑</Link>
                                            <Link to={"/area/layout/" + item.regionId} className="f14 layout">布局</Link>
                                            <a href="javascript:;" onClick={this.handleDeleteArea.bind(this,index,item.regionId)} className="f14 delete">删除</a>
                                        </td>
                                    </tr>
                        })
            }
        }

        if(!ajaxLoad){
            content = <tr className="ajax-loading"><td  colSpan='8' height="200"><em className='ajax-loading-img'></em></td></tr>; 
        }

        return  <div className="company-management">
                    <div className="content-title company-title">
                        <h1 className="f16">区域管理</h1>
                        <Link to="/area/edit/new" className="f14" >+&nbsp;新建区域</Link>
                    </div>
                    <div className="content-table company-table">
                        <table>
                            <thead>
                                 <tr>
                                    <th width="40">&nbsp;</th>
                                    <th>编号</th>
                                    <th>区域ID</th>
                                    <th>区域名称</th>
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
                        this.state.showDialog  && <Dialog classes="delete-conform" titlees="删除区域" handleCloseDialog={this.handleTipsCloseDialog.bind(this)}>
                                                    <DeleteTips handleCancel={this.handleTipsCancelArea.bind(this)} handleDelete={this.handleTipsDeleteArea.bind(this)} />
                                                </Dialog>
                    }
                    {
                        this.state.pager&&<Pager pager={this.state.pager} getPager={this.getPager.bind(this)}/>
                    }
                </div>;
    }
}

export class EditArea extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ajaxErrorTips: false,
            SureAutoCloseTipsShow: false,
            companyName: decodeURIComponent(this.props.location.query.companyName ? this.props.location.query.companyName : ""),
            areaName: decodeURIComponent(this.props.location.query.areaName ? this.props.location.query.areaName : ""),
            status: decodeURIComponent(this.props.location.query.status ? this.props.location.query.status : ""),
        };
        this.listenStore(Store);
    }
    componentDidMount() {
        Actions.initData();
        Actions.getCompanyList();
    }
    componentWillReceiveProps(){

    }
    handleSave(){
        let companyId = this.refs.companyId.value;
        let areaName = this.refs.areaName.value;
        let status = this.refs.status.value;
        

        this.setState({
            ajaxErrorTips: false
        });
        let timeer = setTimeout(function(){
            if(!/^[\u4e00-\u9fa50-9a-zA-Z_]{1,50}$/.test(areaName)){
                this.setState({
                    ajaxErrorTips: "区域名称为中文字母数字下划线，不能为空，不能超过50个字符"
                });
                return false;
            }

            if(this.props.params.id === "new"){
                Actions.addRegion(companyId,areaName,status);
            }else{
                Actions.updateRegion(this.props.params.id,companyId,areaName,status);
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
        return  <div className="area-new">
                    <div className="content-title area-title">
                        <h1 className="f16">{ this.props.params.id === "new" ? "新建区域" : "编辑区域"}</h1>
                    </div>
                    <div className="content-form area-new-form">
                        <div>
                            <label className="f14">公司名称：</label>
                            {companySelect}
                        </div>
                        <div>
                            <label className="f14">区域名称：</label>
                            <input type="text" ref="areaName" defaultValue={this.state.areaName ? this.state.areaName : ""} maxLength="50" placeholder="中文字母数字下划线，不能为空，不能超过50个字符" />
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