export class addDevice extends React.Component{
    constructor() {
        super();
        this.state={

        }
    }

    render() {

        return (
            <div>
                <div className="m-add flex">
                    <div className="m-add-con flex">
                        <div className="m-add-logo">
                            <img src="../static/img/add.png" alt="logo"/>
                        </div>
                        <div className="m-add-tip">
                            <p>1.长按开/关键! 长按3秒,直 到听到“滴滴滴”声. </p>
                            <p>2.屏幕上WiFi图标开始闪烁</p>
                        </div>
                    </div>
                </div>
                
                <div className="m-add-voice flex">
                    听到滴滴滴声了
                </div>
               
            </div>
            )
    }
}