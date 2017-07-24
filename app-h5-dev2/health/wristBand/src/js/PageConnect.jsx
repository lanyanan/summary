import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {isIOS } from'./LocalFuns.jsx';
import {Canvas } from './CanvasAnimation.jsx';
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});
export class PageConnect extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            showClndr:false,
            month: (new Date().getMonth()+1),
            connect: 'scan',
        };
        this.listenStore(Store);
    }
    render() {
        let canvas = {
                connect : this.state.connect!=undefined?this.state.connect:'scan',
                showClndr: this.state.showClndr,
                percent : this.state.percent ,
                stepCount: this.state.stepCount ? this.state.stepCount : 0,
                calories: this.state.calories?this.state.calories:0,
                status: 1
            },
            connect = this.state.connect != undefined ? this.state.connect : 'scan';
        if(connect=='syncOk') window.location.href = '#/';
        //console.log(connect,'---------------connect--');
        return (
            <main className='connect-page'>
                <nav className={'nav' + isIOS}>
                    <a href="request://back"> </a>
                    <a>{this.state.title ? this.state.title:'智能手环'}</a>
                    <a className="none"> </a>
                </nav>
                <Canvas data={canvas} />
                <p className={connect == 'scan' ?"hint dark":"hint blue"}>
                    { connect != 'fail' ? '请稍等':'请检查您的手机蓝牙是否开启' }
                </p>
                {   connect != 'sync'  ?
                    <a className={connect == 'scan' ? 'btn cancel':'btn connect'} href={'request://'+(connect != 'fail' ?'cancel':'connect')}>
                        { connect != 'fail' ? '取消':'重新连接' }
                    </a>
                    :
                    null
                }
            </main>
        )
    }
}