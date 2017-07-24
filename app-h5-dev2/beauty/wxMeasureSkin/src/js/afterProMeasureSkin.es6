import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

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

/**
 * 部位id--name
 * @param    {String}      部位id
 */
 function proPart(partId){
    let val = '';
    switch(partId){
        case 6:
            val = '脸部';break;
        case 2:
            val = '眼周';break;
        case 3:
            val = '手部';break;
    }
    return val;
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

function getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let hash = window.location.hash;
     let r = hash.substr(hash.indexOf('?')+1).match(reg);
     if(r!=null) return decodeURI(r[2]);
     return '';
}

// 创建React组件
// /:part/:productId/:lastPartMeasureId/:beforeWater/:beforeOil/:beforeElasticity
export class AfterProMeasureSkin extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            part:parseInt(this.props.params.part) || '',
            productId:parseInt(this.props.params.productId) || '',
            lastPartMeasureId:parseInt(this.props.params.lastPartMeasureId) || '',
            beforeWater:parseFloat(this.props.params.beforeWater) || 1,
            beforeOil:parseFloat(this.props.params.beforeOil) || 1,
            beforeElasticity:parseFloat(this.props.params.beforeElasticity) || 1,
            status:2,
            btnStatus:false
        };
        het.setTitle('护肤品测试'); 
        setDocumentTitle('护肤品测试');
        this.listenStore(Store); // 监听Store
        Actions.clearTest(this.state.part);
        Actions.deviceInfo();
        setTimeout(function(){
            Actions.setPart(this.state.part,this.state.productId,'qrcode',this.state.lastPartMeasureId);
        }.bind(this),1000);
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        clearInterval(window.deviceTimer);
        clearInterval(window.dataTimer);
    }
    reTest(e) {
        let status = parseInt(this.state.status);
        if(status != 5 && !this.state.btnStatus){
            e.preventDefault();
            return;
        }
        e.preventDefault();
        this.setState({
            status:2,
            water:0,
            oil:0,
            elasticity:0,
            qrUrl:'',
            skinTypeName:'',
            btnStatus:false
        });
        Actions.setPart(this.state.part,this.state.productId,'qrcode',this.state.lastPartMeasureId);
    }
    analysis(e) {
        e.preventDefault();
        let analysis = ReactDOM.findDOMNode(this.refs.analysis);
        analysis.click();
    }
    render() {
        console.log('最终数据:',JSON.stringify(this.state));
        //data-status 1:请选择部位 2:设备初始化 3:请将设备贴近部位 4:正在测试 5:展示测试结果
        let part = this.state.part;
        let status = this.state.status;
        let btnStatus = this.state.btnStatus;
        let lowBattry = '';
        let outline = '';
        if(this.state.onlineStatus == 2){
            outline = (<div className="outline">
                        <img src="../static/img/outline.png" />
                        <p>设备不在线</p>
                        <p>请开启设备并确保网络连接正常</p>
                       </div>);
        }
        if(this.state.electricity && this.state.electricity<=3 && !outline){
            lowBattry = <p className="pro-low-battery"><img src="../static/img/power.png" />设备电量低，请及时充电</p>;
        }
        return (
            <div className="padding50">
                {/*设备测试失败*/}
                <section className="pro-measure-status" data-status={0} style={{display:status == 0?'':'none'}}>
                    <span>测试失败，请重新测试</span>
                    {lowBattry}
                </section>
                {/*设备初始化失败*/}
                <section className="pro-measure-status" data-status={1} style={{display:status == 1?'':'none'}}>
                    <span>设备初始化失败，请重新测试</span>
                    {lowBattry}
                </section>
                {/*设备初始化*/}
                <section className="pro-measure-status" data-status={2} style={{display:status == 2?'':'none'}}>
                    <img className="init" src="../static/img/init.png" />
                    <span>设备初始化中...</span>
                    {lowBattry}
                </section>
                {/*请将设备贴近部位*/}
                <section className="pro-measure-status" data-status={3} style={{display:status == 3?'':'none'}}>
                    <span>护肤完成后</span>
                    <span>{'请将设备贴近'+proPart(part)}</span>
                    {lowBattry}
                </section>
                {/*正在测试*/}
                <section className="pro-measure-status" data-status={4} style={{display:status == 4?'':'none'}}>
                    <div className="measuring"></div>
                    <span>{'正在测试'+proPart(part)}</span>
                    {lowBattry}
                </section>
                {/*测试结果*/}
                <section className="pro-measure-result" data-status={5} style={{display:status == 5?'':'none'}}>
                    <section className="r-top">
                        <h3>{'护肤后'+proPart(part)+'的肤质为'}</h3>
                        <h2>{this.state.skinTypeName}</h2>
                    </section>
                    <section className="r-middle">
                        <figure className="woe-data">
                            <h5 className="item water-item">水份<b>{this.state.water}</b><span>%</span></h5>
                            <p className="flex desc">
                                <span className="w40 tac">缺水</span>
                                <span className="w20 tac">正常</span>
                                <span className="w40 tac">湿润</span>
                            </p>
                            <p className="flex colorful water-color">
                                <i className="w40"></i><i className="w20"></i><i className="w40"></i>
                                <b style={{left:(this.state.water+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'1.4rem'}}>40%</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.8rem'}}>60%</span>
                                <span className="flex-cell tar">99.9%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item oil-item">油份<b>{this.state.oil}</b><span>%</span></h5>
                            <p className="flex desc">
                                <span className="w15 tac">缺油</span>
                                <span className="w10 tac">正常</span>
                                <span className="w75 tac">偏油</span>
                            </p>
                            <p className="flex colorful oil-color">
                                <i className="w15"></i><i className="w10"></i><i className="w75"></i>
                                <b style={{left:(this.state.oil+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tal" style={{textIndent:'-0.8rem'}}>15%</span>
                                <span className="flex-cell tac" style={{textIndent:'-4.9rem'}}>25%</span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tar">99.9%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item tx-item">弹性<b>{this.state.elasticity}</b></h5>
                            <p className="flex desc">
                                <span className="w37 tac">易皱纹</span>
                                <span className="w00 tac"></span>
                                <span className="w63 tac" style={{textIndent:'-1rem'}}>紧致</span>
                            </p>
                            <p className="flex colorful tx-color">
                                <i className="w37"></i><i className="w00"></i><i className="w63"></i>
                                <b style={{left:(this.state.elasticity*10+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.1rem'}}>3.7</span>
                                <span className="flex-cell tac"></span>
                                <span className="flex-cell tar">9.9</span>
                            </p>
                        </figure>
                        <div></div>
                    </section>
                </section>
                <div className="footer">
                    <a href="##" onTouchTap={this.reTest.bind(this)} className={(status == 5 || btnStatus) ? '':'btn-active'}>重新测试</a>
                    <a href="##" onTouchTap={this.analysis.bind(this)} className={status == 5 ? '':'btn-active'}>查看分析结果</a>
                </div>
                <Link to={'/analysis/'+part+'/'+this.state.beforeWater+'/'+this.state.beforeOil+'/'+this.state.beforeElasticity+'/'+this.state.water+'/'+this.state.oil+'/'+this.state.elasticity+'/'+this.state.skinTypeName + '?openid=' + getQueryString('openid')||getCookie('openid')} ref="analysis" />
                <div className='m-toast' id='toast' style={{display: 'none'}}></div>
            </div>
        )
    }
}
