/**
 * Created by yuanyunlong on 2017/2/13.
 */

import {washerModeS} from  './WasherCommonData.js';


export class ModeSetingPage extends React.Component {

    constructor(props){
        super(props);

        this.state= {
           isShowModeSetingPage : true
        }
    }
    componentDidMount() {
        //导航栏:{ios:73,android:64}
    }

    handleMode(e){
        //阻止IOS上冒泡触发iscroll事件
        e.stopPropagation();
        e.preventDefault();

        let index = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log("mode:" + washerModeS[index].name);

        // Actions.setingPageSetModeAction(index);
        this.setState({
            waterMode:index
        });

        if(typeof this.props.setingModeFunction === 'function'){
            this.props.setingModeFunction(index);
        }
    }

    handleTouchAction(){
        if(typeof this.props.setingModeFunction === 'function'){
            this.props.setingModeFunction(-1);
        }
    }

    render(){
        let height = window.screen.height ;
        let workingPageHeight = 216;
        let translateYValue = workingPageHeight +  height;
        let translateYValuePX =  translateYValue + 'px';
        let style =  this.props.show ? {transform: 'translateY(0px)',webkitTransform: 'translateY(0px)'} : { transform: 'translateY('+ translateYValuePX +')', WebkitTransform: 'translateY(' + translateYValuePX +')' };
        let currentMode = this.state.waterMode != undefined ? this.state.waterMode : this.props.workMode;



        console.log("style " + this.props.show + " " + JSON.stringify(style) + " currentMode" + this.state.waterMode);

        return (<div className="ModeSetingPage " style={style} onTouchStart={this.handleTouchAction.bind(this)}>
            <div className="ModeSeing">
                <h1>模式</h1>
                <dl className="flex mode-items">
                    {washerModeS.map(function (o) {
                        return <dd style={{'backgroundImage':'url(../static/image/mode/m-'+o.id+(o.id==currentMode?'-on.png)':'-off.png)')}}
                                   className={"mode " + (currentMode === o.id ? 'on':'')}
                                   key={o.id}
                                   data-mode={o.id}
                                   onTouchStart={this.handleMode.bind(this)}>
                            {o.name}
                        </dd> ;
                    }.bind(this))}
                </dl>
            </div>

        </div>);
    }
}