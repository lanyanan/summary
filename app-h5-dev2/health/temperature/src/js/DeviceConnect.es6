'use strict';
/**
 * 设备连接
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

export const DeviceConnect =React.createClass({
    getInitialState: function(){
        return {temData:122};
    },
    componentDidMount:function() {
        this.setState({
           temData : ReactDOM.findDOMNode(this.refs["temData"]).offsetWidth/2
        });
    },
    render:function() {
    	let temp = Number(Number(this.props.temp).toFixed(2)) || 0;
        let viewImg,temphint;
        if (temp>=34 && temp<=35) viewImg=(temp-34)*30;
        if (temp>=35 && temp<=36) viewImg=(temp-35)*34+30;
        if (temp>=36 && temp<=37) viewImg=(temp-36)*28+64;
        if (temp>=37 && temp<=38) viewImg=(temp-37)*41+92;
        if (temp>=38 && temp<=39) viewImg=(temp-38)*45+133;
        if (temp>=39 && temp<=40) viewImg=(temp-39)*28+178;
        if (temp>=40 && temp<=41) viewImg=(temp-40)*36+206;
        if (temp>41) viewImg=(temp-41)*28+242;
        if (temp<34) temphint = "亲，请检查体温贴是否佩戴在腋下！";
        if (temp>=34 && temp<=36) temphint = '亲，你的体温偏低，请及时就医！';
        if (temp>36 && temp<37.5) temphint = '亲，你的体温正常！';
        if (temp>=37.5) temphint = '亲，你已经发热，请及时降温哦！';
        viewImg = viewImg ? 135-viewImg : 135;
        viewImg = viewImg>135?135:viewImg;
        viewImg = viewImg<-135?-135:viewImg;
        const PI=Math.PI;
        // console.log(this.state.temData);
        let leftRig=this.state.temData-(this.state.temData-10)*Math.sin(viewImg*2*PI/360);
        let topRig=this.state.temData-(this.state.temData-10)*Math.cos(viewImg*2*PI/360);
        let imgPs;
        console.log('viewImg',viewImg);
        if(viewImg>=-135 && viewImg<=22.5) imgPs="img3";
        if(viewImg>22.5 && viewImg<=68.2) imgPs="img1";
        if(viewImg>68.2 && viewImg<135) imgPs="img2";
        if (!imgPs) imgPs="img2";
        let dataDay = Funs.dateFormat(Number(this.props.dataTime),'yyyy-MM-dd',false);
        let datatext = Funs.dateFormat(Number(this.props.dataTime),'hh:mm:ss',false);
        // 设备连接判断
        let pp,lpp,connectStatus,ps,conMeasure,conHistory;
        if(this.props.isBleConnect==0){
            pp = (<p className='prompt mrg-top'>正在连接设备</p>)
            lpp = (<p className='prompt'>请耐心等候</p>);
            ps =(<p className='dataDay dev-magtop'>{dataDay}</p>);
            connectStatus = null;
        }else if(this.props.isBleConnect==2){
            pp = (<p className='con-text mrg-top'>连接失败！</p>);
            lpp = (<p className='prompt con-point'>请检查设备是否开启，蓝牙是否打开</p>);
            connectStatus = (<ol className='test-list'><li><p>今日测量最高体温</p><p><span>--</span><b>°C</b><i></i></p></li><li className='list-border'><p>今日测量最高体温</p><p><span>--</span><b>°C</b></p></li></ol>);
        }else{
            pp = (<p className='num'>{temp || '--'}<b>°C</b></p>);
            lpp = (<p className='datatext'><span>{datatext}</span></p>);
            connectStatus = (<p className={temp>37.5?'tip cor-red':'tip'}>{temphint}</p>);
            ps =(<p className='dataDay'>{dataDay}</p>);
        }
        return (
            <div>
                <div className='content'>
                    <div className="temData text-temData" ref="temData">
                        <div className={"vImg "+imgPs} style={{top:topRig+'px',left:leftRig+'px'}}>
                            
                        </div>
                        {pp}
                        {lpp}
                        {ps}
                        <em className="temper34">34℃</em>
                        <em className="temper35">35℃</em>
                        <em className="temper36">36℃</em>
                        <em className="temper37">37℃</em>
                        <em className="temper38">38℃</em>
                        <em className="temper39">39℃</em>
                        <em className="temper40">40℃</em>
                        <em className="temper41">41℃</em>
                        <em className="temper42">42℃</em>
                    </div>
                    {connectStatus}
                </div>
            </div>
        );
    }
});