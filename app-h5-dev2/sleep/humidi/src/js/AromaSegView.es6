export const ModeState = {
    ModeState0:0, //轮播关闭模式
    ModeState1:1, //轮播渐变颜色的模式
    ModeState2:2, //轮播确定颜色的模式
    ModeState3:3 //单色模式
};
export class AromaSegView extends React.Component{
    constructor(props){
        super(props);
    }

    tapMode(e){
        let index = e.currentTarget.getAttribute("data-val");
        index = parseInt(index);
        if (typeof this.props.changeMode === 'function') {
            this.props.changeMode(index);
        }
    }
    render(){
        return(
            <section className="aromaSegView">
                <ul>
                    <li className={this.props.modeState < ModeState.ModeState3?'aromaSegSelect':''}><a href="#" onTouchEnd={this.tapMode.bind(this)} data-val={Number(0)}>轮播模式</a></li>
                    <li className={this.props.modeState == ModeState.ModeState3?'aromaSegSelect':''} ><a href="#" onTouchEnd={this.tapMode.bind(this)} data-val={Number(1)}>单色模式</a></li>
                </ul>
            </section>
        );
    }
}
