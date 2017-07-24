export let Monitor = {
    id: 1002,
    caption: '人员检测设备',
    originCaption: '人员检测设备',
    code:1,
    fieldType: 'boolean',
    width: 25,
    height: 25,
    scheme: ['caption'],
    cssFile : './libs/monitor.css',
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="./static/img/monitor.png" />
                    <span>人员检测设备</span>
                </li>
            );
        } 
    }),
    dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        handleClick: function(){
            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.commandType==2){
                            AppActions.complexCommand(item.commandConfigList);
                        }else{
                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                        }
                    } else if (item.eventType==2) {
                        location.hash = '#/page/' + item.checkedPageId
                    } else if (item.eventType==3 || item.eventType==4) {
                        item.userWidgetID = userWidgetID;
                        item.status = item['activeStatusField'];
                        AppActions.toggle(item);
                    }
                });
            }
        },
        render: function(){
            var path = typeof this.props.imagePath !== 'undefined' ?
                    this.props.imagePath : '';
            var _state = typeof __props !== 'undefined' ? __props : '';
            var widgetStyle = this.props.style;
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField]){
                        path = item.bgImagePath || '';
                    }
                });
            }
            if(this.props.styleList && this.props.styleList.people instanceof Array && !path){
                this.props.styleList.people.map(function(item,index){
                    if(item.mark==1){
                        path = JSON.parse(item.url).pictureUrl;
                    }
                });
            }
            return (
                <img ref={this.props.ref} {...this.props} onTouchEnd={this.handleClick} src={path} className={this.props.className || "widgetMonitor"}  />
            );
        }
    })`
};