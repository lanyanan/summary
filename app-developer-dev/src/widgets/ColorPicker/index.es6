import React from 'react';

export let ColorPicker = {
    id: 1014,
    caption: '颜色盘',
    originCaption: '颜色盘',
    fieldType: 'Switch',
    width: 225,
    height: 225,
    cssFile : '../static/widgets/ColorPicker/style.css',
    icon: '../static/img/widgets/colorpicker-icon.png',
    iconActive: '../static/img/widgets/colorpicker-icon-active.png',
    grid: ['style','interactive','size','exterior','hierarchy'],
    scheme: ['caption', 'colorType', 'show','colorPicker','multi[0]'],
    widgetInfo: {
        dragStatus: { 
            top: true,
            bottom: true,
            left: true,
            right: true,
            changeWidth: false,
            changeHeight: false
        }
    },
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/colorpicker.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/colorpicker-active.png" className="icon-active" />
                    <span>颜色盘</span>
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
            if(this.props.userWidgetID && sessionStorage.getItem(this.props.userWidgetID)){
                var seesionValue = sessionStorage.getItem(this.props.userWidgetID);
                var sessionState = JSON.parse(seesionValue);
                this.setState(sessionState);
            }
            var imgurl;
            if(this.props.styleList && this.props.styleList.colorPicker instanceof Array){
                this.props.styleList.colorPicker.map(function(item,index){
                    if(item.name=='color-picker'){
                        imgurl = JSON.parse(item.url).pictureUrl;
                    }
                });
            }
            if(imgurl && this.props.statusVisibility==1 && !_state.colorpicker){
                AppActions.initCanvas(imgurl,this.props.style);
            }else{
                var c = React.findDOMNode(this.refs.canvas);
                var cxt=c.getContext('2d');
                var img=new Image();
                var wh = 225;
                img.src= imgurl;
                img.onload = function(){
                    cxt.drawImage(img, 0, 0, wh, wh);
                };

                var c1 = React.findDOMNode(this.refs.pickerCanvas);
                var cxt1=c1.getContext('2d');
                var img1=new Image();
                var wh1 = 225;
                img1.src= imgurl;
                img1.onload = function(){
                    cxt1.drawImage(img1, 0, 0, wh1, wh1);
                };

                var c2 = React.findDOMNode(this.refs.canvasRange);
                var cxt2=c2.getContext('2d');
                var img2= new Image();
                img2.src= 'data:image/png;base64,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';;
                img2.onload = function(){
                    cxt2.drawImage(img2, 0, 0, 345, 9);
                };
            }
        },
        componentWillReceiveProps: function(nextProps) {
            var imgurl;
            var _this = this;
            this.K = 0;
            if(nextProps.styleList && nextProps.styleList.colorPicker instanceof Array){
                nextProps.styleList.colorPicker.map(function(item,index){
                    if(item.name=='color-picker'){
                        imgurl = JSON.parse(item.url).pictureUrl;
                        _this.k = 1;
                    }
                });
            }
            if(this.state && imgurl === this.state.imgurl) {
                return;
            }
            var c = React.findDOMNode(this.refs.canvas);
            var cxt=c.getContext('2d');
            var img=new Image();
            var wh = Number(nextProps.style.width) || 225;
            img.src= imgurl;
            img.onload = function(){
                cxt.drawImage(img, 0, 0, wh, wh);
            };
            this.setState({
                imgurl:imgurl
            });
        },
/*        shouldComponentUpdate:function(){
            console.log(this.k);
            if(this.k){
                return this.k == 0?true:false;
            }else{
                return true
            }
        },*/
        componentDidUpdate:function(){
            var sessionValue = JSON.stringify(this.state);
            if(this.props.userWidgetID){
                sessionStorage.setItem(this.props.userWidgetID,sessionValue);
            }
        },
        addBackground:function(e) {
            var Dom = e.target;
            var index =  Dom.getAttribute('key')
            var DomPre = Dom.parentNode;
            var computedStyle = document.defaultView.getComputedStyle(DomPre, null);
            var rgbaString = computedStyle.backgroundColor;
            var rgbArr = (rgbaString.substring(4,rgbaString.length-1)).split(",");
            this.setState({
                r: rgbArr[0],
                g: rgbArr[1],
                b: rgbArr[2],
                a: 255
            });
        },
        showPickerColor:function() {
            this.setState({
                colorPickerShow:true
            })
        },
        canclePickerColor:function() {
            this.setState({
                colorPickerShow:false
            })
        },
        selectColor: function(e) {
            var c = React.findDOMNode(this.refs.canvas);
            var cxt=c.getContext('2d');
            var offset = this.getOffset(c);
            var x = e.targetTouches[0].pageX - offset.x;
            var y = e.targetTouches[0].pageY + document.body.scrollTop - offset.y;
            var rx = Math.abs(x - 112.5);
            var ry = Math.abs(y - 112.5);
            if(Math.sqrt(rx*rx+ry*ry)>112.5){
                return;
            }
            var rgba = cxt.getImageData(x, y, 1, 1).data;
            this.setState({
                x: x,
                y: y,
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] / 255
            });
        },
        selectPickerColor: function(e) {
            var c = React.findDOMNode(this.refs.pickerCanvas);
            var cxt=c.getContext('2d');
            var offset = this.getOffsets(c);
            var x = e.targetTouches[0].pageX - offset.x;
            var y = e.targetTouches[0].pageY + document.body.scrollTop - offset.y;
            var rx = Math.abs(x - 112.5);
            var ry = Math.abs(y - 112.5);
            if(Math.sqrt(rx*rx+ry*ry)>112.5){
                return;
            }
            var rgba = cxt.getImageData(x, y, 1, 1).data;
            this.setState({
                x: x,
                y: y,
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] / 255
            });
        },
        submitColor:function(e) {
            function pad0(hex) {
                return hex.replace(/^\b(?=.$)/, '0');
            }
            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.colorType != '2'){
                            item.rValue = this.state.r;
                            item.gValue = this.state.g;
                            item.bValue = this.state.b;
                            AppActions.submitColor(item);
                        }else{
                            var colorvalue = '#'+pad0(this.state.r.toString(16))+pad0(this.state.g.toString(16))+pad0(this.state.b.toString(16));
                            AppActions.trigger(item.eventField, colorvalue, item.updateFlag,item.byteLength);
                        }
                    }
                }.bind(this));
            }else{
                console.log('eventSet error');
            }
        },
        submitPickerColor:function(e) {
            function pad0(hex) {
                return hex.replace(/^\b(?=.$)/, '0');
            }
            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.colorType != '2'){
                            item.rValue = this.state.r;
                            item.gValue = this.state.g;
                            item.bValue = this.state.b;
                            AppActions.submitColor(item);
                        }else{
                            var colorvalue = '#'+pad0(this.state.r.toString(16))+pad0(this.state.g.toString(16))+pad0(this.state.b.toString(16));
                            AppActions.trigger(item.eventField, colorvalue, item.updateFlag,item.byteLength);
                        }
                    }
                }.bind(this));
            }else{
                console.log('eventSet error');
            }
        },
        getOffset:function(dom) {
            var xy = {x:0, y:0};
            xy.x += dom.offsetLeft;
            xy.y += dom.offsetTop;
            while (dom.className!='colorpicker' && dom.tagName!='BODY' && dom.tagName!='HTML') {
                dom = dom.parentNode;
                xy.x += dom.offsetLeft;
                xy.y += dom.offsetTop;
            }
            // xy.y += dom.offsetTop;
            xy.y += document.body.scrollTop;
            return xy;
        },
        getOffsets:function(dom) {
            var xy = {x:0, y:0};
            xy.x += dom.offsetLeft;
            xy.y += dom.offsetTop;
            while (dom.className!='colorPicker' && dom.tagName!='BODY' && dom.tagName!='HTML') {
                dom = dom.parentNode;
                xy.x += dom.offsetLeft;
                xy.y += dom.offsetTop;
            }
            // xy.y += dom.offsetTop;
            xy.y += document.body.scrollTop;
            return xy;
        },
        stopBodyScroll:function(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        pos : function(value) {
            var wrap = React.findDOMNode(this.refs["wrap"]);
            var cursor = React.findDOMNode(this.refs["cursor"]);
            var rate = (value - 0) / 100;
            var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
            cursor.style.left = left + "px";
            var c = React.findDOMNode(this.refs.canvasRange);
            var cxt=c.getContext('2d');
            var rgba = cxt.getImageData(left, 5, 1, 1).data;
            this.setState({
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] / 255
            });
        },
        handlerChange : function(e) {
            var value = parseInt(e.target.value);
            this.pos(value)
        },
        render: function(){
            var colorPickerIndex = 0;
            var  colorPickerShow = false;
            console.log(this.props)
            if(this.props.activeType){
                colorPickerIndex = this.props.activeType || 0;
            }
            if(this.state){
                colorPickerShow = this.state.colorPickerShow || false;
            }
            var colorIndex = -1;
            var lampColor = [{pName:"cp-rect-one"},{pName:"cp-rect-two"},{pName:"cp-rect-three"},{pName:"cp-rect-four"},{pName:"cp-rect-five"},{pName:"cp-rect-six"},{pName:"cp-rect-seven"}];
            var colorArray = ['#fe5c45', '#fc8108', '#fcb40a', '#8dcb38', '#1ce2d3', '#2accfa', '#725af6'];
            var r,g,b,a;
            var wh = 225;
            var x = wh / 2 - 10;
            var y = wh / 2 - 10;
            if(this.state){

                r = this.state.r || 255;
                g = this.state.g || 255;
                b = this.state.b || 255;
                a = this.state.a || 1;
                x = this.state.x || x;
                y = this.state.y || y;
            }else{
                r = 255;
                g = 255;
                b = 255;
                a = 1;
            }
            var rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
            var color = '#' + (parseInt(r)<17?('0'+parseInt(r).toString(16)):parseInt(r).toString(16)) + (parseInt(g)<17?('0'+parseInt(g).toString(16)):parseInt(g).toString(16)) + (parseInt(b)<17?('0'+parseInt(b).toString(16)):parseInt(b).toString(16));
            var colorIndex = colorArray.indexOf(color);
            if (colorIndex > -1) {

            } else {
                if (r == 255 && g == 255 && b == 255) {

                } else {
                    colorIndex = 0;
                    colorArray[0] = color
                }
            }
            var _state = typeof __props !== 'undefined' ? __props : '';
            var imgSrc = 'data:image/png;base64,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'
            return (
                <section {...this.props} ref={this.props.ref} className="colorpicker">
                    <div className="cp-wrap" onTouchStart={this.stopBodyScroll} style={{display:colorPickerIndex==0?'block':'none'}}>
                        <div ref="wrap" data-show={colorPickerIndex==0?'true':'false'} id="canvasWrap" className="canvas-wrap" style={{width:wh,height:wh}} onTouchMove={this.selectColor}
                            onTouchStart={this.selectColor} onTouchEnd={this.submitColor}>
                            <canvas ref="canvas" width={wh} height={wh}></canvas>
                            <i style={{top:y-10, left:x-10}}></i>
                        </div>
                    </div>
                    <div className="cp-rect" style={{display:colorPickerIndex==1?'block':'none'}}>
                        {lampColor.map((item,index)=>{
                            if(index==colorIndex){
                                return  <div key={index} className={item.pName} onTouchStart={this.addBackground} onTouchEnd={this.submitPickerColor} style={{background:(colorArray)[index]}}>
                                            <i className="cp-rect-selected"></i>
                                        </div>
                            }else{
                                return  <div key={index} className={item.pName} onTouchStart={this.addBackground} style={{background:(colorArray)[index]}}>
                                            <i></i>
                                        </div>
                            }  
                        })}
                        <span className="cp-rect-select" onTouchStart={this.showPickerColor}><img src={imgSrc}/></span>
                    </div>
                    <div className="colorPicker" style={{display:colorPickerShow?'block':'none'}} onTouchStart={this.stopBodyScroll} >
                        <div className="cp-wrap-top" onTouchEnd = {this.canclePickerColor}></div>
                        <div className="cp-wrap" onTouchStart={this.stopBodyScroll}>
                            <div ref="wrap" id="canvasWraps" className="canvas-wrap" style={{width:'225px',height:'225px'}} onTouchMove={this.selectPickerColor}
                                onTouchStart={this.selectPickerColor} onTouchEnd={this.submitPickerColor}>
                                <canvas ref="pickerCanvas" width={225} height={225}></canvas>
                                <i style={{top:y-10, left:x-10}}></i>
                            </div>
                        </div>
                    </div>
                    <div className="cp-range" style={{display:colorPickerIndex==2?'block':'none'}}>
                        <label ref="wrap">
                            <input type="range" min={0} max={100} onChange={this.handlerChange} onTouchEnd={this.submitPickerColor}/>
                            <canvas className='canvasRange' ref="canvasRange" width={345} height={9}></canvas>
                            <i ref="cursor" className="cursor"></i>
                        </label>
                    </div>
                </section>
            );
        }
    })`
};