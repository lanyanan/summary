import {Component} from 'react';
export class ModeSelect extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        let items = [];
        return (

            <div className="modeSelect-bd flex" >
                <div className="modeSelect-shade"></div>
                <ul className="modeSelect-content">
                    <li className="flex"><span>水润模式</span><em></em></li>
                </ul>
            </div>

            )
    }
}