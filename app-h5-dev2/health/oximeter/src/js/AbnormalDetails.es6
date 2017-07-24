'use strict';
/**
 * 日历组件
 * @prop {obj} getdata  请求接口需要传的参数
 * 1、根据月份查询当月有数据日期

http请求方式: GET
http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getOxygenPulseDateList
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';


export class AbnormalDetails extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    render() {
        return (
            <section className='event'>
                <h2>
                    {this.props.seArr.length >0?<span><b className='icon'>!</b>血氧异常事件</span>:''}
                    {this.props.peArr.length >0?<span><b className='icon'>!</b>脉率异常事件</span>:''}
                </h2>
                <ul>
                {
                    this.props.seArr.map(it=>{
                        return (
                            <li className='flex' key={it.id}><span className='flex-cell'>{it.seContentTime}</span><span className='flex-cell cor-gray'>{it.seContent}</span></li>
                        )
                    })
                }
                {
                    this.props.peArr.map(it=>{
                        return (
                            <li className='flex' key={it.id}><span className='flex-cell'>{it.peContentTime}</span><span className='flex-cell cor-gray'>{it.peContent}</span></li>
                        )
                    })
                }

                </ul>
            </section>
           
        );
    }  
};