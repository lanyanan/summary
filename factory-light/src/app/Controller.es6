import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Header,Menu,Pager} from '../modules/Common/Common.es6';
import Funs from '../../libs/fun.js';
var {Router, Route, hashHistory,Link} = ReactRouter;

export class Controller extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.initData();
        let pageIndex = this.props.params.id ? this.props.params.id : 1;
        Actions.getPageController(pageIndex,10);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id !== this.props.params.id){
            let pager = this.state.pager;
            pager.pageIndex = nextProps.params.id;
            this.setState({pager:pager,ajaxLoad: false},()=>{
                Actions.getPageController(nextProps.params.id,10);
            });
        }
        
    }
    getPager(pageIndex){
        window.location = "#/controller/" + pageIndex;
        let pager = this.state.pager;
        pager.pageIndex = pageIndex;
        this.setState({pager: pager,ajaxLoad: false},()=>{
            
        });
    }
    render() {
        let controllerObj = this.state.controller;
        let ajaxError = this.state.ajaxError;
        let ajaxErrorTips = this.state.ajaxErrorTips;
        let ajaxLoad = this.state.ajaxLoad;
        let content = <tr className="ajax-loading"><td  colSpan='9' height="200"><em className='ajax-loading-img'></em></td></tr>; 
        if(ajaxError){
            content = <tr><td colSpan="9">{ajaxErrorTips}</td></tr>;
        }
        if(controllerObj&&controllerObj.controllerInfo){
            if(!controllerObj.controllerInfo.length){
                content = <tr><td colSpan="9">暂无数据</td></tr>
            }else{
                content = controllerObj.controllerInfo.map((item,index) => {
                            return  <tr key={index}>
                                        <td width="40">&nbsp;</td>
                                        <td>{index + 1}</td>
                                        <td>{item.deviceId}</td>
                                        <td>{item.macAddress}</td>
                                        <td>{item.deviceName}</td>
                                        <td>{item.regionName}</td>
                                        <td>{item.companyName}</td>
                                        <td>{item.status==1?'设备在线':'设备离线'}</td>
                                        <td>{Funs.dateFormat(item.bindTime,"yyyy-MM-dd hh:mm:ss", true)}</td>
                                    </tr>
                        })
            }
        }

        if(!ajaxLoad){
            content = <tr className="ajax-loading"><td  colSpan='9' height="200"><em className='ajax-loading-img'></em></td></tr>;
        }
        return  <div>
                    <Header />
                    <div className="wrap">
                        <Menu />
                        <div className="content controller">
                            <div className="content-title controller-title">
                                <h1 className="f16">控制器管理</h1>
                            </div>
                            <div className="content-table controller-table">
                                <table>
                                    <thead>
                                         <tr>
                                            <th width="40">&nbsp;</th>
                                            <th>编号</th>
                                            <th>控制器ID</th>
                                            <th>Mac地址</th>
                                            <th>控制器名称</th>
                                            <th>区域名称</th>
                                            <th>公司名称</th>
                                            <th>状态</th>
                                            <th>绑定时间</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {content}
                                    </tbody>
                                </table>
                            </div>
                            {
                                this.state.pager&&<Pager pager={this.state.pager} getPager={this.getPager.bind(this)}/>
                            }
                        </div>
                    </div>
                </div>;
    }
}