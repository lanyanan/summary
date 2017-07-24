/**
 * Created by ben on 2017/1/16.
 */
/**
 * Created by Kalen on 2017-1-16.
 */
export class HexToFloat{
    constructor(){
    }
    toFloat(s){
        var num = parseInt(s,16);//将十六进制(字符串)转换为十进制数值
        var res = num.toString(2);//将十进制数值转换为二进制(字符串)
        //转字符串会损失以0开头的0, 所以要补零

        var j0=32-res.length;
        // alert('少了多少个'+j0);
        if(res.length<32){
            for(var i=0;i<j0;i++){
                res ='0'+res;
            }
        }
        //alert('res  '+res);


        //第一个字符代表正负,等于1的时候是负数.等于0是正数
        var sub0 =res.substr(0,1);
        // alert('sub0 '+sub0);
        if (sub0==1) {
            //负数
            sub0 =-1;
        }else{
            //正数
            sub0 =1;
        }


        //拆分计算指数
        var sub1 = res.substr(1,8);//拆分第二位到第九位的八位二进制数为指数位
        //alert('sub1 '+sub1);
        var num2 = parseInt(sub1,2);//将二进制指数转换为十进制
        if(num2-127>=0){
            num2 = num2 - 127;//求出指数用转换的十进制数减去127就可以得到
        }
        // alert('num2 '+num2);

        //拆分尾数
        var sub2 = res.substr(9,23);//拆分出后23位二进制数为科学计数法的尾数位

        var numEE=1;
        for(var i=0;i<sub2.length;i++){
            numEE+=sub2.substr(i,1)/Math.pow(2,i+1);
        }

        numEE=sub0*numEE * Math.pow(2,num2);
        return numEE;
    }
    toHex(e){

        var totalBinary;
        //1.符号部分
        if (e>0) {
            totalBinary='0';
        }else{
            totalBinary='1';
            e = -e;
        };

        //把float转成二进制
        /*将二进制形式的浮点实数转化为规格化的形式:(小数点向左移动7个二进制位可以得到)
        10110010.001=1.0110010001*2^7 因而产生了以下三项
        符号位：该数为正数,故第31位为0,占一个二进制位.
        阶码：指数为7,故其阶码为127+7=134=(10000110)(二进制),占从第30到第23共8个二进制位.
            尾数为小数点后的部分, 即0110010001.因为尾数共23个二进制位,在后面补13个0,即01100100010000000000000*/
        var res=e.toString(2);
        console.log('res ',res);
        var num1 =res.length-1;
        var sub1 = 127+num1;
        //指数 指数部分 8位
        var total1 =  sub1.toString(2);
        console.log('total1 ',total1);

         //alert('total1 '+total1);
        //尾数部分 23位
        // alert('num1 '+res.length);
        var sub2 = (res/Math.pow(10,num1)-1).toFixed(8);
        var total2 = ''+sub2;
        // alert('total2 '+total2);
        total2 = total2.substr(2,8);
        for (var i=0;i<15;i++) {
            total2 = total2+'0';
        };
        console.log('total2 ',total2);

        totalBinary = totalBinary+total1+total2;
        console.log('totalBinary ',totalBinary);
        //转十进制
        var totalInt =parseInt(totalBinary,2);

        var totalHex= totalInt.toString(16);
        console.log('totalHex *******************',totalHex);
        return totalHex;

    }
};