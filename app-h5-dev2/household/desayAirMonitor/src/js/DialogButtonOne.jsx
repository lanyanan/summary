/**
 * 弹出框组件
 * @prop {string}   title 标题
 * @prop {string}   button_content 左边点击框文字
 * @prop {boolean}   show 是否显示
 * @prop {function}  cancelClock   取消，点击后的回调函数
 * @prop {function} submitClock   确定，点击后的回调函数
 * @prop {string} content   内容
 */
export class DialogButtonOne extends React.Component {
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
        if (typeof this.props.submitClock==='function') {
            this.props.submitClock();
        }
        e.preventDefault();
    }
    touchcanle(e) {
        e.preventDefault();
        e.stopPropagation();//取消时间冒泡
        if (typeof this.props.cancelClock==='function') {
            this.props.cancelClock();
        }
    }
    render() {

        let style = {
            wrapper: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: '-webkit-box',
                WebkitBoxAlign: 'center',
                WebkitBoxPack: 'center',
                background: 'rgba(0,0,0,0.5)',
                opacity: this.state.opacity
            },
        };

        let title = this.props.title == undefined?"默认标题":this.props.title;
        let content = this.props.content == undefined?"--":this.props.content;
        let buttonContent = this.props.button_content == undefined?"我知道了":this.props.button_content;
        let show = this.props.show;
        return  (<section style={{display:show?"":"none"}} className='fade_c_section' >
            <section className="fade_c_section" onTouchEnd={this.touchcanle.bind(this)}>
                <section onTouchMove={this.endDefault}>
                    <div className="fade_c"></div>
                    <div className="succ-pop">
                        <p className="title">{title}</p>
                        <section className="pop_div">
                            <p className="pop_content">{content}</p>
                        </section>
                        <div className="flex conformd">
                            <p className="flex-cell"onTouchEnd={this.touchconform.bind(this)}><span>{buttonContent}</span></p>
                        </div>
                    </div>
                </section>
            </section>
        </section>);
    }
}