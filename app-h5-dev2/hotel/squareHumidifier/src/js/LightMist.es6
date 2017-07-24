/**
 * 切换灯,雾组件
 * @prop {number}    light 当前灯值
 * @prop {number}    mist  当前雾值
 */
import {Actions} from './Actions.es6';

export class LightMist extends React.Component{
    constructor() {
        super();
        this.lightitem = ['全亮灯','半亮灯','关闭灯'];
        this.mistitem = ['全喷雾','半喷雾','关闭雾'];
    }
    changeLight(){
        let newlight = this.props.light?Number(this.props.light)+1:1;
        newlight = newlight>3?1:newlight;
        Actions.changeLight(newlight);
    }
    changeMist(){
        let newmist = this.props.mist?Number(this.props.mist)+1:1;
        newmist = newmist>3?1:newmist;
        Actions.changeMist(newmist);
    }
    render() {
         // console.log("mist",mist);
        let light = Number(this.props.light) || 1;
        let mist = Number(this.props.mist) || 1;
       
        return (
            <section className="lightmist flex">
                <section className='flex-cell' onTouchEnd={this.changeLight.bind(this)}>
                    <img src={'../static/img/light-'+light+'.png'}  />
                    <span>{this.lightitem[light-1]}</span>
                </section>
                <section className='flex-cell' onTouchEnd={this.changeMist.bind(this)}>
                    <img src={'../static/img/mist-'+mist+'.png'}  />
                    <span>{this.mistitem[mist-1]}</span>
                </section>
            </section>
        );
    }
};