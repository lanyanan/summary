## H5框架jssdk文档

### 目录
1. 配置接口 [het.config](#bar1)
2. 页面准备就绪接口 [het.domReady](#bar2)
3. 获取Token接口 [het.getToken](#bar3)
4. 获取deviceId接口 [het.getDeviceId](#bar4)
5. 代理get请求 [het.get](#bar5)
6. 代理post请求 [het.post](#bar6)
7. 设置页面标题接口 [het.setTitle](#bar7)
8. 计算updateFlag值 [het.calcUpdateFlag](#bar8)
9. 计算16进制updateFlag值 [het.hexUpFlag](#bar9)
10. 调用toast组件 [het.toast](#bar10)

### 功能接口
要使用该SDK，首先需要引入SDK文件[openLifeSDK.js](other/common/static/openLifeSDK.js)。引入该文件后，在js全局环境中将自动添加het对象，该对象相应的方法见下列接口说明。

<span id="bar1"></span>
#### 1. 配置接口

##### 方法调用说明
    het.config(SETTINGS)
    // settings格式为json对象，json字段详见参数说明

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明  
|----------------|:--------:|----------|:-----------
| appId          |    是    | string   | 访问后台接口所需参数appId
| appSecret      |    是    | string   | 访问后台接口所需参数appSecret
| debugMode      |    否    | string   | 开启debug，缺省不开启. 目前可选模式为print

*注：以上列出的为SDK内置参数，只在本地处理，不会被发送至app。*

##### 范例
```javascript
het.config({
    debugMode : 'print', // 打印调试数据
    appId : '30590',
    appSecret : 'aaa'
});
```

***********************************************************************

<span id="bar2"></span>
#### 2. 页面准备就绪接口
该接口用于在页面准备就绪时调用，其实就是DOMContentLoaded的封装，也可根据需要自己实现
##### 方法调用说明
    het.domReady(CALLBACK)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| callback       |    是    | function | 回调函数，当WEB页面准备就绪时，将会执行该方法登记的回调函数。*注意，该回调只会被调用一次。*

##### 返回结果
该方法用于登记回调函数，不返回任何结果

***********************************************************************

<span id="bar3"></span>
#### 3. 获取Token接口
该接口用于获取accessToken
##### 方法调用说明
    het.getToken()

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| sucCallback    |    是    | function | 获取成功时将调用该方法
| errCallback    |    是    | function | 获取失败时将调用该方法

##### 返回结果
返回获取到的token

***********************************************************************

<span id="bar4"></span>
#### 4. 获取deviceId接口
该接口用于获取deviceId
##### 方法调用说明
    het.getDeviceId()

##### 返回结果
返回获取到的deviceId

***********************************************************************

<span id="bar5"></span>
#### 5. 代理get请求接口

##### 方法调用说明
    het.get(url,data, sucCallback, errCallback,needArg)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| url            |    是    | string   | 访问的接口地址
| data           |    否    | json     | 将发送给app的数据
| sucCallback    |    是    | function | app方数据处理成功时将调用该方法
| errCallback    |    是    | function | app方数据处理失败时将调用该方法
| needArg        |    否    | function | 是否需要SDK拼接参数

##### 返回结果
调用回调函数返回

***********************************************************************

<span id="bar6"></span>
#### 6. 代理post请求接口

##### 方法调用说明
    het.post(url,data, sucCallback, errCallback,needArg)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| url            |    是    | string   | 访问的接口地址
| data           |    是    | json     | 将发送给app的数据
| sucCallback    |    是    | function | app方数据处理成功时将调用该方法
| errCallback    |    是    | function | app方数据处理失败时将调用该方法
| needArg        |    否    | function | 是否需要SDK拼接参数

##### 返回结果
调用回调函数返回


***********************************************************************

<span id="bar7"></span>
#### 7. 设置页面标题接口
该方法用于设置页面标题，同时将标题发送给app，以供app进行标题更新。
##### 方法调用说明
    het.setTitle(title)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| title          |    是    | string   | 将设置的标题

##### 返回结果
不返回任何结果。

***********************************************************************

<span id="bar8"></span>
#### 8. 计算updateFlag值
该方法用于计算updateFlag值，以供提交控制数据
##### 方法调用说明
    het.calcUpdateFlag(offset)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| offset         |    是    | Integer  | 偏移量（二进制位，从1开始）

##### 返回结果
返回十进制计算结果

***********************************************************************

<span id="bar9"></span>
#### 9. 计算16进制updateFlag值
该方法用于计算16进制的updateFlag值，以供提交控制数据
##### 方法调用说明
    het.hexUpFlag(index, length, upLength, originUpFlag)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| index          |    是    | Integer  | 索引值（二进制位，从0开始）
| length         |    否    | Integer  | 该功能占字节长度，默认为1
| upLength       |    否    | Integer  | 整个updateFlag所占字节长度，默认为4
| originUpFlag   |    否    | string   | 原始updateFlag（十六进制字符串），默认为"00"

##### 返回结果
返回十六进制字符串

***********************************************************************

<span id="bar10"></span>
#### 10. 调用toast
该方法用于调用toast
##### 方法调用说明
    het.toast(msg,sec)

##### 参数说明
|    参数名称    | 是否必须 | 字段类型 |  参数说明
|----------------|:--------:|----------|:-----------
| msg            |    是    | string   | 将要弹出的提示信息
| sec            |    否    | string   | 将要显示的时长

##### 方法必备容器
```javascript
<div id="mytoast"></div>
```
同时需要引入tips.css或自定义toast的样式

##### 返回结果
目前暂无返回

***********************************************************************