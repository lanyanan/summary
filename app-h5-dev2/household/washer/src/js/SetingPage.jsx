/**
 * Created by yuanyunlong on 2016/12/28.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {TimeSelect} from './TimeSelect.jsx';
import {Loading} from './Loading.jsx';
import {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS} from  './washerConstData.js';

const  {Router, Route, hashHistory, Link} = ReactRouter;


const liushuiIndexArray=[0,1,4];
const orderSelect = {
    selecttitle:'洗衣机时间设置',
    statusshow:1,

    hourshow:true,
    hourstep:1,
    hourunit:'小时',
    hourarray:orderDataArray,
    maxhour:23,
    minhour:0,
    defaulthour:0,

    minuteshow:false,
    minutestep:1,
    minuteunit:'分钟',
    maxmin:0,
    minminute:0,
    ArrayInit:[0],
    defaultminute:0,
}

const waterLevel = {

    selecttitle:'水位设置',
    statusshow:0,

    hourshow:true,
    hourstep:1,
    hourunit:'',
    hourarray:waterLevelDataArray,
    maxhour:10,
    minhour:0,
    defaulthour:'6档',

    minuteshow:false,
    minutestep:0,
    minuteunit:'',
    maxmin:0,
    minminute:0,
    ArrayInit:[0],
    defaultminute:0,
}

const processArray = {
    selecttitle:'过程设置',
    statusshow:0,

    hourshow:true,
    hourstep:1,
    hourunit:'',
    hourarray:processDataArray,
    maxhour:5,
    minhour:0,
    defaulthour:processDataArray[0],

    minuteshow:false,
    minutestep:0,
    minuteunit:'',
    maxmin:0,
    minminute:0,
    ArrayInit:[0],
    defaultminute:0,
}

const specialArray = {
    selecttitle:'特色功能设置',
    statusshow:0,

    hourshow:true,
    hourstep:1,
    hourunit:'',
    hourarray:specialDataArray,
    maxhour:4,
    minhour:0,
    defaulthour:'无',

    minuteshow:false,
    minutestep:0,
    minuteunit:'',
    maxmin:0,
    minminute:0,
    ArrayInit:[0],
    defaultminute:0,
}

let isIOS = true;
let modeDefaultValue = 0;
let orderDefaultValue = orderDataArray[0];
let waterDefaultValue = waterLevelDataArray[0];
let processDefaultValue = processDataArray[0];
let specialDefaultValue = '无';


export class Seting extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {isWorking: false,
            selectshow: false,

            selectIndex:0,

            set_selectModeValue:modeDefaultValue,    //modex  index
            set_orderTimeValue:orderDefaultValue,
            set_waterLevelValue:waterDefaultValue,
            set_processValue:processDefaultValue,
            set_specialValue:specialDefaultValue,  // 这个东西是一个可变的值
            loadingShow:false,
            isEnableLiushui: false,
            isEnableYejian:false,

        };
        this.listenStore(Store); // 监听Store
        this.cancelClock = this.cancelClock.bind(this);
        this.submitClock = this.submitClock.bind(this);
    }

    componentWillMount(){
        het.setTitle(JSON.stringify({
            setNavTitle:1,
            title:'模式',
            setNavRightBtnHiden:1
        }));

        //导航栏:{ios:73,android:64}
        isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
    }



    handleTouchTap(e) {

        let modeData = {
            set_selectModeValue:this.state.set_selectModeValue,    //modex  index
            set_orderTimeValue:this.state.set_orderTimeValue,
            set_waterLevelValue:this.state.set_waterLevelValue,
            set_processValue:this.state.set_processValue,
            set_specialValue:this.state.set_specialValue,
        };
        Actions.startAction(modeData);

        this.setState({
            loadingShow:true
        });
        setTimeout(()=>{
            this.setState({
                loadingShow:false
            });
        },4000)


        setTimeout(()=>{
            history.back();
        },5000);


    }

    handleMode(e) {
        let index = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log("mode:" + washerModeS[index].name);
        this.setState({
            set_selectModeValue : index
        })

    }

    handleOrderAction(){

        this.setState({
            selectshow: true,
            selectIndex:0
        });
    }

    handleWaterLevelAction(){

        this.setState({
            selectshow: true,
            selectIndex:1
        });
    }

    handleProcessAction(){
        console.log("handleProcessAction");
        this.setState({
            selectshow: true,
            selectIndex:2
        });
    }

    handleSpecialAction(){

        this.setState({
            selectshow: true,
            selectIndex:3
        });
    }
    cancelClock(){
        this.setState({
            selectshow: false
        });
    }

    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组


        let tableCellIndex = parseInt(this.state.selectIndex);
        console.log("index: " +  tableCellIndex +" h: "+h + " m: " +m);
        switch(tableCellIndex){
            case 0: this.state.set_orderTimeValue = h; orderSelect.defaulthour = h; break;
            case 1: this.state.set_waterLevelValue = h;waterLevel.defaulthour = h;break;
            case 2: {
                this.state.set_processValue= h;
                processArray.defaulthour = h;
                specialArray.defaulthour = '无';
                this.state.set_specialValue = '无';
                specialArray.hourarray = generatorSpecialFunction(this.state.set_processValue);
                break;}
            case 3: {this.state.set_specialValue = h; specialArray.defaulthour = h;
                if(h == '洁桶'){
                    this.state.set_processValue = processDataArray[0]
                }
                break;}
            default: break;
        }

        this.setState({
            selectshow:false,
        })
    }

    render(){
        // 获取正在工作的模式
        if(this.state.isFirstInputThisPage != undefined && this.state.isFirstInputThisPage){
            this.state.set_selectModeValue = this.state.get_selectModeValue || modeDefaultValue;
            this.state.set_orderTimeValue  = this.state.get_orderTimeValue || orderDefaultValue;
            this.state.set_waterLevelValue = this.state.get_waterLevelValue || waterDefaultValue;
            this.state.set_processValue    = this.state.get_processValue || processDefaultValue;
            this.state.set_specialValue    = this.state.get_specialValue || specialDefaultValue;

            orderSelect.defaulthour  = this.state.get_orderTimeValue || orderDefaultValue;
            waterLevel.defaulthour  = this.state.get_waterLevelValue || waterDefaultValue;
            processArray.defaulthour    = this.state.get_processValue || processDefaultValue;
            specialArray.defaulthour      = this.state.get_specialValue || specialDefaultValue;

            Actions.setFirstInputSetingPage(false);
        }


        let selectModeIndex = this.state.set_selectModeValue;
        let selectshow = this.state.selectshow;
        let loadingShow = this.state.loadingShow;
        let selectIndex = this.state.selectIndex;
        let selectMode = [orderSelect, waterLevel, processArray, specialArray][selectIndex];

        let navigation = isIOS ?' ios':' android';

        let orderTime = this.state.set_orderTimeValue + '小时';
        let orderTableCellClassName = 'flex set';

        let waterlevel = this.state.set_waterLevelValue;
        let waterlevelTableCellClassName = 'flex set';

        let process = this.state.set_processValue ;
        let processTableCellClassName = 'flex set';


        let specialFunction = this.state.set_specialValue;
        let specialTableCellClassName = 'flex set ';

        console.log("orderTimeIndex: " + this.state.set_orderTimeValue );
        console.log("set_waterLevelIndex: " + this.state.set_waterLevelValue );
        console.log("set_processIndex: " + this.state.set_processValue );
        console.log("set_specialIndex: " + this.state.set_specialValue );


        let stateData = this.state;
        console.log('washhistory state: ' + JSON.stringify(stateData));


       return <div className="washerSetingPage">
            <div className={navigation}></div>
            <dl className="flex mode-items">
                {washerModeS.map(function (o) {
                    let isOn = (o.id === selectModeIndex );
                    let typeImage = isOn ? '-on.png)' : '-off.png)';
                    return <dd style={{'backgroundImage':'url(../static/image/mode/m-'+ o.id + typeImage}}
                    className={'mode'+ ( o.id == selectModeIndex ? ' on':'')}
                    key={o.id}
                    data-mode={o.id}
                    onTouchStart={this.handleMode.bind(this)}>
                        {o.name}
                    </dd> ;
                }.bind(this))}
            </dl>
            <dl className={orderTableCellClassName} onTouchStart={this.handleOrderAction.bind(this)} >
                <dd className="flex-cell tal">预约</dd>
                <dd className="flex-cell tar">
                    <span>{orderTime}</span>
                    <i></i>
                </dd>
            </dl>
            <dl className={waterlevelTableCellClassName} onTouchStart={this.handleWaterLevelAction.bind(this)}>
                <dd className="flex-cell tal">水位</dd>
                <dd className="flex-cell tar">
                    <span>{waterlevel}</span>
                    <i></i>
                </dd>
            </dl>
            <dl className={processTableCellClassName} onTouchStart={this.handleProcessAction.bind(this)}>
                <dd className="flex-cell tal" >过程</dd>
                <dd className="flex-cell tar" >
                    <span>{process}</span>
                    <i></i>
                </dd>
            </dl>
            <dl className={specialTableCellClassName} onTouchStart={this.handleSpecialAction.bind(this)}>
                <dd className="flex-cell tal">特殊功能</dd>
                <dd className="flex-cell tar">
                    <span>{specialFunction}</span>
                    <i></i>
                </dd>
            </dl>
            <h2 className="toggle-mode" onTouchStart={this.handleTouchTap.bind(this)}>启动</h2>
            <TimeSelect

                needUpdateArray={selectIndex == 3}
                show={selectshow}
                title={selectMode.selecttitle}
                statusshow={selectMode.statusshow}

                hourshow={selectMode.hourshow}
                hourstep ={selectMode.hourstep}
                hourunit={selectMode.hourunit}
                minhour={selectMode.minhour}
                maxhour={selectMode.maxhour}

                minuteshow={selectMode.minuteshow}
                minutestep={selectMode.minutestep}
                minuteunit={selectMode.minuteunit}
                minminute ={selectMode.minminute}
                maxmin={selectMode.maxmin}

                defaulthour={selectMode.defaulthour}
                defaultminute={selectMode.defaultminute}
                cancelClock={this.cancelClock}
                submitClock={this.submitClock}
                hourarray={selectMode.hourarray}
                ArrayInit={selectMode.ArrayInit}
            />
            <Loading show={loadingShow}/>
        </div>;
    }
};



function generatorSpecialFunction(processIndex){

    let specialDataResultArray = ['无','夜间','洁桶'];
    if(processIndex == 0 || processIndex == 1 ||  processIndex == 4){
        specialDataResultArray.push('留水');
    }

    if(processIndex == 0 || processIndex == 1 ||  processIndex == 4 || processIndex == 5){
        specialDataResultArray.push('风干90分钟');
    }

    return specialDataResultArray;
}