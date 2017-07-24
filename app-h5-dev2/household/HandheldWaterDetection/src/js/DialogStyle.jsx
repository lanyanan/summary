/**
 * @fileName: DialogStyle.jsx
 * Created by liuzh on 2017-01-18
 * 弹出框组件
 * @prop {string}   title 标题
 * @prop {string}   leftpam 左边点击框文字
 * @prop {string}   rightpam 左边点击框文字
 * @prop {boolean}   show 是否显示
 * @prop {function} submitClock   确定，点击后的回调函数
 * @prop {string} content   内容
 * @prop {array} contentList   内容列表
 */
export class DialogStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showOpacity: 0,
            timeDisplay: false
        };
    }

    endDefault(e) {
        //阻止touchend事件向上冒泡
        e.stopPropagation();
        e.preventDefault();
    }

    touchcanle(e) {
        e.stopPropagation();//取消时间冒泡
        let canCel = this.props.canCel || false;
        if (canCel && typeof this.props.cancelClock === 'function') {
            this.props.cancelClock();
        }
    }

    touchconform(e) {
        e.stopPropagation();
        if (typeof this.props.submitClock === 'function') {
            this.props.submitClock();
        }
        e.preventDefault();
    }

    render() {
        let content = this.props.content == undefined ? "--" : this.props.content;
        let rightpam = this.props.rightpam == undefined ? "知道了" : this.props.rightpam;
        let show = this.props.show;

        let contentList = this.props.contentList == undefined ? [] : this.props.contentList;
        let lis = [];
        let items = ['TDS:', 'TOC:', '色度:', '浊度:', 'COD:'];
        for (var index in contentList) {
            lis.push(<li key={index}><span>{items[index]}</span>{contentList[index]} </li>);
        }
        return (<section style={{display: show ? "" : "none"}} className='fade_c_section'>
            <section className="fade_c_section" onTouchEnd={this.touchcanle.bind(this)}>
                <section onTouchMove={this.endDefault}>
                    <div className="fade_c" onTouchEnd={contentList.length == 0 ? "":this.touchconform.bind(this)}></div>
                    <div className={contentList.length == 0 ? "succ-pop" : "succ-pop tips"}>
                        <section className="pop_div">
                            {contentList.length == 0 ? <p className="pop_content">{content}</p> :
                                <ul className="pop_con">{lis}</ul>}
                        </section>
                        <div className="flex conformd" style={{display: contentList.length == 0 ? "" : "none"}}>
                            <p className="flex-cell" onTouchEnd={this.touchconform.bind(this)}><span>{rightpam}</span>
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </section>);
    }
}