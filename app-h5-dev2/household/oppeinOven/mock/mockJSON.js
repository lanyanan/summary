Mock.mock(/menu\/menuList/, {
    "code": 0,
    "data": {
        "list|1-10": [
            {
                "menuId|1-100434340": 3,     //菜谱标识
                "name": "蒸日本豆腐",     //菜谱名称
                "cover": "http://i3.xiachufang.com/image/620/8501883c65a511e49d2be0db5512b208.jpg",      //封面图
                "cookingTime": "30分钟"
            }
        ],
        "pager": {
            "pageIndex": 1,
            "pageRows": 20,
            "totalRows": 45,
            "totalPages": 3,
            "defaultPageRows": 20,
            "currPageRows": 20,
            "pageStartRow": 0,
            "pageEndRow": 19,
            "hasPrevPage": false,
            "hasNextPage": false
        }
    }
});


Mock.mock(/menu\/getMenuByMenuId/, {
    "code": 0,
    "data": {
        "menuId": 3,
        "name": "蒸日本豆腐",
        "menuPropertyConfigList": [
            {
                "stepConfigList": [
                    {
                        "isRemind": true,
                        "step": '1',
                        "propertyConfigList": [
                            { "property": "ModeTimingHour", "propertyName": "阶段工作时间-小时", "value": "1" },
                            { "property": "ModeTimingMin", "propertyName": "阶段工作时间-分钟", "value": "0" },
                            { "property": "ModeTempHigh", "propertyName": "阶段模式工作温度高位", "value": "0" },
                            { "property": "ModeTempLow", "propertyName": "阶段模式工作温度低位", "value": "150" },
                            { "property": "SteamSwitch", "propertyName": "蒸汽开关", "value": "0" },
                            { "property": "SteamTimingHour", "propertyName": "蒸汽工作时间小时", "value": "02" },
                            { "property": "SteamTimingMin", "propertyName": "蒸汽工作时间分钟", "value": "0" },
                        ]
                    },
                    {
                        "isRemind": false,
                        "step": '2',
                        "propertyConfigList": [
                            { "property": "ModeTimingHour", "propertyName": "阶段工作时间-小时", "value": "0" },
                            { "property": "ModeTimingMin", "propertyName": "阶段工作时间-分钟", "value": "25" },
                            { "property": "ModeTempHigh", "propertyName": "阶段模式工作温度高位", "value": "1" },
                            { "property": "ModeTempLow", "propertyName": "阶段模式工作温度低位", "value": "2" },
                            { "property": "SteamSwitch", "propertyName": "蒸汽开关", "value": "0" },
                            { "property": "SteamTimingHour", "propertyName": "蒸汽工作时间小时", "value": "1" },
                            { "property": "SteamTimingMin", "propertyName": "蒸汽工作时间分钟", "value": "20" },
                        ]
                    },
                    {
                        "isRemind": true,
                         "step": '2',
                        "propertyConfigList": [
                            { "property": "ModeTimingHour", "propertyName": "阶段工作时间-小时", "value": "3" },
                            { "property": "ModeTimingMin", "propertyName": "阶段工作时间-分钟", "value": "56" },
                            { "property": "ModeTempHigh", "propertyName": "阶段模式工作温度高位", "value": "0" },
                            { "property": "ModeTempLow", "propertyName": "阶段模式工作温度低位", "value": "187" },
                            { "property": "SteamSwitch", "propertyName": "蒸汽开关", "value": "0" },
                            { "property": "SteamTimingHour", "propertyName": "蒸汽工作时间小时", "value": "6" },
                            { "property": "SteamTimingMin", "propertyName": "蒸汽工作时间分钟", "value": "44" },
                        ]
                    }
                ]
            }
        ]
    }
})