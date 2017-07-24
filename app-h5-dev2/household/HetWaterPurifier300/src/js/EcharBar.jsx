/**
 * Created by liuzh on 2016-11-14.
 * echars bar class
 */
import {EcharsLine} from './EcharsLine.jsx'
export class EcharBar extends EcharsLine{
    constructor(name,type,symbol,symbolSize,data,color,barWidth,showMartline){
        super(name,type,symbol,symbolSize,data,color);
        this.barWidth = barWidth || 8;
        //this.stack = '水质';
        if(showMartline){
            this.markLine = {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'average', name: '平均值'}
                ],
                itemStyle : {
                    normal: {
                        label:{
                            show: true,
                            textStyle:{
                                align:'center',
                                baseline:'bottom'
                            }
                        }
                    }
                }
            }
        }else {
            this.markLine = {
            }
        };
        this.precision=1;
        this.itemStyle = {
            normal: {
                color: color || '#B8CFE1',
                barBorderRadius:5,
                label:{
                    show: false,
                    textStyle:{
                        color:'#848484'
                    }
                }
            }
        };
    }
};