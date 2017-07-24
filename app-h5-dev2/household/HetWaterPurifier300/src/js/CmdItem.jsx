/**
 * Created by liuzh on 2016-11-14.
 * id h5添加标签使用
 * nameFilter 滤芯名字
 * JdFilter 滤芯名字简称
 * lifeTime 剩余寿命 %
 * coefficient 寿命百分比换算天数的 系数
 * sendCmd 滤芯复位的参数
 */
export class CmdItem{
    constructor(id,nameFilter,JdFilter,lifeTime,coefficient){
        this.id = id || 1,
        this.nameFilter = nameFilter || "",
        this.JdFilter = JdFilter || "",
        this.lifeTime= lifeTime || '0',
        this.coefficient= coefficient || 10,
        this.items = [
                {UFReset: "01",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(4,1,6)},
                {UFReset: "00",ROFilterReset:"01",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(5,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "01",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(6,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"01",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(7,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"01"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(8,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "01",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(9,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"01",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(10,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"01",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(11,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "01",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(12,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"01"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(13,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "01",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(14,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"01",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(15,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"01",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(16,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "01",SYSFilterReset:"00"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(17,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"01"
                    ,MSFilterReset: "00",updateFlag:  het.hexUpFlag(18,1,6)},
                {UFReset: "00",ROFilterReset:"00",KLJXYKHXTFilterReset: "00",CTOFilterReset:"00",PPFilterReset:"00"
                    ,KDFFilterReset: "00",MFSFilterReset:"00",TCFilterReset:"00",YHWKHSFilterReset: "00",HZHXTFilterReset:"00"
                    ,FLZNLQFilterReset: "00",RHFilterReset:"00",CHFilterReset:"00",GLJFilterReset: "00",SYSFilterReset:"00"
                    ,MSFilterReset: "01",updateFlag:  het.hexUpFlag(19,1,6)}
        ];
        this.sendCmd = this.items[id - 1];

    }
};