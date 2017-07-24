import {BaseComponent} from '../../../libs/BaseComponent.class.es6';
import {Actions} from '../../app/Actions.es6';
import {Store} from '../../app/Store.es6';
import Funs from '../../../libs/fun.js';


var {Router, Route, hashHistory,Link} = ReactRouter;

export class Header extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store);
    }
    componentDidMount() {

    }
    handleLogOut(){
        Actions.logout();
    }
    render() {
        let loginName = Funs.getCookie("loginName");
        if(!loginName){
            window.location = "#/";
        }
        return  <div className="header">
                    <div className="header-content">
                        <a className="fl f16" href="#" alt="开放服务平台">开放服务平台</a>
                        <div className="fr user-box">
                            <span className="user-avatar"></span>
                            <span className="user-name" f16>{loginName}</span>
                            <em className="f16" onClick={this.handleLogOut}>退出</em>
                        </div>
                    </div>
                </div>
    }
}

export const MENUDATA = ["公司管理","区域管理","控制器管理","权限管理","用户管理"];
export const MENUROUTER = ["company/companyinfo/1","area/areainfo/1","controller/1","power/powerinfo/1","user/userinfo/1"];
export class Menu extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
          hash: window.location.hash.match(/[^#\/\?]+/)[0],
          localHash: window.location.hash.match(/\w+\/*\w+/)[0],
        };
    }
    componentDidMount() {
    }
    render() {
        return  <div className="menu">
                    <ul>
                        {   
                            MENUDATA.map((item,index) => {
                                if(this.state.hash === MENUROUTER[index].match(/\w+/).join("")){
                                    return <li key={index} ><Link to={MENUROUTER[index]} className="f14 active">{item}</Link></li>
                                }else{
                                    return <li key={index} ><Link to={MENUROUTER[index]} className="f14">{item}</Link></li>
                                }
                            })
                        }
                    </ul>
                </div>
    }
}


export class Login extends BaseComponent{
    constructor(props){
        super(props);
    }
    render(){
        return  <div>
                    <div className="row-fluid login-wrapper">
                        <a href="#" >
                            <img className="logo" src="static/img/logo1.png" />
                        </a>

                        <div className="span4 box">
                            <div className="content-wrap">
                                <h6>Log in</h6>
                                <input className="span12"  type="text" placeholder="Your account" />
                                <input className="span12"  type="password" placeholder="Your password" />
                                <a className="btn-glow primary login">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
    }
} 

export class Dialog extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    handleCloseDialog(){
        if(this.props.handleCloseDialog){
            this.props.handleCloseDialog();
        }
    }
    render(){
        let classes = this.props.classes ? this.props.classes : "";
        let style = {
            
        }
        let titlees = this.props.titlees;
        let msg = this.props.msg ? this.props.msg : true;
        return  <div className={classes}>
                    {
                        msg && <div className="dialog-msg"></div>
                    }
                    <div className="dialog-wrapper" style={style}>
                        <div className="dialog-header">
                            <h2>{titlees}</h2>
                            <a href="javascript:void(0)" title="关闭" className="dialog-btn-close" onClick={this.handleCloseDialog.bind(this)}></a>
                        </div>
                        <div className="dialog-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                
    }
}

export class DeleteTips extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    handleDelete(){
        this.props.handleDelete();
    }
    handleCancel(){
        this.props.handleCancel();
    }
    render(){
        
        return  <div className="delete-tips">
                    <p className="f16">您确定要删除吗</p>
                    <div>
                        <span className="delete" onClick={this.handleDelete.bind(this)}>确定</span>
                        <span className="cancel" onClick={this.handleCancel.bind(this)}>取消</span>
                    </div>
                </div>
                
    }
}

export class SureAutoCloseTips extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            show: true
        }
    }
    componentDidMount() {
        let timer = setTimeout(function(){
            this.setState({
                show: false
            });
            timer = null;
        }.bind(this),900);
    }
    render(){
        let tips = this.props.tips ? this.props.tips : "成功";
        return  <div className={this.state.show ? "" : "none"}>
                    <div className="sure-auto-close-tips">
                        <p>{tips}</p>
                    </div>
                </div>
                
    }
}
// 分页组件

function validateInput(val,totalPages,currentPage){
    var reg = /^[1-9]\d*$/;
    if(!(val && reg.test(val))){
        return false;
    }else{
        if(val <= totalPages && val != currentPage){
            return true;
        }else{
            return false;
        }
    }
};

var FirstPageAbled = React.createClass({  // 首页,可以点击
    render: function(){
        return (
            <input type="button" className="icon-first" value="首页"  onClick={this.props.getPager.bind(this,1)} />
        );
    }
});
var FirstPageDisabled = React.createClass({  // 首页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-first" value="首页" disabled="disabled" />
        );
    }
});
var LastPageAbled = React.createClass({  // 尾页,可以点击
    render: function(){
        var totalPages = this.props.totalPages;
        return (
            <input type="button" className="icon-last" value="尾页" onClick={this.props.getPager.bind(this,totalPages)} />
        );
    }
});
var LastPageDisabled = React.createClass({  // 尾页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-last" value="尾页" disabled="disabled" />
        );
    }
});
var BtnPrevAbled = React.createClass({  // 上一页,可以点击
    render: function(){
        var pageindex = this.props.pageIndex-1;
        return (
            <input type="button" className="icon-chevron-thin-left" value="&lt;" onClick={this.props.getPager.bind(this,pageindex)} />
        );
    }
});
var BtnPrevDisabled = React.createClass({  // 上一页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-chevron-thin-left" value="&lt;" disabled="disabled" />
        );
    }
});
var BtnNextAbled = React.createClass({  // 下一页,可以点击
    render: function(){
        var pageindex = this.props.pageIndex + 1;
        return (
            <input type="button" className="icon-chevron-thin-right" value="&gt;" onClick={this.props.getPager.bind(this,pageindex)} />
        );
    }
});
var BtnNextDisabled = React.createClass({  // 下一页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-chevron-thin-right" value="&gt;" disabled="disabled" />
        );
    }
});
var PageIndex = React.createClass({  // 页面索引
    getPager(i){
        this.props.getPager(i);
    },
    componentDidMount(){},
    render: function(){
        var totalPages = this.props.pager.totalPages;
        var pageIndex = this.props.pager.pageIndex;
        var paging = {
            showSize: 6,
            startIndex: 0,
            endIndex: totalPages
        };
        var index=[]; 
        if(totalPages>paging.showSize){
            paging.startIndex = pageIndex-1;
            paging.endIndex = pageIndex+paging.showSize-1;
            if(paging.endIndex>totalPages){
                paging.startIndex = totalPages - paging.showSize;
                paging.endIndex = totalPages;
            }
        }
        
        for(var i=paging.startIndex; i<paging.endIndex;i++){
           if(i==pageIndex-1){
               index.push(<span className="curPage" key={i} id="currentPage">{pageIndex}</span>); 
           }else{
               index.push(<a href="javascript:void(0)" key={i} onClick={this.getPager.bind(this,i+1)}>{i+1}</a>); 
           }  
        }                    
        return (
            <span>{index}</span>
        );
    }
});
var PageJump = React.createClass({  // 页面跳转
    handleClick: function(){  
        var inputPageIndex = this.refs.inputPageIndex;    
        var val = inputPageIndex.value&&inputPageIndex.value.match(/[^\s]+/g).join("");
        if(validateInput(val,this.props.pager.totalPages,this.props.pager.pageIndex)){
            this.props.getPager(val);
        }else{
            inputPageIndex.style.borderColor = "red";
            inputPageIndex.focus();
        }        
    },
    handleChange: function(e){
        var target = e.target;
        var val = target.value&&target.value.match(/[^\s]+/g).join("");
        if(validateInput(val,this.props.pager.totalPages,this.props.pager.pageIndex)){
            target.style.borderColor = "#d8d8d8";
        }else{
            target.style.borderColor = "red";
        } 
    },
    handleBlur: function(e){
        var target = e.target;
        var val = target.value&&target.value.match(/[^\s]+/g).join("");
        if(!val){
            target.style.borderColor = '#d8d8d8';
        }
    },
    render: function(){
        return (
            <span className="jump">共<em id="totalPages">{this.props.pager.totalPages}</em>页，到第<input type="text" maxLength="5" ref="inputPageIndex" id="input-pageIndex" onChange={this.handleChange} onBlur={this.handleBlur} />页<input type="button" value="确定" className="btn-jump" onClick={this.handleClick} /></span>
        );
    }
});
export const Pager = React.createClass({
    render: function(){
        var isBtnPrev,isBtnNext,isFirstPage,isLastPage;
        if(this.props.pager.hasPrevPage) {
           isBtnPrev = <BtnPrevAbled pageIndex={this.props.pager.pageIndex} getPager={this.props.getPager} /> 
           isFirstPage = <FirstPageAbled getPager={this.props.getPager} />
        }else{
           isBtnPrev = <BtnPrevDisabled /> 
           isFirstPage = <FirstPageDisabled />
        }
        if(this.props.pager.hasNextPage) {
           isBtnNext = <BtnNextAbled pageIndex={this.props.pager.pageIndex} getPager={this.props.getPager} /> 
           isLastPage = <LastPageAbled totalPages={this.props.pager.totalPages} getPager={this.props.getPager} />
        }else{
           isBtnNext = <BtnNextDisabled /> 
           isLastPage = <LastPageDisabled />
        }
        return (
            <div className="manage-paging"> 
               {isFirstPage}
               {isBtnPrev}                  
               <PageIndex pager={this.props.pager} getPager={this.props.getPager} />
               {isBtnNext}
               {isLastPage}
               <PageJump pager={this.props.pager} getPager={this.props.getPager} />
            </div>
        );
    }
});
