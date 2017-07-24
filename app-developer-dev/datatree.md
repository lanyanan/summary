# 智能设备接入系统数据模型

```java
{
    title:"海尔智能净水龙头",
    projectId:10001, // 本项目ID，新建项目将为空
    productId:58, // 所属产品ID（分类）
    operateBtns:{}, // 侯中涛
    previewUrl:'', // 预览地址
    widgets:{  // 刘云龙 控件面板
        x:0,
        y:0,
        list:[
            {
                id:1001,
                width: 100,
                height: 50,
                dom:ReactDOM
            }
        ]
    },
    protocolConfigs:[],
    ghost:{ // 刘云龙 影子控件，用于拖放时占位
        width:0,
        height:0,
        top:0,
        left:0,
        display:false,
        transform:'none'
    },
    assets:{ // 刘炼熏
        x:0,
        y:0
    },
    phone:{ // 刘云龙
        type:"iphone6plus",
        width:414,
        height:736,
        minHeight:736
    },
    panelSwitch:{ // 侯中涛
    },
    selectCover:{ // 刘云龙 用于绘制多选cover
        display:true,
        top:0,
        left:0,
        width:0,
        height:0
    },
    pages:{
        activePage:0, // 当前选中的页面索引，缺省选中第一页
        activeWidget:-1, // 当前页面里选中的控件索引，-1表示未选中
        pageList:[
            {
                pageId:1001,
                pageName:'首页',
                widgetList : [
                    {
                        id:1001, // 控件原始编号（对应控件列表中的控件编号）
                        unsaved:false, // 是否未保存，缺省为已保存
                        widgetId:20000011, // 控件用户编号（用户私有编号）\
                        caption:'',//控件名称字段
                        originCaption:'',//控件原始名称字段
                        fieldType:'boolean',
                        editText:'',//文本类型控件文本字段
                        scheme: ['caption', 'show', 'text','fontStyle', 'status', 'event', 'color', 'bold', 'italic', 'size', 'multi[0]'],
                        top:0,
                        left:0,
                        width:0,
                        height:0,
                        zIndex:0, // z轴
                        matrix:[1,0,0,1,0,0],// 控件旋转缩放位移等transform矩阵
                        isRatio:2,//是否等比例缩放,1代表等比例,2代表不等比例
                        jsCode:"",
                        cssCode:"",
                        htmlCode:"",
                        fgColor:"",         //控件前景色
                        borderColor:"",     //控件边框颜色
                        bgColor:"",         //控件背景色
                        widgetOpacity:"",   //控件不透明度
                        boderWidth:"",      //控件边框宽度
                        propertySet:[{
                            propertyId:1,   //属性ID
                            imageInfo:'',   //控件当前属性背景图说明
                            statusVisibility:1,//当前状态是否可见(1代表可见 2代表不可见)
                            multipleText:'',//当前状态多行文本值
                            fontSize:'',    //当前状态字体大小
                            textColor:'',   //当前状态文本颜色
                            fontWeight:2, //当前状态字体是否加粗(1代表加粗,2代表不加粗)
                            fontItalics:2, //当前状态字体是否斜体(1代表斜体,2代表非斜体)
                            activeStatus:0,//当前状态
                            eventSet:[{
                                eventType:1,//属性类型1代表点击触发 2代表点击跳转 3代表点击显示   //4代表点击隐藏
                                eventField:'', //事件字段property值(对应控制数据字段)
                                commandType:0,     //指令类型 0代表不发送指令1代表发送自身指令2代表发送复合指令
                                checkedCommandList:[], //指令选中列表 存储选中的指令的property值
                                commandConfigList:[{}],//用来存储选中指令相关配置(updateFlag byteLength)
                                eventValue:'', //事件字段对应值(对应控制数据字段值)
                                updateFlag:'',  //控制数据字段对应标识位
                                byteLength:0, //控制数据字段字节长度
                                checkedPageId:'',//选中点击跳转的页面ID
                                hiddenWidgetList:[], //隐藏控件选中列表
                                showWidgetList:[], //显示控件选中列表
                                activeStatusField:{widgetID:{
                                    index:,statusField:,statusValue:
                                }},//点击显示事件显示控件对应状态
                            }],
                            statusSet:[{
                                statusField:'',//状态字段property值(对应运行数据字段)
                                statusValue:''//状态字段对应值(对应运行数据字段值)
                                statusName:'',  //当前状态名
                                bgImagePath:"", //控件当前状态背景图地址
                            }],
                            switchValue:1,  //控件当前属性开关标识(1代表开,2代表关)
                            widgetListItem:[ [{widgetId:0},{widgetId:1}] , [{},{}] ],//选项卡里包含选项组 ，每个选项里包含控件 [ [选项1] , [选项2]]  
                            SpeedDial: [{widgetId:0},{widgetId:1},{widgetId:1}]//九宫格
                        }],
                        widgetInfo: { //补充组件的信息
                            dragStatus:{  //组件拖拽信息
                                top: false,
                                bottom: false,
                                left: false,
                                right: false,
                                changeWidth: false,
                                changeHeight: false
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```