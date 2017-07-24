// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import {Link} from 'react-router';

export class showInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.listenStore(Store); // 监听Store
    }
    render(){

        return (

            <div className='m-showinfo'>
                <img src='../static/img/info.jpg' />
            </div>

            )
    }

}