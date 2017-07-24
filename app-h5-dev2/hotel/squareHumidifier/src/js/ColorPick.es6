/**
 * 切换灯,雾组件
 * @prop {number}    light 当前灯值
 * @prop {number}    mist  当前雾值
 */
import {Actions} from './Actions.es6';

export class ColorPick extends React.Component{
    constructor() {
        super();
    }
    changeColor(e){
    
        if(this.props.light == 3) return   //如果灯关闭，颜色不可选并且背景置灰
        let newcolor = e.currentTarget.getAttribute('data-value');
        if(newcolor==this.props.color) return;
        Actions.changeColor(newcolor);
    }
    render() {
        let color = Number(this.props.color) || 0;
        let items = [1,2,3,4,5,6,7];
        let limit; //如果灯关闭，颜色不可选并且背景置灰
        if(this.props.light==3){limit=0}
        return (
                  
            <ul className="colorpick flex" id={limit==0?'li':'mit'}>
            	{items.map((item,index)=>{
                    // console.log('this.this.props.',color,index);
            		return(
            			<li key={index} className='flex-cell' data-value={item} onTouchEnd={this.changeColor.bind(this)}>
		                    <img src={color-1==index?'../static/img/color-'+item+'-on.png':'../static/img/color-'+item+'.png'}  />
		                </li>
            		)
            	})}
            </ul>
        );
    }
};   
