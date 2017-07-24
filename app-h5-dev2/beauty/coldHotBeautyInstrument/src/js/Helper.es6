export class Helper extends React.Component{
    constructor() {
        super();
        this.state={

        }
    }

    render() {

        return (
            <section>
                <div className="coldHot-help flex">
                    <img src="../static/img/deviceLogo.png" alt="logo"/>
                </div>

                <div className="m-device flex">
                    <div className="tip-container">
                        <div className="step flex">
                            <div className="left flex">
                                <span>01</span>
                                <em></em>
                            </div>
                            <p className="right">手动模式下,可选择不同的护理模式,也可自定义“我的模式”。“我的模式”总时间不得超过10分钟</p>
                        </div>

                        <div className="step flex step2">
                            <div className="left flex">
                                <span>02</span>
                                <em></em>
                            </div>
                            <p className="right">震动功能:当美颜仪为热敷时,短按热敷键可开启震动冷敷状态下同理.App在手动模式下也可控制</p>
                        </div>

                        <div className="step flex step3">
                            <div className="left flex">
                                <span>03</span>
                                <em></em>
                            </div>
                            <p className="right">美颜仪温度范围：6℃-46℃，精度在±2℃。请根据自身皮肤状况，选择您认为最舒服的温 度档位使用。</p>
                        </div>
                    </div>
                    
                </div>

            </section>
            )
    }
}