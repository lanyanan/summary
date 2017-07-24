'use strict';
/**
*泡泡动画组件
*/
export const Bubble = React.createClass({
    componentDidMount(){
        var canvas=document.getElementById('bubbleCanvas');
        var ctx;
        var CANVAS_WIDTH=document.body.scrollWidth*0.8;  
        var CANVAS_HEIGHT=document.body.scrollHeight*0.4;
        var MASK_R=30;
        var _this=this;
        var bubbleImg="../static/img/bubble.png";
        canvas.width= CANVAS_WIDTH;
        canvas.height=CANVAS_HEIGHT;
        ctx=canvas.getContext("2d");

        //创建圆模型
        var circle=function(){
            this.wid=CANVAS_WIDTH;
            this.hei=CANVAS_HEIGHT;
            this.x=x;
            this.y=y;
            this.h=h;
            this.w=w;
            this.speedX=Math.random()*10-5>=0.5?0.5:Math.random()*10-5;
            this.speedY=Math.random()*10-5>=0.5?0.5:Math.random()*10-5;
            this.con=ctx;
            this.move=function(){
                var con=this.con;
                con.beginPath();
                var img=new Image();
                img.src=bubbleImg;
                this.con.drawImage(img,this.x,this.y,this.w,this.h);
                this.x+=this.speedX;
                this.y+=this.speedY;
                if(this.x>=CANVAS_WIDTH-MASK_R){  
                    this.speedX=-Math.abs(this.speedX);  
                }  
                if(this.x<=MASK_R){  
                    this.speedX=Math.abs(this.speedX);  
                }  
                if(this.y>=CANVAS_HEIGHT-MASK_R){  
                    this.speedY=-Math.abs(this.speedY);  
                }  
                if(this.y<=MASK_R){  
                    this.speedY=Math.abs(this.speedY);  
                } 
            }
        }
        //创建帧动画
        var Far=function(){
            this.width=CANVAS_WIDTH;
            this.height=CANVAS_HEIGHT
            this.context=ctx;
            this.sint=null;
            this.squares=[];//创建数组，用于存放圆实例
            this.callback=function(param){
                return function () {param.render()}
            };
            this.start=function () {
                _this.interval=setInterval(this.callback(this),45)
            },
            this.render=function () {
                this.context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
                /*遍历每个圆实例，从而让运动轨迹发生变化*/
                for(i in this.squares){
                    this.squares[i].move();//调用圆的运动方法 
                }
            }
        }
        var frame=new Far();
        for(var i=0;i<=2;i++){
            var x=Math.random()*(canvas.width),
                y=Math.random()*(canvas.height),
                w=Math.random()*25,
                h=0;
                if(w>=25||w<=15) w=25;
                h=w;
            frame.squares[i]=new circle(x,y,w,h);
        }
        frame.start();
    },
    componentWillUnmount(){
        clearInterval(this._interval);
    },
    render(){
        return <canvas id="bubbleCanvas" ></canvas>
    }
})