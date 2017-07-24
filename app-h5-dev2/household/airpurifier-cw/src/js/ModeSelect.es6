'use strict';
/**
 * 标准风/自然风/睡眠风/智能风/采集风
 * @prop {integer} windType  模式索引，与id对应。取值1-5，超出范围默认为6
 * @act  Actions.selectMode([integer])  切换模式时触发该动作
 */
import {Actions} from './Actions.es6';

export const ModeSelect = React.createClass({
    showMode: function(){
        var ModeSelect = document.getElementById("ModeSelect").getAttribute("class");
        (ModeSelect =='Moders')?ModeSelect = 'ModeSelect':ModeSelect='Moders';
        document.getElementById("ModeSelect").setAttribute("class",ModeSelect);
    },
    modelSel: function(e){
      e.stopPropagation();
      e.preventDefault();
      let value = e.currentTarget.getAttribute('data-value');
      Actions.modelSel(value);
    },
    render () {
        let mode = this.props.mode;
        let grade = this.props.grade;
        return (
            <section className="Moders" id='ModeSelect'>
                <section className='ModeBG' onTouchEnd={this.showMode}></section>
               <section className='modeCon'>
                   <p className='modeCon-p'>模式</p>
                   <ul>
                       <li className={mode==1?(grade == '检测中'?'active1':(grade=='良好'?'active4':(grade=='较差'?'active7':'active10'))):''}>
                           <span data-value={'1'} onTouchEnd={this.modelSel}>
                                <p><i></i></p>
                                <p>快速</p>
                            </span>
                       </li>
                       <li className={mode==2?(grade == '检测中'?'active2':(grade=='良好'?'active5':(grade=='较差'?'active8':'active11'))):''}>
                           <span data-value={'2'} onTouchEnd={this.modelSel}>
                                <p><i></i></p>
                                <p>标准</p>
                            </span>
                       </li>
                       <li className={mode==3?(grade == '检测中'?'active3':(grade=='良好'?'active6':(grade=='较差'?'active9':'active12'))):''}>
                           <span data-value={'3'} onTouchEnd={this.modelSel}>
                                <p><i></i></p>
                                <p>智能</p>
                            </span>
                       </li>
                   </ul>
               </section>
            </section>
        );
    }
});