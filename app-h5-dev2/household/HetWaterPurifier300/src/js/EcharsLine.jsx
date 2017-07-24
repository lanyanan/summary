/**
 * Created by liuzh on 2016-11-14.
 * echars line class
 */
export class EcharsLine{
    constructor(name,type,symbol,symbolSize,data,color){
        this.name = name || '';
        this.type = type || 'line';
        this.symbol = symbol || 'circle';
        this.symbolSize = symbolSize || 4;
        this.data = data || [];
        this.itemStyle = {
            normal: {
                color: color || '#B8CFE1',
                label : {
                    show: true,
                    textStyle:{
                    color:'#848484'
                    }
                }
            }
        };
    }
};