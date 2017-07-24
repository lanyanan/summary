'use strict';
/**
 * 首页
 */
export class SwiperIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    handle2Tds(){
        location.href = '#/TdsInfo';
    }
    handle2Curve(){
        location.href = '#/CurveModel';
    }

    render() {
        let waterInfo = this.props.waterData;
        let TextWaterTDs = waterInfo.SourceWater.SourceWaterTds + "/" + waterInfo.PureWater.PureWaterTds;
        let MachineOperationState = waterInfo.MachineOperationState;
        let online = waterInfo.online;
        let TextDeviceState = ["设备未连接","设备待机中","设备冲洗中","设备制水中",""];
        let TextDevice = online == 2?TextDeviceState[0]: MachineOperationState == 0?
            TextDeviceState[1]:MachineOperationState == 1?TextDeviceState[2]:MachineOperationState == 2?TextDeviceState[3]:TextDeviceState[4];
        let setMode = MachineOperationState == 1? 1 : 0;
        let error = false;
        let errorTmp = false;
        if(waterInfo.SourceWater.SourceWaterTds > 1000 || waterInfo.SourceWater.SourceSpectrumTOC > 5 || waterInfo.SourceWater.SourceSpectrumCOD > 5||
         waterInfo.SourceWater.SourceSpectrumColor > 15 || waterInfo.SourceWater.SourceSpectrumTurbidity > 3  ||
         waterInfo.PureWater.PureWaterTds > 1000 || waterInfo.PureWater.PureSpectrumTOC > 5 || waterInfo.PureWater.PureSpectrumCOD > 5||
            waterInfo.PureWater.PureSpectrumColor > 15 || waterInfo.PureWater.PureSpectrumTurbidity > 3){error = true}
        if(waterInfo.SourceWater.SourceWaterTemprature > 38 || (waterInfo.SourceWater.SourceWaterTemprature < 5 && waterInfo.SourceWater.SourceWaterTemprature != 0)){
            errorTmp = true;
        }
        let TextErr = error?<p style={{color:"#ff632c",fontSize:'1.16rem'}} >{errorTmp?"水温&水质异常": "水质异常"}</p>:errorTmp?<p style={{color:"#ff632c",fontSize:'1.16rem'}} >水温异常</p>:"";
        return  (
            <section className="index_Swp">
                <section className="tds_cir">
                    <article onTouchEnd={this.handle2Curve.bind(this)}>
                        <img src="../static/img/tongji.png"/>
                        <p>统计</p>
                    </article>
                    <section className="out_cir">
                        <section className={MachineOperationState == 1?"out_cir_rd":""}>
                        </section>
                        <section className="in_cir">
                            <figure >
                                <p>源水水质/纯水水质 </p>
                                <p style={{fontSize:TextWaterTDs.length > 8?"3.46rem":"4.5rem"}}>{TextWaterTDs}<span>TDS</span></p>
                                <p onTouchEnd={this.handle2Tds.bind(this)}>点击查看水质详情</p>
                                {TextErr}
                            </figure>
                        </section>
                    </section>
                    <div className="device_state">
                        <p>{TextDevice}</p>
                    </div>
                </section>
            </section>);
    }
}