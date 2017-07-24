/**
 * Created by yuanyunlong on 2016/12/28.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {TimeSelect} from './TimeSelect.jsx';
import {washerModeS, waterTempArray} from  './WasherCommonData.js';
const  {Router, Route, hashHistory, Link} = ReactRouter;


const orderSelect = {
    selecttitle:'温度设置',
    statusshow:false,

    hourshow:true,
    hourstep:1,
    hourunit:'°C',
    hourarray:waterTempArray,
    maxhour:waterTempArray[20],
    minhour:waterTempArray[0],
    defaulthour:waterTempArray[10],

    minuteshow:false,
    minutestep:1,
    minuteunit:'分钟',
    maxmin:0,
    minminute:0,
    ArrayInit:[0],
    defaultminute:0,
}


let isIOS = true;

export class Seting extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            cponoff: 0,
            cplock:0,
            isWorking: false,
            selectshow: false,
            selectIndex:0,
            set_waterTempIndex:10,
            set_waterMode:0

        };
        this.listenStore(Store); // 监听Store
        this.cancelClock = this.cancelClock.bind(this);
        this.submitClock = this.submitClock.bind(this);

        console.log("11111");
    }

    componentWillMount(){ 
        het.setTitle(JSON.stringify({ 
            setNavTitle:1, 
            title:'模式', 
            setNavRightBtnHiden:1 
        }));  

    }
    componentDidMount() {
        //导航栏:{ios:73,android:64}
         isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));

    }

    handleTouchTap(e) {
        let waterHeaterWorkMode = this.state.set_waterMode;
        let modelTemp = (waterHeaterWorkMode==0?35:waterHeaterWorkMode==1?34:waterHeaterWorkMode==2?35:waterHeaterWorkMode==3?45:waterHeaterWorkMode==4?30:waterHeaterWorkMode==5?38:waterHeaterWorkMode==6?40:35);

        let data = {
            set_waterTempIndex:modelTemp,
            set_waterMode:this.state.set_waterMode,
        };
        console.log("#######1111111111111111111111set_waterMode"+this.state.set_waterMode);
        Actions.startWataerAction(data);
        history.back();
    }

    handleMode(e) {
        let index = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log("mode:" + washerModeS[index].name);

       // Actions.setingPageSetModeAction(index);
        this.setState({
            set_waterMode:index
        });
        console.log("#############################set_waterMode"+index);
    }

    handleOrderAction(){

        this.setState({
            selectshow: true,
            selectIndex:0
        });
    }


    cancelClock(){
        this.setState({
            selectshow: false
        });
    }

    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组

        console.log("index: " + h + " m: " +m);
        let tableCellIndex = (this.state.selectIndex);
        switch(tableCellIndex){
            case 0:
                let index = waterTempArray.indexOf(h);
                this.state.set_waterTempIndex = index ;
                orderSelect.defaulthour = h;
                break;
            default: break;
        }

        this.setState({
            selectshow:false,
        })
    }

    render(){


        let selectshow = this.state.selectshow;
        let waterHeaterWorkMode = this.state.set_waterMode;
        console.log("#############################data isFirtInput= "+this.state.isFirtInput+this.state.set_waterMode);
        if (this.state.isFirtInput !=undefined && this.state.isFirtInput){
            this.state.set_waterMode  = parseInt(this.state.waterHeaterWorkMode);
            console.log('jinlaile进来了');
            Actions.setingPageSet(false);
        }
        let selectIndex = this.state.selectIndex;
        let selectMode = orderSelect;


        let navigation = isIOS ?' ios':' android';

        let orderTime = waterTempArray[this.state.set_waterTempIndex] + '℃';
        orderTime = (waterHeaterWorkMode==0?35:waterHeaterWorkMode==1?34:waterHeaterWorkMode==2?35:waterHeaterWorkMode==3?45:waterHeaterWorkMode==4?30:waterHeaterWorkMode==5?38:waterHeaterWorkMode==6?40:35)+'℃';
        let orderTableCellClassName = 'flex set';

        console.log('yy mode: ' + this.state.set_waterMode+'orderTime'+orderTime+'selectIndex'+selectIndex+waterHeaterWorkMode);



        //'url(../static/image/mode/m-'+ o.id+ (this.state.set_waterMode === o.id ? '-on.png':'-off.png)')
        return <div className="washerSetingPage">
            <div className={navigation}></div>
            <dl className="flex mode-items">
                {washerModeS.map(function (o) {
                    return <dd style={{'backgroundImage':'url(../static/image/mode/m-'+o.id+(o.id==this.state.set_waterMode?'-on.png)':'-off.png)')}}
                    className={"mode " + (this.state.set_waterMode === o.id ? 'on':'')}
                    key={o.id}
                    data-mode={o.id}
                    onTouchStart={this.handleMode.bind(this)}>
                        {o.name}
                    </dd> ;
                }.bind(this))}
            </dl>
            {/*<dl className={orderTableCellClassName}>*/}
                {/*<dd className="flex-cell tal">默认温度</dd>*/}
                {/*<dd className="flex-cell tar">*/}
                    {/*<span>{orderTime}</span>*/}

                {/*</dd>*/}
            {/*</dl>*/}

            <h2 className="toggle-mode" onTouchStart={this.handleTouchTap.bind(this)}>启动</h2>
            <TimeSelect
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
        </div>;
    }
};