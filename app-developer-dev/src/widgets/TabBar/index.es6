import React from 'react';

var arr = [] ,arrChild = [];
arr.push(arrChild);
export let TabBar = {
    id: 1019,
    caption: '选项卡',
    editText:'选项卡',
    originCaption: '选项卡',
    fieldType: 'boolean',
    width: 375,
    height: 375,
    cssFile : '../static/widgets/TabBar/style.css',
    icon: '../static/img/widgets/tab-icon.png',
    iconActive: '../static/img/widgets/tab-icon-active.png',
    widgetListItem:arr,
    scheme: ['caption', 'show','select'],
    grid: ['select','size','exterior','hierarchy'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/tabBar.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/tabBar-active.png" className="icon-active" />
                    <span>选项卡</span>
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
        render: function(){
            return (
            <div {...this.props} ref={this.props.ref}  className={this.props.tabEdit > -1? "dash" : 'widgetTabBar'} ></div>
            )
        }
    })`
};