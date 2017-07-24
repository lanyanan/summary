'use strict';
/**
*波浪动画组件
*/
export const Wave = React.createClass({
    componentDidMount(){
        var canvas = document.getElementById('waveCanvas');
        var ctx = canvas.getContext('2d');
        var leaf=new Image();
        leaf.src="../static/img/leaf.png"
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = canvas.parentNode.offsetHeight/4;
        window.requestAnimFrame = (function(){
            return window.requestAnimationFrame||
                   window.webkitRequestAnimationFrame||
                   window.mozRequestAnimationFrame||
            function(callback ){
                window.setTimeout(callback, 1000 / 60);
            };
        })();
        var step = 0;
        var lines = ["rgba(143,207,253, 0.3)", "rgba(143,207,253,0.5)", "rgba(143,207,253, 1.0)","rgba(143,207,253, 0.2)"];

        function loop(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            step++;
            //画3个不同颜色的矩形
           for(var j = lines.length - 1; j >= 0; j--) {
                 //每个矩形的角度都不同，每个之间相差45度
                 var angle = (step+j*45)*Math.PI/180;
                 var deltaHeight = Math.sin(angle) *20;
                 var deltaHeightRight = Math.cos(angle) *20;
                 ctx.beginPath();
                 if(j===0) {
                    var imageY = canvas.height/2+deltaHeight-80;
                    imageY = imageY<10?Math.abs(imageY):imageY;
                    ctx.drawImage(leaf,canvas.width /2, imageY,50,45);
                 }
                 ctx.fillStyle = lines[j];
                 ctx.moveTo(0, canvas.height/2+deltaHeight);
                 ctx.bezierCurveTo(canvas.width /2, canvas.height/2+deltaHeight-20, canvas.width / 2,canvas.height/2+deltaHeightRight-20, canvas.width, canvas.height/2+deltaHeightRight);
                 ctx.lineTo(canvas.width, canvas.height);
                 ctx.lineTo(0, canvas.height);
                 ctx.lineTo(0, canvas.height/2+deltaHeight);
                 ctx.closePath();
                 ctx.fill();
            }
            requestAnimFrame(loop);
        }
        loop();
    },
    render(){
        return <canvas id="waveCanvas"></canvas>
    }
})