import React from 'react';

export let SpeedDial = {
    id: 1020,
    caption: '九宫格',
    originCaption: '九宫格',
    fieldType: 'boolean',
    width: 375,
    height: 184,
    cssFile : '../static/widgets/SpeedDial/style.css',
    icon: '../static/img/widgets/grid-icon.png',
    iconActive: '../static/img/widgets/grid-icon-active.png',
    scheme: ['ranks','widgetStyle','speeddialShape','tone','caption','eValue', 'multi[0]'], // ranks：行列,speeddialShape:形状,speeddialStyle:样式,speeddialTone:色调
    grid: ['style','hierarchy','size','exterior'],
    widgetInfo: {
        dragStatus:{ //判断能不能拖拽拉伸
            top: true,
            bottom: true,
            left: false,
            right: true,
            changeWidth: false,
            changeHeight: false
        },
        row: 1, //1行
        column: 2, //2列
        speedDialStyle: 0, //样式1
    },
    gridChildList:[],
    s:{
        tabName:'父亲1',
        childWidgetItem:[
            {
                tabName:'儿子1',
                grandchild:[
                    {
                       tabName:'孙子1', 
                    },
                    {
                       tabName:'孙子2', 
                    },
                ]
            },
            {
                tabName:'儿子2',
                grandchild:[
                    {
                       tabName:'孙子1', 
                    },
                    {
                       tabName:'孙子2', 
                    },
                ]
            }
        ] 
    },
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/tab.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/tab-active.png" className="icon-active" />
                    <span>九宫格</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        getInitialState: function(){
            return {
            };
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        componentWillReceiveProps: function(nextProps){
            
        },
        render: function(){

            var speeddialList = [],
                widgetInfo = this.props.widgetInfo,
                row = widgetInfo.row ? widgetInfo.row : 1,
                column = widgetInfo.column ? widgetInfo.column : 2,
                speeddialStyle = widgetInfo.speeddialStyle ? widgetInfo.speeddialStyle : 0,
                speeddialShape = widgetInfo.speeddialShape ? widgetInfo.speeddialShape : 0,
                speeddialColor = widgetInfo.speeddialColor ? widgetInfo.speeddialColor : "transparent",
                num = row * column;
            
            for(var i=0; i<num; i++){
                speeddialList.push({
                    icon: '../static/img/grid0.png',
                    text: i
                });
            }


            return (
                <div {...this.props}  className='speeddial'>
                    <ul className={"speeddial-wrap speeddial-style" + num}>
                        {
                            speeddialList.map(function(item,index){
                                return (
                                    <li key={index} style={{width: 100/parseInt(column) + '%'}}>
                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
    })`
};