export let Light = {
    id: 1001,
    caption: '灯(开关设备)',
    originCaption: '灯(开关设备)',
    code: 1,
    fieldType: 'boolean',
    width: 25,
    height: 25,
    scheme: ['caption'],
    cssFile : './libs/light.css',
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="./static/img/light.png" />
                    <span>灯(开关设备)</span>
                </li>
            );
        } 
    }),
    dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
        },
        handleClick: function(){
            window.AppActions.changeLightSwitch(this.props.id,this.props.caption,this.props.deviceId,this.props.userWidgetID);
        },
        render: function(){
            var widgetName = '';
            var _display = 'block'; 
            var path = typeof this.props.imagePath !== 'undefined' ?
                    this.props.imagePath : '';
            var _state = typeof __props !== 'undefined' ? __props : '';
            var _name = 'Switch' + this.props.id + 'State';
            var widgetStyle = this.props.style;
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField]){
                        path = item.bgImagePath || '';
                    }
                });
            }

            if(this.props.styleList && this.props.styleList.light instanceof Array){
                this.props.styleList.light.map(function(item,index){
                    if(item.mark==1){
                        path = JSON.parse(item.url).pictureUrl;
                    }
                });
            }
            var _styleList = this.props.styleList.light;
            var _mark = -1;
            var _hidden = -1;
            if(_state){
                if(_state.dictData){
                    _hidden = 0;
                    var _list = _state.dictData;
                    for(var i = 0;i<_list.length;i++){
                        if(_list[i].deviceId==this.props.deviceId){
                            var _data_ = _list[i];
                            _mark = 1;
                            if(_data_ [_name]==128){
                                path = JSON.parse(_styleList[2].url).pictureUrl;
                            }else if(_data_ [_name]==129){
                                path = JSON.parse(_styleList[0].url).pictureUrl;
                            }else if(_data_ [_name]==0){
                                path = JSON.parse(_styleList[2].url).pictureUrl;
                            }else{
                                path = JSON.parse(_styleList[1].url).pictureUrl;
                            }
                        }
                    }
                }
                if(_state.ref){
                    if(_state.ref==this.props.userWidgetID){
                        widgetName = 'widgetName'
                    }
                }       
            }
            if(_hidden==0&&_mark==1){
            }else if(_hidden==0&&_mark==-1){
                this.props.style.display= 'none'
            }else{
            }
            return (
                <img data-id={this.props.deviceId} ref={this.props.userWidgetID} {...this.props} onTouchEnd={this.handleClick} src={path} className={widgetName}  />
            );
        }
    })`
};