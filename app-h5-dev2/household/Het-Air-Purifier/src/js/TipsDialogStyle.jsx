/**
 * 弹出框组件
 * @prop {string}   title 标题
 * @prop {string}   leftpam 左边点击框文字
 * @prop {string}   rightpam 左边点击框文字
 * @prop {boolean}   show 是否显示
 * @prop {function}  cancelClock   取消，点击后的回调函数
 * @prop {function} submitClock   确定，点击后的回调函数
 * @prop {string} content   内容
 */
export class TipsDialogStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOpacity:0,
            timeDisplay:false
        };
    }

    endDefault(e){
        //阻止touchend事件向上冒泡
        e.stopPropagation();
        e.preventDefault();
    }

    touchconform(e) {
        e.stopPropagation();
        if (typeof this.props.closeLifeTips==='function') {
            this.props.closeLifeTips();
        }
    }
    touchcanle(e) {
        e.stopPropagation();//取消时间冒泡
        if (typeof this.props.closeLifeTips==='function') {
            this.props.closeLifeTips();
        }
    }

    render() {
        let title = this.props.title == undefined?"滤芯到期":this.props.title;
        // let content = this.props.content == undefined?"--":this.props.content;
        let leftpam = this.props.leftpam == undefined?"我知道了":this.props.leftpam;
        // let rightpam = this.props.rightpam == undefined?"确定":this.props.rightpam;
        let show = this.props.show;

        // let ErrItems = this.props.errs == undefined ? [] : this.props.errs;

         let items = "您的滤芯寿命已小于5小时";
        // for(var index in ErrItems){
        //     if(index>2)break;
        //     let item = ErrItems[index];
        //     items.push(<li key={index}>{item}</li>);
        // }

        return  (<section style={{display:show?"":"none"}} className='fade_c_section' >
            <section className="fade_c_section" onTouchEnd={this.touchcanle.bind(this)}>
                <section onTouchMove={this.endDefault}>
                    <div className="fade_c"></div>
                    <div className="succ-pop">
                        <p className="title">{title}</p>
                        <section className="pop_div">
                            <div className="pop_content">{items}</div>
                        </section>
                        <div className="flex conformd">
                            <p className="flex-cell" onTouchEnd={this.touchcanle.bind(this)}><span>{leftpam}</span></p>
                            {/*<p className="flex-cell btn_sure"onTouchEnd={this.touchconform.bind(this)}><span>{rightpam}</span></p>*/}
                        </div>
                    </div>
                </section>
            </section>
        </section>);
    }
}