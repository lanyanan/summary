'use strict';
/**
 * @prop 选择模式设置
 */
import {Actions} from './Actions.es6';
export const SettingMode = React.createClass({
	//模式面板重排模式数组,workingmode与改itemArray的mode一一对应
	itemArray: [
		{value:0,name:'模式',mode:0,  powerTemperature:800,  heating:5,    reservation:0,   live:'on'},
		{value:1,name:'花茶',mode:10, powerTemperature:300,  heating:5,    reservation:0,   live:'on'},//2
		{value:2,name:'煮蛋',mode:14, powerTemperature:800,  heating:5,    reservation:0},//3
		{value:3,name:'煮面',mode:15, powerTemperature:800,  heating:10,   reservation:0,   live:'on'},//4
		{value:4,name:'酸奶',mode:13, powerTemperature:300,  heating:18,   reservation:0},//5
		{value:5,name:'药膳',mode:12, powerTemperature:200,  heating:40,   reservation:0,   live:'on'},//6
		{value:6,name:'烧水',mode:2,  powerTemperature:800,  heating:5,    reservation:0},//1
		{value:7,name:'煲汤',mode:19, powerTemperature:300,  heating:115,  reservation:0,  live:'on'},//7
		{value:8,name:'火锅',mode:18, powerTemperature:300,  heating:115,  reservation:0,  live:'on'},//8
		{value:9,name:'保温',mode:1,  powerTemperature:60,   heating:90,   reservation:0,  live:'on'},//9
		/*{value:'12',name:'云菜单',id:'', 'workingpower':''}*/
	],
	handleBack:function(){
		Actions.toggleModeShow({slide:2,fold:false});
		// 显示华为app的titlebar
		window.AppJsBridge.service.applicationService.applicationService.showTitleBar();
	},
	//选中模式
	handleModeSelect: function(e,o){

		//取遍历到当前元素上的索引值提交给store赋值给selectMode，且返回selectMode给handleModeChange操作
		let selectMode        = e.currentTarget.getAttribute('data-mode');
		let selectPower       = this.itemArray[selectMode].powerTemperature;//功率
		let selectHeating     = this.itemArray[selectMode].heating;//加热时间
		let selectReservation = this.itemArray[selectMode].reservation;

		//console.log('根据点击的值获取对应参数>>>'+selectMode,selectPower,selectHeating,selectReservation,this.props.itemArray);
		Actions.toggleModeSelect(selectMode,selectPower,selectHeating,selectReservation);
	},
	//启动选中后的模式,并发送到App
	handleModeChange :function(e){
		e.preventDefault();
		//接收组件传递
		let Mode = this.props.settingMode;
		let selectMode =Mode.selectMode;
		let selectPower = Mode.selectPower;
		let selectHeating = Mode.selectHeating;
		let selectReservation = Mode.selectReservation;

        //this.props.settingMode.selectMode本地选择根据该值来查询对应本地数组中的mode值,
		// 选择模式后会更新转态值为itemArray中的value值or索引值，去查询其对应的mode
		//筛选后的本地数组
		let items = this.itemArray;
		let mapModeArray = 1;
		//当初次拉取运行数据大于本地数组items长度（9）的时候，
		// 选择模式取父组件的mode值，否则取本地维护数组items的mode值
		if(selectMode>items.length){
			mapModeArray = selectMode;
		}else{
			mapModeArray = items[selectMode].mode;
		}
		let mode =  selectMode ? mapModeArray: items[1].mode;
		let power = selectPower ? selectPower: items[1].powerTemperature;
		let heating = selectHeating? selectHeating: items[1].heating;
		let reservation = selectReservation ? selectReservation: items[1].reservation;
		Actions.toggleModeChange(mode,power,heating,reservation);
	},
	render: function(){
		//接收组件传递
		let Mode = this.props.settingMode;
		let showModeSet =Mode.showModeSet;
		let handleSelectSet = Mode.handleSelectSet;

		let selectMode = Mode.selectMode;
		let selectPower = Mode.selectPower;
		let selectHeating = Mode.selectHeating;
		let selectReservation = Mode.selectReservation;
        //筛选后用作显示的本地数组
		let items = this.itemArray;
		//idx用于本地索引维护，对应数组里的value值，显示设置面板值，
		// this.props.settingMode.selectMode初始值在父组件中设置默认为1选中花茶
		let idx = selectMode ? selectMode: 1;
		selectMode        =  selectMode ? selectMode : items[idx].value;
		selectPower       =  selectPower? selectPower : items[idx].powerTemperature;
		selectHeating     =  selectHeating? selectHeating : items[idx].heating;//加热时长仅酸奶可设置
		selectReservation =  selectReservation? selectReservation : items[idx].reservation;

		//加热功率or保温温度设置（烧水和煮蛋不可设置）
		let modePoT = (idx ==2 || idx ==6) ? true:false;
        let modePoTSetOk = modePoT?'(不可设置)':'';
		//加热时长单位(仅酸奶不同)
		let modeYogurt = idx ==4 ? true:false;
		let heatingTimeUnit = modeYogurt ? '小时':'分钟';
		let heatingTimeSetOk = modeYogurt?'':'(不可设置)';
		if(!modeYogurt){
			selectHeating='默认';
			heatingTimeUnit='';
			heatingTimeSetOk ="";
		}
		//功率or保温温度显示设置（仅保温温度不同）
		let modeKeepTemp = idx ==9 ? true:false;
		let modeSwitchTitle =  modeKeepTemp ? '保温温度':'功率';
		let modeSwitchUnit =  modeKeepTemp ? '°C':'瓦';
		//导航栏判断安卓73，苹果64
		let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
		let navigation = isIOS ?'ios':'android';
		//let xiuxiu = Mode.xiuxiu;
		//选择控件触发按钮
		let handleSettingZ = this.handleModeSelect;
		let handleSettingA = modePoT ?'':handleSelectSet;
		let handleSettingB = modeYogurt?handleSelectSet:'';
		let handleSettingC = Mode.handleSelectSet;
		if(Mode.slide==2){
			handleSettingZ = handleSettingA = handleSettingB= handleSettingC= '';
		}

		//保温模式选择控件单位
		let selectTitle = selectMode == 9 ?'保温':'其它';

		return (
			<div className={'slide-dialog-inner'+ (showModeSet ? ' slide-dialog-up':'')} data-po={showModeSet}>
				<h3 className={navigation}>
					<i className="back" onTouchStart={this.handleBack}></i>
					<span>模式</span>
				</h3>

				<dl className="flex mode-box"
					data-mode={idx}
					data-reservation={selectReservation}>
					{items.map(
						function(o) {
							return(
								<dd key={o.value}
									className={'mod'+ ( o.value == idx ? ' on':'') }
									data-mode={o.value}
									style={
										{
										 'backgroundImage': 'url(../static/img/m-'+o.value+( o.value == idx ? '-on':'-off')+'.png)',
										 'display':o.value==0?'none':'auto'
										}
									}
									onTouchStart={handleSettingZ}>
									{o.name}
								</dd>
							)
						}.bind(this)

					)}
				</dl>

				<dl className={"flex set"+(modePoT?'':' disabled')}
					data-value='0'
					data-current = 'B'
					data-keep={selectTitle}
					onTouchStart={handleSettingA}>
					<dd className="flex-cell tal">{modeSwitchTitle}</dd>
					<dd className="flex-cell tar" data-listen={selectPower}>
						<span>{selectPower}</span><span>{modeSwitchUnit}{modePoTSetOk}</span>
						<i></i>
					</dd>
				</dl>

				<dl className={"flex set"+(modeYogurt?'':' disabled')}
					data-value='1'
					data-current = 'C'
					onTouchStart={handleSettingB}>
					<dd className="flex-cell tal">加热时长</dd>
					<dd className="flex-cell tar">
						<span>{selectHeating}</span>
						<span>{heatingTimeUnit}{heatingTimeSetOk}</span>
						<i></i>
					</dd>
				</dl>

				<dl className="flex set"
					ref="set-reservation"
					id="reservation"
					data-value='2'
					data-current = 'D'
					onTouchStart={handleSettingC}>
					<dd className="flex-cell tal">预约时间</dd>
					<dd className="flex-cell tar">
						{selectReservation}<span>分钟</span>
						<i></i>
					</dd>
				</dl>

				<h2 id="modeSend"
					className="start-up disables"
					data-mode = {idx}
					data-power={selectPower}
					data-heating={selectHeating}
					data-reservation={selectReservation}
					onTouchEnd={this.handleModeChange}>
					<span>启动</span>
				</h2>
			</div>
		)
	}
});
