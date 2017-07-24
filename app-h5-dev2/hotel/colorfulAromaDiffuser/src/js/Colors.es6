/**
 * 7颜色选择组件
 * @prop {integer}  colorIndex 颜色索引，设置不同颜色，取值1-7
 * @prop {boolean}  disabled   是否可用，缺省为可用
 * @prop {function} cb         切换颜色时触发
 */
import {ColorPicker} from '../../../common/src/lib/colorPicker/ColorPicker.es6';

export class Colors extends React.Component{
    constructor() {
        super();
        this.items = [1,2,3,4,5,6];
        // 颜色数组，注：必须6位十六进制值
        this.colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', '--'];
        this.state = {
            colorPickerShow : false
        };
    }
    handlerClick(e) {
        e.preventDefault();
        if (this.props.disabled) return;
        let index = parseInt(e.currentTarget.getAttribute('data-val'));
        let color = this.toRGB(this.colors[index-1]);
        if (typeof this.props.cb==='function') {
            this.props.cb(color, index);
        }
    }
    cusColorChange(color) {
        let index = 1;
        this.colors[0] = `#${pad0(color.r.toString(16))}${pad0(color.g.toString(16))}${pad0(color.b.toString(16))}`;
        if (typeof this.props.cb==='function') {
            this.props.cb(color, index);
        }
        function pad0(hex) {
            return hex.replace(/^\b(?=.$)/, '0');
        }
    }
    cusColorClick(e) {
        e.preventDefault();
        if (this.props.disabled) return;
        this.setState({
            colorPickerShow: true
        });
    }
    colorPickerClose(e) {
        this.setState({
            colorPickerShow: false
        });
    }
    toRGB(hexStr){
        let hex = hexStr.replace(/^#/, '');
        return {
            r: parseInt(hex.substring(0,2), 16),
            g: parseInt(hex.substring(2,4), 16),
            b: parseInt(hex.substring(4,6), 16)
        };
    }
    render() {
        let idx = this.props.colorIndex || 1;
        return (
            <section className='colors flex'>
                {this.items.map(function(i){
                    return <a key={i} data-val={i} href='#' className={(i==idx?'on':'') + ' flex-cell'} onTouchStart={this.handlerClick.bind(this)}><b style={{backgroundColor: this.colors[i-1]}}></b></a>;
                }.bind(this))}
                <a data-val="7" href="#" className={(7===idx?'on':'') + ' flex-cell'} onClick={this.cusColorClick.bind(this)}><b className={'c7'}></b></a>
                <ColorPicker show={this.state.colorPickerShow} cb={this.cusColorChange.bind(this)} close={this.colorPickerClose.bind(this)} />
            </section>
        );
    }
};
