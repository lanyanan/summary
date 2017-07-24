### 安装启动
    npm install 
    npm run dev //开发
    npm run pro //打包

### 目录结构
+ 目录src：存放js 下面分文件夹
    - app: 入口目录
        - index.es6: 入口
    - config: 接口统一入口
    - core: 
    - modules: 模块文件夹
        - AreaModule :
        - Common: 公共组件 头部，底部
        - ControllerModule:
        - FactoryModule:
        - PowerModule:
        - UserModule:
+ 目录static：存放静态资源
    * css: 存放样式
    * fonts: 字体库
    * img: 存放图片
        - common: 公共图片
    * js： 存放js
    * html: 存放html
    * template: 存放模板
+ 目录libs：公共模块
+ 目录test：测试目录

### 文件命名

- modules文件夹首字母一律大写，其他文件夹一律小写 
- react组件,类,首字母一律大写，如： SomeModule
- 所有的HTML标签小写
- js方法采用驼峰命名

### css规范(供参考)
+ 使用soft tab（4个空格）
+ 属性顺序
    1. display,overfolw,position
    2. width,height,top,left
    3. line-height,margin,padding
    4. background,font-size,color
+ 命名空间

    1. 布局：以g为命名空间，例如：.g-wrap 、.g-header、.g-content、.g-mian、.g-aside 等；
    1. 工具：以u为命名空间，表示不耦合业务逻辑的、可复用的的工具，例如：.u-clearfix、.u-ellipsis 等；
    1. 状态：以is为命名空间，表示动态的、具有交互性质的状态，例如：.is-open、.is-active、.is-selected 等；
    1. 组件：以ui或者mod为命名空间，表示可复用、移植的组件模块，例如：.ui-slider、.mod-dropMenu等；
    1. 扩展：以ext为命名空间，表示对组件基类的视觉形态的扩展，例如：.ext-cover、、.ext-alignLeft 等；

### html规范
#### 语法
- 缩进使用soft tab（4个空格）；
- 嵌套的节点应该缩进；
- 在属性上，使用双引号，不要使用单引号；
- 属性名全小写，用中划线做分隔符；
- 不要在自动闭合标签结尾处使用斜线（HTML5 规范 指出他们是可选的）；
- 不要忽略可选的关闭标签，例：</li> 和 </body>。

#### 属性顺序
1. id
1. class
1. name
1. data-*
1. src, for, type, href, value , max-length, max, min, pattern
1. placeholder, title, alt
1. aria-*, role
1. required, readonly, disabled
