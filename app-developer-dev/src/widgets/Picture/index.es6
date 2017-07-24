import React from 'react';

export let Picture = {
    id: 1004,
    caption: '图像',
    originCaption: '图像',
    fieldType: 'boolean',
    width: 100,
    height: 100,
    scheme: ['caption','show', 'image', 'status', 'event', 'multi[0]'],
    cssFile : '../static/widgets/Picture/style.css',
    icon: '../static/img/widgets/img-icon.png',
    iconActive: '../static/img/widgets/img-icon-active.png',
    grid: ['interactive','size','exterior','hierarchy'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/picture.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/picture-active.png" className="icon-active" />
                    <span>图像</span>
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
                    }else if (item.eventType==3 || item.eventType==4) {
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
            if(this.props.styleList && this.props.styleList.image instanceof Array && !path){
                this.props.styleList.image.map(function(item,index){
                    if(item.name=='noimage'){
                        path = JSON.parse(item.url).pictureUrl;
                    }
                });
            }
            return (
                <img ref={this.props.ref} {...this.props} onTouchEnd={this.handleClick} src={path} className={this.props.className || "widgetPicture"}  />
            );
        }
    })`
};