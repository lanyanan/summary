'use strict';
/**
 *波浪动画组件
 */
export const Wave = React.createClass({
    componentDidMount(){
        var canvas = document.getElementById('waveCanvas');
        var ctx = canvas.getContext('2d');
        // var leaf=new Image();
        canvas.width = canvas.parentNode.offsetWidth;
        canvas.height = canvas.parentNode.offsetHeight*2;
        window.requestAnimFrame = (function(){
            return window.requestAnimationFrame||
                window.webkitRequestAnimationFrame||
                window.mozRequestAnimationFrame||
                function(callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var step = 0;
        var lines = ["rgba(255,255,255, 1)","rgba(255,255,255, 0.5)","rgba(255,255,255, 0.3)"];
        function loop(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            step++;
            //画3个不同颜色的矩形
            for(var j = lines.length - 1; j >= 0; j--) {
                if(j===0) {
                    var imageY = canvas.height/2+deltaHeight-75;
                    imageY = imageY<10?Math.abs(imageY):imageY;
                }
                //每个矩形的角度都不同，每个之间相差45度
                var angle = (step+j*45)*Math.PI/180;
                var deltaHeight = Math.sin(angle) *20;
                var deltaHeightRight = Math.cos(angle) *20;
                ctx.beginPath();
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
        return <canvas id="waveCanvas">

            </canvas>
    }
})