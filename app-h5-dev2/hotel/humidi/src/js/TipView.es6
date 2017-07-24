
export const TipState = {TipStateMistTip:0,
            TipStateClose:1,
            TipStateLackWater:2};


/**
 * 缺水提示语view
 */
export class TipView extends React.Component{

    constructor(props){
        super(props)
        //不需要自身来控制是否显示
        // this.state = {tipState:this.props.tipState};
    }
    disMiss(){
        //缺水提示2，清理雾化网提示1，缺水提示不能关闭提示
        if(this.props.tipState === TipState.TipStateLackWater){
            return;
        }
        this.props.disMiss();
    }

    componentDidMount(){
        let tip = this.refs.tipView;
        if(tip){
            tip.addEventListener("transitionend",()=>{
                if(this.props.tipState === TipState.TipStateClose){
                    // tip.style.visibility = "hidden";
                }
                console.log(111);
            });
        }
    }

    render(){
        let tipStr = "主人及时清理雾化网,可以延长我的寿命";
        if(this.props.tipState == TipState.TipStateMistTip){
            tipStr = "主人及时清理雾化网,可以延长我的寿命";
        }else if(this.props.tipState == TipState.TipStateLackWater){
            tipStr = "香薰机因缺水暂停了";
        }

        let tip = this.refs.tipView;
        if(tip){
            if(this.props.tipState === TipState.TipStateClose){
                tip.classList.remove('showAnimation');
                tip.classList.add('disMissAnimation');
            }else{
                tip.classList.remove('disMissAnimation');
                tip.style.visibility = "visible";
                tip.classList.add('showAnimation');
            }
        }
        return(
        <section className="tipView" ref="tipView">
            <span>{tipStr}</span>
            <div className="close" onTouchEnd={this.disMiss.bind(this)} style={{visibility:this.props.tipState === TipState.TipStateLackWater ?'hidden':'visible'}}></div>
        </section>
        );
    }
};
